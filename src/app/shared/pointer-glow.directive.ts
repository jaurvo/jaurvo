import { Directive, ElementRef, NgZone, inject, OnDestroy } from '@angular/core';

/**
 * Follows the pointer with a soft, low-opacity accent wash on the page
 * background. Pointer-fine devices only; off for touch and reduced motion.
 * Transform-only, so it never triggers layout work while moving.
 */
@Directive({
  selector: '[appPointerGlow]',
  standalone: true,
})
export class PointerGlowDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly ngZone = inject(NgZone);
  private readonly active =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private readonly onMove = (e: PointerEvent): void => {
    this.el.nativeElement.style.transform = `translate(${e.clientX - 260}px, ${e.clientY - 260}px)`;
    this.el.nativeElement.classList.add('is-live');
  };
  private readonly onDown = (): void => {
    this.el.nativeElement.classList.add('is-pressed');
  };
  private readonly onUp = (): void => {
    this.el.nativeElement.classList.remove('is-pressed');
  };

  constructor() {
    if (!this.active) return;
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('pointermove', this.onMove, { passive: true });
      window.addEventListener('pointerdown', this.onDown);
      window.addEventListener('pointerup', this.onUp);
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerdown', this.onDown);
    window.removeEventListener('pointerup', this.onUp);
  }
}
