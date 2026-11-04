import { AfterViewInit, Component, ElementRef, OnDestroy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EMAIL, INSTAGRAM_URL, SOCIAL_HANDLE, YOUTUBE_URL } from '../core/data';
import { Icon } from './icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, Icon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  readonly email = EMAIL;
  readonly instagramUrl = INSTAGRAM_URL;
  readonly youtubeUrl = YOUTUBE_URL;
  readonly socialHandle = SOCIAL_HANDLE;
  /** Design-desk detail images for the footer strip, distinct from category images. */
  readonly stripImages: string[] = [
    'assets/gen/footer-1.webp',
    'assets/gen/footer-2.webp',
    'assets/gen/footer-3.webp',
    'assets/gen/footer-4.webp',
    'assets/gen/footer-5.webp',
    'assets/gen/footer-6.webp'
  ];

  /** Footer compact: reveal the full services list on demand. */
  readonly showAllServices = signal(false);
  /** Mobile accordion: which footer column is open (desktop always shows all). */
  readonly openCol = signal<string | null>(null);

  toggleCol(col: string): void {
    this.openCol.set(this.openCol() === col ? null : col);
  }
  scrollToTop(event: Event): void {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


  ngAfterViewInit(): void {
    const footerEl = this.host.nativeElement.querySelector('.site-footer');
    if (!footerEl) return;
    // Hidden state is applied BY JS only: with JS off (or no observer)
    // the wordmark stays fully visible by default.
    footerEl.classList.add('footer-reveal-ready');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      footerEl.classList.add('revealed');
      return;
    }
    if (typeof IntersectionObserver === 'undefined') {
      footerEl.classList.add('revealed');
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          footerEl.classList.add('revealed');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    this.observer.observe(footerEl);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
