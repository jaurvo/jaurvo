import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService, OfferRow, shortDate } from './admin.service';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-offers-admin',
  standalone: true,
  imports: [FormsModule, Icon],
  styleUrl: './admin.scss',
  template: `
    <section class="admin-page">
      <div class="container">
        <div class="admin-head">
          <h1>Offers</h1>
          <p>Create limited-time offers. The active offer shows as a shiny badge on the homepage, and hides itself after expiry.</p>
        </div>

        <div class="admin-card">
          <h2 class="form-title">{{ editingId() ? 'Edit offer' : 'Add offer' }}</h2>
          <div class="form-grid">
            <label>Title*
              <input type="text" [ngModel]="formTitle()" (ngModelChange)="formTitle.set($event)" placeholder="Diwali Sale" />
            </label>
            <label>Badge text*
              <input type="text" [ngModel]="formBadge()" (ngModelChange)="formBadge.set($event)" placeholder="20% OFF" />
            </label>
            <label class="span-2">Description
              <textarea [ngModel]="formDesc()" (ngModelChange)="formDesc.set($event)" rows="2" placeholder="20% off on all website packages"></textarea>
            </label>
            <label>Starts at
              <input type="datetime-local" [ngModel]="formStarts()" (ngModelChange)="formStarts.set($event)" />
            </label>
            <label>Expires at
              <input type="datetime-local" [ngModel]="formExpires()" (ngModelChange)="formExpires.set($event)" />
            </label>
            <label class="check-row">
              <input type="checkbox" [ngModel]="formActive()" (ngModelChange)="formActive.set($event)" /> Active
            </label>
          </div>
          <div class="form-actions">
            <button type="button" class="btn" (click)="save()" [disabled]="saving() || !formTitle().trim() || !formBadge().trim()">
              {{ saving() ? 'Saving…' : editingId() ? 'Update offer' : 'Add offer' }}
            </button>
            @if (editingId()) {
              <button type="button" class="btn btn--small" (click)="resetForm()">Cancel</button>
            }
          </div>
          @if (formError()) {
            <p class="form-error">{{ formError() }}</p>
          }
        </div>

        <div class="admin-card">
          <div class="table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Title</th><th>Badge</th><th>Expires</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (row of rows(); track row.id) {
                  <tr>
                    <td>{{ row.title }}</td>
                    <td><span class="offer-badge">{{ row.badge_text }}</span></td>
                    <td>{{ row.expires_at ? shortDate(row.expires_at) : '—' }}</td>
                    <td>{{ statusOf(row) }}</td>
                    <td>
                      <div class="row-actions">
                        <button type="button" class="btn btn--small" (click)="edit(row)">Edit</button>
                        <button type="button" class="icon-btn icon-btn--danger" (click)="remove(row)" [attr.aria-label]="'Delete offer ' + row.title" title="Delete">
                          <app-icon name="trash-2" [size]="16" />
                        </button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr><td class="empty-row" colspan="5">No offers yet. Add your first one above.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .form-title { font-size: 18px; margin: 0; }
    .form-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin: 16px 0; }
    @media (min-width: 640px) { .form-grid { grid-template-columns: 1fr 1fr; } }
    .form-grid label { display: flex; flex-direction: column; gap: 6px; font-size: 13.5px; font-weight: 600; }
    .form-grid .span-2 { grid-column: 1 / -1; }
    .form-grid input[type="text"], .form-grid input[type="datetime-local"], .form-grid textarea {
      font: inherit; font-weight: 400; padding: 10px 12px; border-radius: 10px;
      border: 1px solid var(--line); background: var(--bg); color: var(--text);
    }
    .check-row { flex-direction: row !important; align-items: center; gap: 8px !important; }
    .form-actions { display: flex; gap: 10px; align-items: center; }
    .form-error { color: #B3261E; font-size: 13px; margin-top: 10px; }
    .row-actions { display: flex; gap: 8px; align-items: center; }
    .offer-badge {
      display: inline-block; padding: 4px 10px; border-radius: 999px;
      background: var(--sand); color: var(--accent); font-size: 12.5px; font-weight: 700;
    }
    .icon-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 38px; height: 38px; border-radius: 10px;
      border: 1px solid var(--line); background: transparent; cursor: pointer; color: var(--muted);
    }
    .icon-btn--danger { color: #B3261E; border-color: #B3261E; }
    .icon-btn--danger:hover { background: #B3261E; color: #fff; }
  `],
})
export class OffersAdmin implements OnInit {
  private readonly admin = inject(AdminService);
  readonly shortDate = shortDate;
  readonly rows = signal<OfferRow[]>([]);

  readonly editingId = signal<string | null>(null);
  readonly formTitle = signal('');
  readonly formBadge = signal('');
  readonly formDesc = signal('');
  readonly formStarts = signal('');
  readonly formExpires = signal('');
  readonly formActive = signal(true);
  readonly saving = signal(false);
  readonly formError = signal('');

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  async load(): Promise<void> {
    this.rows.set(await this.admin.listOffers());
  }

  statusOf(row: OfferRow): string {
    if (!row.is_active) return 'Inactive';
    if (row.expires_at && new Date(row.expires_at).getTime() <= Date.now()) return 'Expired';
    return 'Active';
  }

  edit(row: OfferRow): void {
    this.editingId.set(row.id);
    this.formTitle.set(row.title);
    this.formBadge.set(row.badge_text);
    this.formDesc.set(row.description ?? '');
    this.formStarts.set(this.toLocalInput(row.starts_at));
    this.formExpires.set(this.toLocalInput(row.expires_at));
    this.formActive.set(row.is_active);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetForm(): void {
    this.editingId.set(null);
    this.formTitle.set('');
    this.formBadge.set('');
    this.formDesc.set('');
    this.formStarts.set('');
    this.formExpires.set('');
    this.formActive.set(true);
    this.formError.set('');
  }

  async save(): Promise<void> {
    const title = this.formTitle().trim();
    const badge = this.formBadge().trim();
    if (!title || !badge) return;
    this.saving.set(true);
    this.formError.set('');
    try {
      const payload: Partial<OfferRow> = {
        title,
        badge_text: badge,
        description: this.formDesc().trim() || null,
        starts_at: this.formStarts() ? new Date(this.formStarts()).toISOString() : null,
        expires_at: this.formExpires() ? new Date(this.formExpires()).toISOString() : null,
        is_active: this.formActive(),
      };
      const id = this.editingId();
      if (id) payload.id = id;
      await this.admin.saveOffer(payload);
      await this.load();
      this.resetForm();
    } catch {
      this.formError.set('Could not save. Please try again.');
    } finally {
      this.saving.set(false);
    }
  }

  async remove(row: OfferRow): Promise<void> {
    const ok = confirm(`Delete offer "${row.title}"? This cannot be undone.`);
    if (!ok) return;
    await this.admin.deleteOffer(row.id);
    await this.load();
  }

  private toLocalInput(iso: string | null): string {
    if (!iso) return '';
    const d = new Date(iso);
    const pad = (n: number): string => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
}
