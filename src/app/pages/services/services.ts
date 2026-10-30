import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { CurrencyService } from '../../core/currency.service';
import { SeoService } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { CurrencySwitcher } from '../../shared/currency-switcher';
import { SERVICE_PAGES } from '../../core/service-pages.data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, Icon, RevealDirective, CurrencySwitcher],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services implements OnInit {
  readonly content = inject(ContentService);
  readonly currency = inject(CurrencyService);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage(
      'Services: Websites, Invitations, Logos & More | Jaurvo',
      'Ten services in detail: websites, logo & branding, invitation websites, UI/UX, SEO, social media designs, posters, content writing, AI services and dashboards, with starting prices and enquiry-form ordering.',
      '/services',
    );
  }

  /** Detail-page slug for a sub-service name, or null when not found. */
  slugFor(name: string): string | null {
    const hit = SERVICE_PAGES.find((p) => p.name === name);
    return hit ? hit.slug : null;
  }
}
