import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WORK_CATEGORIES } from '../core/data';
import {
  AdminService,
  PortfolioRow,
  ServiceContentRow,
} from './admin.service';

interface PortfolioForm {
  id: string | null;
  title: string;
  category: string;
  image_url: string;
  live_url: string;
  badge: string;
  is_published: boolean;
  sort: number;
}

const emptyForm = (): PortfolioForm => ({
  id: null,
  title: '',
  category: 'Business Websites',
  image_url: '',
  live_url: '',
  badge: 'Live Client Project',
  is_published: true,
  sort: 0,
});

@Component({
  selector: 'app-admin-content',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './admin.scss',
  template: `
    <section class="admin-page">
      <div class="container">
        <div class="admin-head">
          <h1>Content</h1>
          <p>Portfolio items and service texts shown on the public website. Unpublished items stay hidden.</p>
        </div>

        <div class="admin-card">
          <h2>{{ form().id ? 'Edit portfolio item' : 'Add a portfolio item' }}</h2>
          <form (ngSubmit)="saveItem()">
            <div class="form-grid">
              <div class="field">
                <label for="c-title">Title</label>
                <input id="c-title" type="text" required
                  [ngModel]="form().title"
                  (ngModelChange)="patch('title', $event)" name="title">
              </div>
              <div class="field">
                <label for="c-category">Category</label>
                <select id="c-category"
                  [ngModel]="form().category"
                  (ngModelChange)="patch('category', $event)" name="category">
                  @for (cat of categories; track cat) {
                    <option [value]="cat">{{ cat }}</option>
                  }
                </select>
              </div>
              <div class="field">
                <label for="c-badge">Badge</label>
                <select id="c-badge"
                  [ngModel]="form().badge"
                  (ngModelChange)="patch('badge', $event)" name="badge">
                  <option value="Live Client Project">Live Client Project</option>
                  <option value="Sample Design">Sample Design</option>
                  <option value="Our Product">Our Product</option>
                </select>
              </div>
              <div class="field span-2">
                <label for="c-image">Image URL (upload to the portfolio-images bucket in Supabase Storage, then paste the URL)</label>
                <input id="c-image" type="url" placeholder="https://…/portfolio-images/project.jpg"
                  [ngModel]="form().image_url"
                  (ngModelChange)="patch('image_url', $event)" name="image_url">
              </div>
              <div class="field">
                <label for="c-sort">Sort order</label>
                <input id="c-sort" type="number"
                  [ngModel]="form().sort"
                  (ngModelChange)="patch('sort', +$event)" name="sort">
              </div>
              <div class="field span-2">
                <label for="c-live">Live site URL</label>
                <input id="c-live" type="url" placeholder="https://…"
                  [ngModel]="form().live_url"
                  (ngModelChange)="patch('live_url', $event)" name="live_url">
              </div>
              <div class="field checkbox-field">
                <input id="c-published" type="checkbox"
                  [ngModel]="form().is_published"
                  (ngModelChange)="patch('is_published', $event)" name="is_published">
                <label for="c-published">Published on the website</label>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn--accent" [disabled]="!form().title.trim()">
                {{ form().id ? 'Save changes' : 'Add item' }}
              </button>
              @if (form().id) {
                <button type="button" class="btn btn--ghost" (click)="reset()">Cancel edit</button>
              }
            </div>
          </form>
        </div>

        <div class="admin-card">
          <h2>Portfolio items</h2>
          <div class="table-wrap">
            <table class="admin-table">
              <thead>
                <tr><th>Title</th><th>Category</th><th>Badge</th><th>Published</th><th>Actions</th></tr>
              </thead>
              <tbody>
                @for (row of items(); track row.id) {
                  <tr>
                    <td>{{ row.title }}</td>
                    <td>{{ row.category }}</td>
                    <td>{{ row.badge || ', ' }}</td>
                    <td><span class="status-pill">{{ row.is_published ? 'Published' : 'Hidden' }}</span></td>
                    <td>
                      <div class="row-actions">
                        <button type="button" class="btn btn--ghost btn--small" (click)="editItem(row)">Edit</button>
                        <button type="button" class="btn btn--ghost btn--small" (click)="togglePublish(row)">
                          {{ row.is_published ? 'Unpublish' : 'Publish' }}
                        </button>
                        <button type="button" class="btn btn--danger btn--small" (click)="removeItem(row)">Delete</button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr><td class="empty-row" colspan="5">No portfolio rows yet, the website is showing its built-in items.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <div class="admin-card">
          <h2>Services &amp; prices</h2>
          <p class="card-note">
            These rows override the built-in service titles, descriptions and starting prices on the
            website. Match <code>service_key</code> values to the built-in services
            (websites, invitations, logo-branding, posters-banners, social-media, content-writing).
          </p>
          @for (row of servicesContent(); track row.id) {
            <div class="service-edit">
              <div class="form-grid">
                <div class="field">
                  <label>Key</label>
                  <input type="text" [value]="row.service_key" disabled>
                </div>
                <div class="field">
                  <label>Title</label>
                  <input type="text"
                    [ngModel]="row.title"
                    (ngModelChange)="patchService(row, 'title', $event)"
                    [name]="'title-' + row.id">
                </div>
                <div class="field">
                  <label>Price from</label>
                  <input type="text"
                    [ngModel]="row.price_from"
                    (ngModelChange)="patchService(row, 'price_from', $event)"
                    [name]="'price-' + row.id">
                </div>
                <div class="field span-3">
                  <label>Description</label>
                  <textarea
                    [ngModel]="row.description"
                    (ngModelChange)="patchService(row, 'description', $event)"
                    [name]="'desc-' + row.id"></textarea>
                </div>
              </div>
              <div class="form-actions">
                <label class="checkbox-inline">
                  <input type="checkbox"
                    [ngModel]="row.is_published"
                    (ngModelChange)="patchService(row, 'is_published', $event)"
                    [name]="'pub-' + row.id">
                  Published
                </label>
                <button type="button" class="btn btn--ink btn--small" (click)="saveService(row)">Save service</button>
                @if (savedKey() === row.id) {
                  <span class="saved-note">Saved ✓</span>
                }
              </div>
            </div>
          } @empty {
            <p class="empty-row">No service rows yet, add rows in Supabase (services_content) to start overriding the built-in copy.</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .card-note { color: var(--muted); font-size: 14px; margin-bottom: 18px; }
      .card-note code { background: var(--sand); padding: 1px 6px; border-radius: 6px; font-size: 12.5px; }
      .service-edit { border-top: 1px solid var(--line); padding-top: 20px; margin-top: 20px; }
      .service-edit:first-of-type { border-top: none; padding-top: 0; margin-top: 0; }
      .checkbox-inline { display: inline-flex; align-items: center; gap: 8px; font-size: 14.5px; font-weight: 500; }
      .checkbox-inline input { width: 18px; height: 18px; accent-color: var(--accent); }
      .saved-note { color: var(--accent); font-weight: 600; font-size: 14px; }
    `,
  ],
})
export class ContentAdmin implements OnInit {
  private readonly admin = inject(AdminService);
  readonly categories = WORK_CATEGORIES.map((c) => c.name);
  readonly items = signal<PortfolioRow[]>([]);
  readonly servicesContent = signal<ServiceContentRow[]>([]);
  readonly form = signal<PortfolioForm>(emptyForm());
  readonly savedKey = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  private async reload(): Promise<void> {
    const [items, services] = await Promise.all([
      this.admin.listPortfolio(),
      this.admin.listServiceContent(),
    ]);
    this.items.set(items);
    this.servicesContent.set(services);
  }

  patch<K extends keyof PortfolioForm>(key: K, value: PortfolioForm[K]): void {
    this.form.update((f) => ({ ...f, [key]: value }));
  }

  editItem(row: PortfolioRow): void {
    this.form.set({
      id: row.id,
      title: row.title,
      category: row.category,
      image_url: row.image_url ?? '',
      live_url: row.live_url ?? '',
      badge: row.badge ?? 'Live Client Project',
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
    await this.admin.savePortfolio({
      ...(f.id ? { id: f.id } : {}),
      title: f.title.trim(),
      category: f.category,
      image_url: f.image_url.trim() || null,
      live_url: f.live_url.trim() || null,
      badge: f.badge,
      is_published: f.is_published,
      sort: f.sort || 0,
    });
    this.reset();
    await this.reload();
  }

  async togglePublish(row: PortfolioRow): Promise<void> {
    await this.admin.savePortfolio({ id: row.id, is_published: !row.is_published });
    await this.reload();
  }

  async removeItem(row: PortfolioRow): Promise<void> {
    if (!confirm(`Delete portfolio item "${row.title}"?`)) return;
    await this.admin.deletePortfolio(row.id);
    await this.reload();
  }

  patchService<K extends keyof ServiceContentRow>(row: ServiceContentRow, key: K, value: ServiceContentRow[K]): void {
    this.servicesContent.update((list) =>
      list.map((r) => (r.id === row.id ? { ...r, [key]: value } : r)),
    );
  }

  async saveService(row: ServiceContentRow): Promise<void> {
    await this.admin.saveServiceContent(row);
    this.savedKey.set(row.id);
    setTimeout(() => this.savedKey.set(null), 2500);
  }
}
