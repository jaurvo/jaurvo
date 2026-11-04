import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, Icon],
  template: `
    <section class="not-found">
      <div class="container">
        <p class="eyebrow">404, Page not found</p>
        <h1 class="not-found-title">This page <em>went missing.</em></h1>
        <p class="not-found-text">
          The link you followed may be broken, or the page may have moved.
          Let's get you back on track.
        </p>
        <div class="not-found-actions">
          <a class="btn btn--accent" routerLink="/">Back to Home</a>
          <a class="btn btn--ghost" routerLink="/services">
            Explore services
            <app-icon name="arrow-right" [size]="20" />
          </a>
          <a class="btn btn--ghost" routerLink="/contact">Contact us</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .not-found {
      padding: 120px 0 100px;
      text-align: center;
    }
    .not-found-title {
      font-family: var(--font-display);
      font-size: clamp(40px, 6vw, 72px);
      font-weight: 700;
      letter-spacing: -0.02em;
      margin: 16px 0;
    }
    .not-found-title em {
      font-style: normal;
      color: var(--accent-ink);
    }
    .not-found-text {
      color: var(--muted);
      font-size: 17px;
      max-width: 480px;
      margin: 0 auto 32px;
    }
    .not-found-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
    }
  `],
})
export class NotFound implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage(
      'Page not found, Jaurvo',
      'The page you are looking for does not exist. Return to the Jaurvo homepage or explore our services.',
      '/404',
    );
  }
}
