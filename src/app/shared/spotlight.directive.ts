import { Directive, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';

/**
 * Cursor-following spotlight for cards: sets --mx/--my custom properties
 * on the host so a ::before radial wash can track the pointer.
 * Pointer-fine devices only, off for reduced motion.
 */
@Directive({
  selector: '[appSpotlight]',
  standalone: true,
})
export class SpotlightDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly ngZone = inject(NgZone);
  private readonly active =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private readonly onMove = (e: PointerEvent): void => {
    const r = this.el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    this.el.style.setProperty('--mx', `${x.toFixed(1)}%`);
    this.el.style.setProperty('--my', `${y.toFixed(1)}%`);
  };

  constructor() {
    if (!this.active) return;
    this.ngZone.runOutsideAngular(() => {
      this.el.addEventListener('pointermove', this.onMove, { passive: true });
    });
  }

  ngOnDestroy(): void {
    this.el.removeEventListener('pointermove', this.onMove);
  }
}
