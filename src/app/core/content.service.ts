import { Injectable, inject, signal } from '@angular/core';
import { PROJECTS, REVIEWS, SERVICES, Project, ServiceItem } from './data';
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

/**
 * Public content: static data by default. When Supabase is connected,
 * published portfolio items / services and approved reviews are loaded
 * from the database and merged over the static content.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly supabase = inject(SupabaseService);

  readonly projects = signal<Project[]>(PROJECTS);
  readonly services = signal<ServiceItem[]>(SERVICES);
  // Static fallback list: the five approved reviews in data.ts. When
  // Supabase is connected AND returns approved reviews, those override
  // this list (admin panel controls approval); an empty remote result
  // never wipes the fallback.
  readonly reviews = signal<ReviewItem[]>(REVIEWS);

  constructor() {
    this.loadRemote();
  }

  private async loadRemote(): Promise<void> {
    const db = await this.supabase.dbAsync();
    if (!db) return;
    try {
      const [portfolio, services, reviews] = await Promise.all([
        db
          .from('portfolio_items')
          .select('title, category, image_url, live_url, badge')
          .eq('is_published', true)
          .order('sort', { ascending: true }),
        db
          .from('services_content')
          .select('service_key, title, description, price_from')
          .eq('is_published', true),
        db
          .from('reviews')
          .select('name, text, rating')
          .eq('is_approved', true)
          .order('created_at', { ascending: false }),
      ]);

      if (portfolio.data && portfolio.data.length > 0) {
        const merged = portfolio.data
          .map((row) => {
            const local = PROJECTS.find((p) => p.title === row.title);
            if (local) {
              return {
                ...local,
                category: row.category ?? local.category,
                image: row.image_url ?? local.image,
                liveUrl: row.live_url ?? local.liveUrl,
              };
            }
            return null;
          })
          .filter((p): p is Project => p !== null);
        if (merged.length > 0) this.projects.set(merged);
      }

      if (services.data && services.data.length > 0) {
        this.services.set(
          SERVICES.map((s) => {
            const row = services.data!.find((r) => r.service_key === s.key);
            if (!row) return s;
            const raw = (row as { price_from?: unknown }).price_from;
            const parsed =
              typeof raw === 'number'
                ? raw
                : typeof raw === 'string'
                  ? Number(raw.replace(/[^0-9]/g, '')) || null
                  : null;
            return {
              ...s,
              name: row.title ?? s.name,
              short: row.description ?? s.short,
              priceUsd: parsed ?? s.priceUsd,
            };
          }),
        );
      }

      if (reviews.data && reviews.data.length > 0) {
        this.reviews.set(reviews.data as ReviewItem[]);
      }
    } catch {
      // Remote content is optional, the static site keeps working.
    }
  }

  /** Returns true when the enquiry was saved to Supabase. */
  async submitEnquiry(input: EnquiryInput): Promise<boolean> {
    const db = await this.supabase.dbAsync();
    if (!db) return false;
    // The enquiries table has no separate budget column, so the budget
    // travels as the first line of the message, the admin pipeline
    // (list/detail views) already displays the full message.
    const fullMessage = input.budget?.trim()
      ? `Budget: ${input.budget.trim()}\n${input.message}`
      : input.message;
    const { error } = await db.from('enquiries').insert({
      name: input.name,
      contact: input.contact,
      service: input.service,
      message: fullMessage,
      status: 'New',
    });
    return !error;
  }
}
