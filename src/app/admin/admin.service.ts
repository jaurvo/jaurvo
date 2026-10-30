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
