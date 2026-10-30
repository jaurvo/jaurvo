import { AfterViewInit, Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';

/** Adds .is-visible when the element scrolls into view (drives .reveal styles). */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  readonly delay = input(0, {
    alias: 'appReveal',
    transform: (value: number | string | null | undefined) => Number(value) || 0,
  });
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    node.classList.add('reveal');
    if (typeof window === 'undefined') {
      // Prerender: content must be visible in the static HTML.
      node.classList.add('is-visible');
      return;
    }
    if (this.delay()) {
      node.style.setProperty('--reveal-delay', `${this.delay()}ms`);
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-visible');
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('is-visible');
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.12 },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
