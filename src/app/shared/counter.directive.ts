import { AfterViewInit, Directive, ElementRef, NgZone, inject, input, OnDestroy, effect } from '@angular/core';

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
  private counted = false;
  private animating = false;
  private inView = false;

  constructor() {
    // CMS settings arriving late: re-animate to the new value
    effect(() => {
      const t = this.target();
      if (this.counted && !this.animating && this.inView) {
        this.animate(this.el.nativeElement);
      }
    });
  }

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    if (typeof window === 'undefined') {
      node.textContent = String(this.target());
      this.counted = true;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = String(this.target());
      this.counted = true;
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.inView = true;
          this.animate(node);
          this.counted = true;
          this.observer?.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    this.observer.observe(node);
  }

  private animate(node: HTMLElement): void {
    cancelAnimationFrame(this.frame);
    this.animating = true;
    const target = this.target();
    const startVal = Number(node.textContent) || 0;
    const duration = 1100;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (target - startVal) * eased);
      node.textContent = String(current);
      if (progress < 1) {
        this.frame = requestAnimationFrame(tick);
      } else {
        this.animating = false;
        node.textContent = String(target);
      }
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
