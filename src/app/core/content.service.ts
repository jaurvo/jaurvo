import { Injectable, NgZone, inject, signal } from '@angular/core';
import { PROJECTS, REVIEWS, SERVICES, BadgeKind, Project, ServiceItem } from './data';
import { SupabaseService } from './supabase.service';

export interface ReviewItem {
  name: string;
  text: string;
  rating: number;
  service?: string;
}

export interface EnquiryInput {
  name: string;
  contact: string;
  service: string;
  budget?: string;
  message: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo_url: string | null;
  sort: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price_usd: number;
  features: string[];
  is_popular: boolean;
  sort: number;
}

export interface OfferItem {
  title: string;
  badge_text: string;
  description: string | null;
  starts_at: string | null;
  expires_at: string | null;
}

/** URL-safe key for projects created in the admin panel. */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Public content: static data by default. When Supabase is connected,
 * published portfolio items become the live website portfolio (the
 * static list is only a fallback when the database is unreachable or
 * has no rows); services, approved reviews, site settings, team
 * members, pricing plans and the active offer load from the database
 * when present.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly supabase = inject(SupabaseService);
  private readonly ngZone = inject(NgZone);

  readonly projects = signal<Project[]>(PROJECTS);
  readonly services = signal<ServiceItem[]>(SERVICES);
  readonly reviews = signal<ReviewItem[]>(REVIEWS);
  readonly siteSettings = signal<Record<string, string>>({});
  readonly teamMembers = signal<TeamMember[]>([]);
  readonly pricingPlans = signal<PricingPlan[]>([]);
  readonly activeOffer = signal<OfferItem | null>(null);

  constructor() {
    this.loadRemote();
  }

  /** Reads one site setting, with a fallback when it was never saved. */
  setting(key: string, fallback = ''): string {
    return this.siteSettings()[key] ?? fallback;
  }

  private async loadRemote(): Promise<void> {
    const db = await this.supabase.dbAsync();
    if (!db) return;
    try {
      const [portfolio, services, reviews, settings, team, pricing, offers] = await Promise.all([
        db.from('portfolio_items').select('title, category, image_url, live_url, badge').eq('is_published', true).order('sort', { ascending: true }),
        db.from('services_content').select('service_key, title, description, price_from').eq('is_published', true),
        db.from('reviews').select('name, text, rating, service').eq('is_approved', true).order('created_at', { ascending: false }),
        db.from('site_settings').select('key, value'),
        db.from('team_members').select('id, name, role, photo_url, sort').eq('is_published', true).order('sort', { ascending: true }),
        db.from('pricing_plans').select('id, name, price_usd, features, is_popular, sort').eq('is_published', true).order('sort', { ascending: true }),
        db.from('offers').select('title, badge_text, description, starts_at, expires_at').eq('is_active', true).order('created_at', { ascending: false }).limit(5),
      ]);

      this.ngZone.run(() => {
        if (portfolio.data && portfolio.data.length > 0) {
          const live: Project[] = portfolio.data.map((row) => {
            const badgeText = (row.badge ?? '').trim();
            const badge: BadgeKind =
              badgeText === 'Sample Design' || badgeText === 'sample' ? 'sample'
              : badgeText === 'Our Product' || badgeText === 'product' ? 'product' : 'live';
            const local = PROJECTS.find((p) => p.title === row.title);
            return {
              key: local?.key ?? slugify(row.title),
              title: row.title,
              category: row.category ?? 'Websites',
              badge,
              badgeText: badge === 'sample' ? 'Sample Design' : badge === 'product' ? 'Our Product' : 'Live Client Project',
              image: row.image_url ?? '',
              alt: row.title,
              liveUrl: row.live_url ?? '',
              meta: local?.meta ?? row.category ?? '',
              description: local?.description ?? '',
              tags: local?.tags ?? [],
            };
          });
          this.projects.set(live);
        }
        if (services.data && services.data.length > 0) {
          this.services.set(SERVICES.map((s) => {
            const row = services.data!.find((r) => r.service_key === s.key);
            if (!row) return s;
            const raw = (row as { price_from?: unknown }).price_from;
            const parsed = typeof raw === 'number' ? raw : typeof raw === 'string' ? Number(raw.replace(/[^0-9]/g, '')) || null : null;
            return { ...s, name: row.title ?? s.name, short: row.description ?? s.short, priceUsd: parsed ?? s.priceUsd };
          }));
        }
        if (reviews.data && reviews.data.length > 0) {
          this.reviews.set(reviews.data as ReviewItem[]);
        }
        if (settings.data && settings.data.length > 0) {
          const map: Record<string, string> = {};
          for (const row of settings.data) map[row.key] = row.value ?? '';
          this.siteSettings.set(map);
        }
        if (team.data && team.data.length > 0) {
          this.teamMembers.set(team.data as TeamMember[]);
        }
        if (pricing.data && pricing.data.length > 0) {
          this.pricingPlans.set(pricing.data as PricingPlan[]);
        }
        if (offers.data && offers.data.length > 0) {
          const nowTs = Date.now();
          const valid = (offers.data as OfferItem[]).find((o) => {
            if (o.starts_at && new Date(o.starts_at).getTime() > nowTs) return false;
            if (o.expires_at && new Date(o.expires_at).getTime() <= nowTs) return false;
            return true;
          });
          this.activeOffer.set(valid ?? null);
        }
      });
    } catch {
      // Remote content is optional, the static site keeps working.
    }
  }

  async submitReview(input: { name: string; rating: number; text: string; service?: string }): Promise<boolean> {
    const db = await this.supabase.dbAsync();
    if (!db) return false;
    const { error } = await db.from('reviews').insert({
      name: input.name, rating: input.rating, text: input.text,
      service: input.service ?? null, is_approved: false,
    });
    return !error;
  }

  async submitEnquiry(input: EnquiryInput): Promise<boolean> {
    const db = await this.supabase.dbAsync();
    if (!db) return false;
    const fullMessage = input.budget?.trim() ? `Budget: ${input.budget.trim()}\n${input.message}` : input.message;
    const { error } = await db.from('enquiries').insert({
      name: input.name, contact: input.contact, service: input.service,
      message: fullMessage, status: 'New',
    });
    return !error;
  }

  /** Saves a call-back request (name + phone). Returns true when saved. */
  async submitCallRequest(input: { name: string; phone: string }): Promise<boolean> {
    const db = await this.supabase.dbAsync();
    if (!db) return false;
    const { error } = await db.from('call_requests').insert({
      name: input.name, phone: input.phone, status: 'New',
    });
    return !error;
  }
}
