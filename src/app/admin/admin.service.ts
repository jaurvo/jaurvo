import { Injectable, inject } from '@angular/core';
import type { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../core/supabase.service';

export interface EnquiryRow {
  id: string;
  name: string;
  contact: string;
  service: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export interface CallRequestRow {
  id: string;
  name: string;
  phone: string;
  status: string;
  created_at: string;
}

export interface OfferRow {
  id: string;
  title: string;
  description: string | null;
  badge_text: string;
  is_active: boolean;
  starts_at: string | null;
  expires_at: string | null;
  created_at: string;
}

export interface ProjectRow {
  id: string;
  client_name: string;
  service: string | null;
  deadline: string | null;
  total_amount: number;
  advance_paid: number;
  status: string;
  created_at: string;
}

export interface PaymentRow {
  id: string;
  project_id: string | null;
  amount: number;
  note: string | null;
  paid_at: string;
  created_at: string;
}

export interface PortfolioRow {
  id: string;
  title: string;
  category: string;
  image_url: string | null;
  live_url: string | null;
  badge: string | null;
  is_published: boolean;
  sort: number;
}

export interface ServiceContentRow {
  id: string;
  service_key: string;
  title: string;
  description: string | null;
  price_from: string | null;
  is_published: boolean;
}

export interface ReviewRow {
  id: string;
  name: string;
  text: string;
  rating: number;
  is_approved: boolean;
  created_at: string;
}

export interface SettingRow {
  key: string;
  value: string;
}

export interface TeamMemberRow {
  id: string;
  name: string;
  role: string;
  photo_url: string | null;
  sort: number;
  is_published: boolean;
}

export interface PricingPlanRow {
  id: string;
  name: string;
  price_usd: number;
  features: string[];
  is_popular: boolean;
  sort: number;
  is_published: boolean;
}

/** All admin reads/writes go through here. Only called when Supabase is configured. */
@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly supabase = inject(SupabaseService);

  private async db(): Promise<SupabaseClient> {
    const client = await this.supabase.dbAsync();
    if (!client) {
      throw new Error('Supabase is not connected yet, add the project keys first.');
    }
    return client;
  }

  async signIn(email: string, password: string): Promise<string | null> {
    const { error } = await (await this.db()).auth.signInWithPassword({ email, password });
    return error ? error.message : null;
  }

  async signOut(): Promise<void> {
    await (await this.db()).auth.signOut();
  }

  /** Uploads a portfolio image to the public `portfolio-images` bucket, returns its public URL. */
  async uploadPortfolioImage(file: File): Promise<string> {
    const client = await this.db();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `portfolio/${Date.now()}-${safeName}`;
    const { error } = await client.storage.from('portfolio-images').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) throw new Error(error.message);
    const { data } = client.storage.from('portfolio-images').getPublicUrl(path);
    return data.publicUrl;
  }

  async listEnquiries(): Promise<EnquiryRow[]> {
    const { data } = await (await this.db())
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    return (data ?? []) as EnquiryRow[];
  }

  async setEnquiryStatus(id: string, status: string): Promise<void> {
    await (await this.db()).from('enquiries').update({ status }).eq('id', id);
  }

  async deleteEnquiry(id: string): Promise<void> {
    await (await this.db()).from('enquiries').delete().eq('id', id);
  }

  async countNewEnquiries(): Promise<number> {
    const { count } = await (await this.db())
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'New');
    return count ?? 0;
  }

  async countPendingReviews(): Promise<number> {
    const { count } = await (await this.db())
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('is_approved', false);
    return count ?? 0;
  }

  // ---------- SITE-04: Call Requests ----------

  async listCallRequests(): Promise<CallRequestRow[]> {
    const { data } = await (await this.db())
      .from('call_requests')
      .select('*')
      .order('created_at', { ascending: false });
    return (data ?? []) as CallRequestRow[];
  }

  async setCallRequestStatus(id: string, status: string): Promise<void> {
    await (await this.db()).from('call_requests').update({ status }).eq('id', id);
  }

  async deleteCallRequest(id: string): Promise<void> {
    await (await this.db()).from('call_requests').delete().eq('id', id);
  }

  async countNewCallRequests(): Promise<number> {
    const { count } = await (await this.db())
      .from('call_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'New');
    return count ?? 0;
  }

  // ---------- SITE-05: Offers ----------

  async listOffers(): Promise<OfferRow[]> {
    const { data } = await (await this.db())
      .from('offers')
      .select('*')
      .order('created_at', { ascending: false });
    return (data ?? []) as OfferRow[];
  }

  async saveOffer(row: Partial<OfferRow>): Promise<void> {
    if (row.id) {
      const { id, ...rest } = row;
      await (await this.db()).from('offers').update(rest).eq('id', id);
    } else {
      await (await this.db()).from('offers').insert(row);
    }
  }

  async deleteOffer(id: string): Promise<void> {
    await (await this.db()).from('offers').delete().eq('id', id);
  }

  async listProjects(): Promise<ProjectRow[]> {
    const { data } = await (await this.db())
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    return (data ?? []) as ProjectRow[];
  }

  async saveProject(row: Partial<ProjectRow>): Promise<void> {
    if (row.id) {
      const { id, ...rest } = row;
      await (await this.db()).from('projects').update(rest).eq('id', id);
    } else {
      await (await this.db()).from('projects').insert(row);
    }
  }

  async deleteProject(id: string): Promise<void> {
    await (await this.db()).from('projects').delete().eq('id', id);
  }

  async listPayments(): Promise<PaymentRow[]> {
    const { data } = await (await this.db())
      .from('payments')
      .select('*')
      .order('paid_at', { ascending: false });
    return (data ?? []) as PaymentRow[];
  }

  async addPayment(row: Partial<PaymentRow>): Promise<void> {
    await (await this.db()).from('payments').insert(row);
  }

  async deletePayment(id: string): Promise<void> {
    await (await this.db()).from('payments').delete().eq('id', id);
  }

  async listPortfolio(): Promise<PortfolioRow[]> {
    const { data } = await (await this.db())
      .from('portfolio_items')
      .select('*')
      .order('sort', { ascending: true });
    return (data ?? []) as PortfolioRow[];
  }

  async savePortfolio(row: Partial<PortfolioRow>): Promise<void> {
    if (row.id) {
      const { id, ...rest } = row;
      await (await this.db()).from('portfolio_items').update(rest).eq('id', id);
    } else {
      await (await this.db()).from('portfolio_items').insert(row);
    }
  }

  async deletePortfolio(id: string): Promise<void> {
    await (await this.db()).from('portfolio_items').delete().eq('id', id);
  }

  async listServiceContent(): Promise<ServiceContentRow[]> {
    const { data } = await (await this.db())
      .from('services_content')
      .select('*')
      .order('service_key', { ascending: true });
    return (data ?? []) as ServiceContentRow[];
  }

  async saveServiceContent(row: ServiceContentRow): Promise<void> {
    const { id, ...rest } = row;
    await (await this.db()).from('services_content').update(rest).eq('id', id);
  }

  async listReviews(): Promise<ReviewRow[]> {
    const { data } = await (await this.db())
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    return (data ?? []) as ReviewRow[];
  }

  async setReviewApproved(id: string, approved: boolean): Promise<void> {
    await (await this.db()).from('reviews').update({ is_approved: approved }).eq('id', id);
  }

  async deleteReview(id: string): Promise<void> {
    await (await this.db()).from('reviews').delete().eq('id', id);
  }

  // ---------- Full-site CMS (Fix 15) ----------

  async listSettings(): Promise<SettingRow[]> {
    const { data } = await (await this.db())
      .from('site_settings')
      .select('key, value')
      .order('key', { ascending: true });
    return (data ?? []) as SettingRow[];
  }

  async saveSetting(key: string, value: string): Promise<void> {
    await (await this.db())
      .from('site_settings')
      .upsert({ key, value }, { onConflict: 'key' });
  }

  async listTeamMembers(): Promise<TeamMemberRow[]> {
    const { data } = await (await this.db())
      .from('team_members')
      .select('*')
      .order('sort', { ascending: true });
    return (data ?? []) as TeamMemberRow[];
  }

  async saveTeamMember(row: Partial<TeamMemberRow>): Promise<void> {
    if (row.id) {
      const { id, ...rest } = row;
      await (await this.db()).from('team_members').update(rest).eq('id', id);
    } else {
      await (await this.db()).from('team_members').insert(row);
    }
  }

  async deleteTeamMember(id: string): Promise<void> {
    await (await this.db()).from('team_members').delete().eq('id', id);
  }

  async listPricingPlans(): Promise<PricingPlanRow[]> {
    const { data } = await (await this.db())
      .from('pricing_plans')
      .select('*')
      .order('sort', { ascending: true });
    return (data ?? []) as PricingPlanRow[];
  }

  async savePricingPlan(row: Partial<PricingPlanRow>): Promise<void> {
    if (row.id) {
      const { id, ...rest } = row;
      await (await this.db()).from('pricing_plans').update(rest).eq('id', id);
    } else {
      await (await this.db()).from('pricing_plans').insert(row);
    }
  }

  async deletePricingPlan(id: string): Promise<void> {
    await (await this.db()).from('pricing_plans').delete().eq('id', id);
  }
}

export function inr(value: number): string {
  return '₹' + value.toLocaleString('en-IN');
}

export function shortDate(iso: string | null): string {
  if (!iso) return ', ';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
