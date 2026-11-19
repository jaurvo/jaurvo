import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CURRENCY_NOTE,
  PLANS,
  PRICING_NOTE,
} from '../../core/data';
import { ContentService } from '../../core/content.service';
import { CurrencyService } from '../../core/currency.service';
import { SeoService } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { CurrencySwitcher } from '../../shared/currency-switcher';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    RouterLink,
    Icon,
    RevealDirective,
    SpotlightDirective,
    CurrencySwitcher,
  ],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
})
export class Pricing implements OnInit {
  readonly content = inject(ContentService);
  readonly currency = inject(CurrencyService);
  private readonly seo = inject(SeoService);

  readonly pricingNote = PRICING_NOTE;
  readonly currencyNote = CURRENCY_NOTE;

  /** Live plans from the admin panel when published, static PLANS otherwise. */
  readonly livePlans = computed(() => {
    const rows = this.content.pricingPlans();
    if (rows.length > 0) {
      return rows.map((p) => ({
        name: p.name,
        tagline: '',
        priceUsd: p.price_usd,
        features: [...p.features],
        featured: p.is_popular,
      }));
    }
    return PLANS.map((p) => ({
      name: p.name,
      tagline: p.tagline ?? '',
      priceUsd: p.priceUsd,
      features: [...p.features],
      featured: !!p.featured,
    }));
  });

  ngOnInit(): void {
    this.seo.setPage(
      'Pricing, Jaurvo Websites from $300',
      'Jaurvo pricing: Starter $300, Business $450, Premium $750. Fixed quotes in writing, domain and hosting included for the first year, 50% advance and 50% on delivery.',
      '/pricing',
    );
  }
}
