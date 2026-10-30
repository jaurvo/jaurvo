import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  SERVICE_PAGES,
  ServicePage,
  servicePageBySlug,
} from '../../core/service-pages.data';
import { SeoService } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { MagneticDirective } from '../../shared/magnetic.directive';

/** One SEO page per service: /services/:slug — unique title, meta, H1, FAQs. */
@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [RouterLink, LowerCasePipe, Icon, RevealDirective, MagneticDirective],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss',
})
export class ServiceDetail implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private sub: Subscription | null = null;

  page: ServicePage | null = null;
  related: ServicePage[] = [];
  jsonLd = '';

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') ?? '';
      const page = servicePageBySlug(slug);
      if (!page) {
        this.router.navigate(['/services']);
        return;
      }
      this.page = page;
      this.related = SERVICE_PAGES.filter(
        (p) => p.categoryKey === page.categoryKey && p.slug !== page.slug
      ).slice(0, 3);
      this.seo.setPage(page.seoTitle, page.seoDescription, `/services/${page.slug}`);
      this.jsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: page.name,
        provider: {
          '@type': 'Organization',
          name: 'Jaurvo',
          url: 'https://jaurvo.vercel.app/',
        },
        description: page.seoDescription,
        areaServed: 'Worldwide',
        url: `https://jaurvo.vercel.app/services/${page.slug}`,
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
