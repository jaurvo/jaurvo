import { Directive, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';

/**
 * Magnetic hover for CTAs: the element drifts a few pixels toward the
 * cursor and springs back on leave. Transform-only, pointer-fine devices
 * only, off for reduced motion.
 */
@Directive({
  selector: '[appMagnetic]',
  standalone: true,
})
export class MagneticDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly ngZone = inject(NgZone);
  private readonly active =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private readonly onMove = (e: PointerEvent): void => {
    const r = this.el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const pull = 0.18;
    this.el.style.transition = 'transform 0.12s ease-out';
    this.el.style.transform = `translate(${(dx * pull).toFixed(1)}px, ${(dy * pull).toFixed(1)}px)`;
  };

  private readonly onLeave = (): void => {
    this.el.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
    this.el.style.transform = 'translate(0, 0)';
  };

  constructor() {
    if (!this.active) return;
    this.ngZone.runOutsideAngular(() => {
      this.el.addEventListener('pointermove', this.onMove, { passive: true });
      this.el.addEventListener('pointerleave', this.onLeave, { passive: true });
    });
  }

  ngOnDestroy(): void {
    this.el.removeEventListener('pointermove', this.onMove);
    this.el.removeEventListener('pointerleave', this.onLeave);
  }
}
