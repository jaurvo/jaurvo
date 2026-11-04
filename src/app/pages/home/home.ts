import { Component, OnDestroy, OnInit, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  BENEFITS,
  COMMITMENTS,
  COMPARISON,
  CURRENCY_NOTE,
  DISCIPLINES,
  EMAIL,
  FAQS,
  PLANS,
  PRICING_NOTE,
  PROCESS_STEPS,
  SERVICES,
  TEAM,
} from '../../core/data';
import { ContentService } from '../../core/content.service';
import { CurrencyService } from '../../core/currency.service';
import { ThemeService } from '../../core/theme.service';
import { SeoService } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { CounterDirective } from '../../shared/counter.directive';
import { CurrencySwitcher } from '../../shared/currency-switcher';
import { ParticlesDirective } from '../../shared/particles.directive';
import { CrystalBallDirective } from '../../shared/crystal-ball.directive';
import { MagneticDirective } from '../../shared/magnetic.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    Icon,
    RevealDirective,
    CounterDirective,
    CurrencySwitcher,
    ParticlesDirective,
    CrystalBallDirective,
    MagneticDirective,
    SpotlightDirective,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  readonly content = inject(ContentService);
  readonly currency = inject(CurrencyService);
  private readonly themeService = inject(ThemeService);
  /**
   * The crystal ball bakes the theme into its WebGL palette, and a canvas
   * whose context went through loseContext() can never render again, so on
   * every theme flip the canvas is destroyed and re-created for a fresh
   * context in the new theme.
   */
  readonly ballVisible = signal(true);

  constructor() {
    let first = true;
    effect(() => {
      this.themeService.theme();
      if (first) {
        first = false;
        return;
      }
      if (typeof window === 'undefined') return;
      this.ballVisible.set(false);
      window.setTimeout(() => this.ballVisible.set(true), 30);
    });
  }
  private readonly seo = inject(SeoService);

  readonly faqs = FAQS;
  readonly plans = PLANS;
  readonly pricingNote = PRICING_NOTE;
  readonly currencyNote = CURRENCY_NOTE;
  readonly benefits = BENEFITS;
  readonly comparison = COMPARISON;
  readonly commitments = COMMITMENTS;
  readonly team = TEAM;
  /**
   * Full-site CMS (Fix 15): when the admin publishes team members or
   * pricing plans, those replace the static lists. Static data stays the
   * fallback while the tables are empty, so the website never breaks.
   */
  readonly liveTeam = computed(() => {
    const rows = this.content.teamMembers();
    if (rows.length > 0) {
      return rows.map((m) => ({
        name: m.name,
        role: m.role || '',
        initials: m.name
          .split(/\s+/)
          .map((w) => w[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
        photoUrl: m.photo_url as string | null,
        portfolioUrl: null as string | null,
      }));
    }
    return TEAM.map((m) => ({
      name: m.name,
      role: m.role,
      initials: m.initials,
      photoUrl: null as string | null,
      portfolioUrl: m.portfolioUrl ?? null,
    }));
  });

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

  /** One site setting with a fallback when it was never saved. */
  setting(key: string, fallback: string): string {
    return this.content.setting(key, fallback);
  }

  /** Numeric site setting (for the animated counters), with fallback. */
  statNum(key: string, fallback: number): number {
    const raw = this.content.setting(key, '').trim();
    const n = Number(raw);
    return raw === '' || Number.isNaN(n) ? fallback : n;
  }
  readonly disciplines = DISCIPLINES;
  readonly steps = PROCESS_STEPS;
  readonly email = EMAIL;

  /** Leave-a-review form state (homepage reviews section). */
  readonly reviewForm = { name: '', rating: 5, service: '', text: '' };
  readonly reviewSending = signal(false);
  readonly reviewSent = signal(false);
  readonly reviewError = signal<string | null>(null);

  async submitReview(): Promise<void> {
    const name = this.reviewForm.name.trim();
    const text = this.reviewForm.text.trim();
    if (!name || !text) return;
    this.reviewSending.set(true);
    this.reviewError.set(null);
    const ok = await this.content.submitReview({
      name,
      rating: this.reviewForm.rating,
      text,
      service: this.reviewForm.service.trim() || undefined,
    });
    this.reviewSending.set(false);
    if (ok) {
      this.reviewSent.set(true);
    } else {
      this.reviewError.set('Could not send your review, please try again.');
    }
  }

  /** Total sub-services across all categories (counted from data.ts). */
  readonly totalSubServices = SERVICES.reduce((sum, s) => sum + s.subServices.length, 0);

  readonly serviceNames = [
    'Websites',
    'Invitation Websites',
    'Logo & Branding',
    'Posters & Banners',
    'Social Media Designs',
    'Content Writing',
  ];
  readonly rotateIndex = signal(0);
  /** True for one frame when the roll wraps, so the track jumps without animating backwards. */
  readonly rollInstant = signal(false);

  /** Capabilities index: hovered row, cursor-following preview position and tilt. */
  readonly capHover = signal<number | null>(null);
  readonly capPos = signal({ x: 0, y: 0 });
  readonly capTilt = signal(0);

  onCapMove(event: MouseEvent): void {
    this.capPos.set({ x: event.clientX + 28, y: event.clientY - 110 });
    this.capTilt.set(Math.max(-8, Math.min(8, event.movementX * 0.35)));
  }

  capSubLine(service: { subServices: { name: string }[] }): string {
    const names = service.subServices.map((s) => s.name);
    if (names.length <= 4) return names.join(', ');
    return names.slice(0, 4).join(', ') + ' and ' + (names.length - 4) + ' more';
  }
  readonly openFaq = signal<number | null>(0);
  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.seo.setPage(
      'Jaurvo, Websites, Logos & Invitation Websites',
      'Jaurvo builds websites, invitation websites, logos, posters and social media designs for businesses worldwide, send an enquiry, get a fixed quote in writing, delivered in days.',
      '/',
    );
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.timer = setInterval(() => {
        const next = (this.rotateIndex() + 1) % this.serviceNames.length;
        if (next === 0) {
          this.rollInstant.set(true);
          this.rotateIndex.set(0);
          setTimeout(() => this.rollInstant.set(false), 60);
        } else {
          this.rotateIndex.set(next);
        }
      }, 2600);
    }
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  toggleFaq(index: number): void {
    this.openFaq.set(this.openFaq() === index ? null : index);
  }
}
