import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService, PricingPlanRow } from './admin.service';

interface PricingForm {
  id: string | null;
  name: string;
  price_usd: number;
  features: string;
  is_popular: boolean;
  is_published: boolean;
  sort: number;
}

const emptyForm = (): PricingForm => ({
  id: null,
  name: '',
  price_usd: 0,
  features: '',
  is_popular: false,
  is_published: true,
  sort: 0,
});

@Component({
  selector: 'app-admin-pricing',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './admin.scss',
  template: `
    <section class="admin-page">
      <div class="container">
        <div class="admin-head">
          <h1>Pricing</h1>
          <p>Pricing plans shown on the website. Publish = live immediately.</p>
        </div>

        <div class="admin-card">
          <h2>{{ form().id ? 'Edit plan' : 'Add a pricing plan' }}</h2>
          <form (ngSubmit)="saveItem()">
            <div class="form-grid">
              <div class="field">
                <label for="p-name">Plan name</label>
                <input id="p-name" type="text" required placeholder="e.g. Business"
                  [ngModel]="form().name"
                  (ngModelChange)="patch('name', $event)" name="name">
              </div>
              <div class="field">
                <label for="p-price">Price (USD)</label>
                <input id="p-price" type="number" min="0" required
                  [ngModel]="form().price_usd"
                  (ngModelChange)="patch('price_usd', +$event)" name="price_usd">
              </div>
              <div class="field span-2">
                <label for="p-features">Features (one per line)</label>
                <textarea id="p-features" rows="5" placeholder="Up to 10 pages&#10;Contact form&#10;..."
                  [ngModel]="form().features"
                  (ngModelChange)="patch('features', $event)" name="features"></textarea>
              </div>
              <div class="field">
                <label for="p-sort">Sort order</label>
                <input id="p-sort" type="number"
                  [ngModel]="form().sort"
                  (ngModelChange)="patch('sort', +$event)" name="sort">
              </div>
              <div class="field checkbox-field">
                <input id="p-popular" type="checkbox"
                  [ngModel]="form().is_popular"
                  (ngModelChange)="patch('is_popular', $event)" name="is_popular">
                <label for="p-popular">Mark as most popular</label>
              </div>
              <div class="field checkbox-field">
                <input id="p-published" type="checkbox"
                  [ngModel]="form().is_published"
                  (ngModelChange)="patch('is_published', $event)" name="is_published">
                <label for="p-published">Published on the website</label>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn--accent" [disabled]="!form().name.trim()">
                {{ form().id ? 'Save changes' : 'Add plan' }}
              </button>
              @if (form().id) {
                <button type="button" class="btn btn--ghost" (click)="reset()">Cancel edit</button>
              }
            </div>
          </form>
        </div>

        <div class="admin-card">
          <h2>Pricing plans</h2>
          <div class="table-wrap">
            <table class="admin-table">
              <thead>
                <tr><th>Plan</th><th>Price</th><th>Popular</th><th>Published</th><th>Actions</th></tr>
              </thead>
              <tbody>
                @for (row of items(); track row.id) {
                  <tr>
                    <td>{{ row.name }}</td>
                    <td>\${{ row.price_usd }}</td>
                    <td>{{ row.is_popular ? '⭐' : '—' }}</td>
                    <td><span class="status-pill">{{ row.is_published ? 'Published' : 'Hidden' }}</span></td>
                    <td>
                      <div class="row-actions">
                        <button type="button" class="btn btn--ghost btn--small" (click)="moveItem(row, -1)" title="Move up">↑</button>
                        <button type="button" class="btn btn--ghost btn--small" (click)="moveItem(row, 1)" title="Move down">↓</button>
                        <button type="button" class="btn btn--ghost btn--small" (click)="editItem(row)">Edit</button>
                        <button type="button" class="btn btn--ghost btn--small" (click)="togglePublish(row)">
                          {{ row.is_published ? 'Unpublish' : 'Publish' }}
                        </button>
                        <button type="button" class="btn btn--danger btn--small" (click)="removeItem(row)">Delete</button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr><td class="empty-row" colspan="5">No pricing plans yet.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class PricingAdmin implements OnInit {
  private readonly admin = inject(AdminService);
  readonly items = signal<PricingPlanRow[]>([]);
  readonly form = signal<PricingForm>(emptyForm());

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  private async reload(): Promise<void> {
    this.items.set(await this.admin.listPricingPlans());
  }

  patch<K extends keyof PricingForm>(key: K, value: PricingForm[K]): void {
    this.form.update((f) => ({ ...f, [key]: value }));
  }

  editItem(row: PricingPlanRow): void {
    this.form.set({
      id: row.id,
      name: row.name,
      price_usd: row.price_usd,
      features: (row.features ?? []).join('\n'),
      is_popular: row.is_popular,
      is_published: row.is_published,
      sort: row.sort,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  reset(): void {
    this.form.set(emptyForm());
  }

  async saveItem(): Promise<void> {
    const f = this.form();
    const features = f.features
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    await this.admin.savePricingPlan({
      ...(f.id ? { id: f.id } : {}),
      name: f.name.trim(),
      price_usd: f.price_usd || 0,
      features,
      is_popular: f.is_popular,
      is_published: f.is_published,
      sort: f.sort || 0,
    });
    this.reset();
    await this.reload();
  }

  async togglePublish(row: PricingPlanRow): Promise<void> {
    await this.admin.savePricingPlan({ id: row.id, is_published: !row.is_published });
    await this.reload();
  }

  async moveItem(row: PricingPlanRow, dir: -1 | 1): Promise<void> {
    const sorted = [...this.items()].sort((a, b) => a.sort - b.sort);
    const i = sorted.findIndex((r) => r.id === row.id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= sorted.length) return;
    const a = sorted[i];
    const b = sorted[j];
    await this.admin.savePricingPlan({ id: a.id, sort: b.sort });
    await this.admin.savePricingPlan({ id: b.id, sort: a.sort });
    await this.reload();
  }

  async removeItem(row: PricingPlanRow): Promise<void> {
    if (!confirm(`Delete pricing plan "${row.name}"?`)) return;
    await this.admin.deletePricingPlan(row.id);
    await this.reload();
  }
}
