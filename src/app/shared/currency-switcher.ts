import { Component, inject } from '@angular/core';
import { CURRENCIES, CurrencyService } from '../core/currency.service';

/** Compact display-currency switcher, bound to the shared currency signal. */
@Component({
  selector: 'app-currency-switcher',
  standalone: true,
  template: `
    <label class="currency-switcher">
      <span class="currency-label">Currency</span>
      <select
        aria-label="Display currency"
        [value]="currency.currency()"
        (change)="onChange($event)"
      >
        @for (c of currencies; track c.code) {
          <option [value]="c.code" [selected]="currency.currency() === c.code">{{ c.code }}</option>
        }
      </select>
    </label>
  `,
  styles: [
    `
      .currency-switcher {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 44px;
        font-size: 14px;
        font-weight: 600;
        color: var(--text);
      }
      .currency-label {
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted);
      }
      select {
        min-height: 44px;
        padding: 8px 10px;
        border: 1px solid var(--line-strong);
        border-radius: 999px;
        background: var(--panel);
        color: var(--text);
        font: inherit;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      select:focus {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
      }
      @media (max-width: 640px) {
        .currency-label { display: none; }
      }
    `,
  ],
})
export class CurrencySwitcher {
  readonly currency = inject(CurrencyService);
  readonly currencies = CURRENCIES;

  onChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (CURRENCIES.some((c) => c.code === value)) {
      this.currency.setCurrency(value as (typeof CURRENCIES)[number]['code']);
    }
  }
}
