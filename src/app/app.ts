import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Header } from './shared/header';
import { Footer } from './shared/footer';
import { PointerGlowDirective } from './shared/pointer-glow.directive';
import { SplashCursorDirective } from './shared/splash-cursor.directive';
import { ClickSparkDirective } from './shared/click-spark.directive';
import { Preloader } from './shared/preloader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, PointerGlowDirective, SplashCursorDirective, ClickSparkDirective, Preloader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private sub: Subscription | null = null;

  /** The admin panel has its own layout, public header/footer stay hidden there. */
  get isAdmin(): boolean {
    return this.router.url.startsWith('/admin');
  }

  ngOnInit(): void {
    // Subtle route fade on in-app navigation only; the first load is covered
    // by the preloader, so it never flashes.
    let firstNav = true;
    this.sub = new Subscription();
    this.sub.add(
      this.router.events
        .pipe(filter((e) => e instanceof NavigationStart))
        .subscribe(() => {
          if (!firstNav) document.body.classList.add('page-nav');
        })
    );
    this.sub.add(
      this.router.events
        .pipe(filter((e) => e instanceof NavigationEnd))
        .subscribe(() => {
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
          if (firstNav) {
            firstNav = false;
            return;
          }
          setTimeout(() => document.body.classList.remove('page-nav'), 60);
        })
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    document.body.classList.remove('page-nav');
  }
}
