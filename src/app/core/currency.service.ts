import { Injectable, signal } from '@angular/core';

export type CurrencyCode = 'USD' | 'INR' | 'SAR' | 'AED' | 'EUR' | 'IDR';

export interface CurrencyDef {
  code: CurrencyCode;
  label: string;
  /** Display prefix for a converted whole-unit amount. */
  prefix: string;
  /** Approximate units of this currency per 1 USD. */
  rate: number;
}

// Rates: approx. mid-market, 2026-10-29. Display only, see the pricing
// note shown under the pricing grid. Never fetched live at runtime, so
// prices never shift or break while the page is open.
export const CURRENCIES: CurrencyDef[] = [
  { code: 'USD', label: 'USD, US Dollar', prefix: '$', rate: 1 },
  { code: 'INR', label: 'INR, Indian Rupee', prefix: '₹', rate: 95.2 },
  { code: 'SAR', label: 'SAR, Saudi Riyal', prefix: 'SAR ', rate: 3.75 },
  { code: 'AED', label: 'AED, UAE Dirham', prefix: 'AED ', rate: 3.67 },
  { code: 'EUR', label: 'EUR, Euro', prefix: '€', rate: 0.89 },
  { code: 'IDR', label: 'IDR, Indonesian Rupiah', prefix: 'Rp ', rate: 16700 },
];

const STORAGE_KEY = 'jaurvo-currency-v2';

/**
 * Single source of truth for every displayed price on the site.
 * USD is the base for conversion and the default for new visitors.
 * The visitor's choice is persisted in localStorage and never
 * auto-detected from location.
 */
@Injectable({ providedIn: 'root' })
export class CurrencyService {
  readonly currency = signal<CurrencyCode>('USD');

  constructor() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && CURRENCIES.some((c) => c.code === saved)) {
        this.currency.set(saved as CurrencyCode);
      }
    } catch {
      // storage unavailable, stay on USD
    }
  }

  setCurrency(code: CurrencyCode): void {
    this.currency.set(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore
    }
  }

  def(): CurrencyDef {
    return CURRENCIES.find((c) => c.code === this.currency()) ?? CURRENCIES[0];
  }

  /** Convert a base USD price to the active currency, rounded to whole units. */
  format(usd: number): string {
    const def = this.def();
    const converted = Math.round(usd * def.rate);
    return def.prefix + converted.toLocaleString('en-US');
  }

  /** "On request" stays word-only in every currency, never a converted number. */
  formatOrRequest(usd: number | null): string {
    return usd === null ? 'On request' : this.format(usd);
  }
}
