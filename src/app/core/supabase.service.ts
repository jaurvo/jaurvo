import { Injectable } from '@angular/core';
import type { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private client: SupabaseClient | null = null;
  private loading: Promise<SupabaseClient | null> | null = null;

  /** True only when real keys have replaced the placeholders in environment files. */
  readonly isConfigured =
    !environment.supabaseUrl.startsWith('YOUR_') &&
    !environment.supabaseAnonKey.startsWith('YOUR_') &&
    environment.supabaseUrl.length > 10;

  /**
   * The client, created on demand. The @supabase/supabase-js chunk is NOT
   * part of the initial bundle; it downloads only when this is awaited.
   */
  dbAsync(): Promise<SupabaseClient | null> {
    if (!this.isConfigured) return Promise.resolve(null);
    if (this.client) return Promise.resolve(this.client);
    if (!this.loading) {
      this.loading = import('@supabase/supabase-js').then(({ createClient }) => {
        this.client = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
        return this.client;
      });
    }
    return this.loading;
  }

  /** Sync access to an already-loaded client (null until dbAsync() has run). */
  get db(): SupabaseClient | null {
    return this.client;
  }
}
