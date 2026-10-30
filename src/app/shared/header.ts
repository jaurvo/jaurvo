import { Component, NgZone, OnDestroy, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../core/theme.service';
import { Icon } from './icon';
import { CurrencySwitcher } from './currency-switcher';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, Icon, CurrencySwitcher],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnDestroy {
  readonly theme = inject(ThemeService);
  private readonly ngZone = inject(NgZone);
  readonly menuOpen = signal(false);
  /** Hide on scroll down past ~80px, reveal on scroll up (transform only). */
  readonly hidden = signal(false);
  readonly scrolled = signal(false);
  private lastY = 0;
  private scrollTicking = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Outside the zone + rAF-throttled: a raw scroll listener would trigger
      // a full change-detection pass on every scroll event (scroll jank).
      this.ngZone.runOutsideAngular(() => {
        window.addEventListener('scroll', this.onScroll, { passive: true });
      });
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  private readonly onScroll = (): void => {
    if (this.scrollTicking) return;
    this.scrollTicking = true;
    requestAnimationFrame(() => {
      this.scrollTicking = false;
      const y = window.scrollY;
      const scrolled = y > 8;
      let hidden: boolean;
      if (this.menuOpen()) {
        hidden = false;
      } else if (y > 80 && y > this.lastY) {
        hidden = true;
      } else {
        hidden = false;
      }
      this.lastY = y;
      // Re-enter the zone only when something actually changed.
      if (scrolled !== this.scrolled() || hidden !== this.hidden()) {
        this.ngZone.run(() => {
          this.scrolled.set(scrolled);
          this.hidden.set(hidden);
        });
      }
    });
  };

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
