import { Component, OnDestroy, OnInit, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  RATE_CARD,
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
  readonly rateCard = RATE_CARD;
  readonly benefits = BENEFITS;
  readonly comparison = COMPARISON;
  readonly commitments = COMMITMENTS;
  readonly team = TEAM;
  readonly disciplines = DISCIPLINES;
  readonly steps = PROCESS_STEPS;
  readonly email = EMAIL;

  /** Total sub-services across all six categories (counted from data.ts). */
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
