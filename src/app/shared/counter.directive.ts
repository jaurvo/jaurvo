import { AfterViewInit, Directive, ElementRef, NgZone, inject, input, OnDestroy } from '@angular/core';

/** Counts a number up when it scrolls into view. Usage: <span [appCounter]="15">0</span> */
@Directive({
  selector: '[appCounter]',
  standalone: true,
})
export class CounterDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  readonly target = input.required<number>({ alias: 'appCounter' });
  private observer: IntersectionObserver | null = null;
  private readonly ngZone = inject(NgZone);
  private frame = 0;

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    if (typeof window === 'undefined') {
      node.textContent = String(this.target());
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = String(this.target());
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.animate(node);
          this.observer?.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    this.observer.observe(node);
  }

  private animate(node: HTMLElement): void {
    const target = this.target();
    const duration = 1100;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = String(Math.round(target * eased));
      if (progress < 1) this.frame = requestAnimationFrame(tick);
    };
    this.ngZone.runOutsideAngular(() => {
      this.frame = requestAnimationFrame(tick);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.frame);
  }
}
