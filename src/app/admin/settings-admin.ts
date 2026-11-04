import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService, SettingRow } from './admin.service';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './admin.scss',
  template: `
    <section class="admin-page">
      <div class="container">
        <div class="admin-head">
          <h1>Site settings</h1>
          <p>Texts and numbers shown on the website — hero heading, stats, tagline. Save = live immediately.</p>
        </div>

        <div class="admin-card">
          <h2>{{ editingKey() ? 'Edit setting' : 'Add a setting' }}</h2>
          <form (ngSubmit)="saveSetting()">
            <div class="form-grid">
              <div class="field">
                <label for="s-key">Key</label>
                <input id="s-key" type="text" required placeholder="e.g. hero_sub"
                  [ngModel]="key()"
                  (ngModelChange)="key.set($event)" name="key"
                  [disabled]="editingKey() !== null">
              </div>
              <div class="field span-2">
                <label for="s-value">Value</label>
                <textarea id="s-value" rows="3" required
                  [ngModel]="value()"
                  (ngModelChange)="value.set($event)" name="value"></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn--accent" [disabled]="!key().trim() || !value().trim()">
                {{ editingKey() ? 'Save changes' : 'Add setting' }}
              </button>
              @if (editingKey()) {
                <button type="button" class="btn btn--ghost" (click)="reset()">Cancel edit</button>
              }
            </div>
          </form>
        </div>

        <div class="admin-card">
          <h2>Current settings</h2>
          <div class="table-wrap">
            <table class="admin-table">
              <thead>
                <tr><th>Key</th><th>Value</th><th>Actions</th></tr>
              </thead>
              <tbody>
                @for (row of items(); track row.key) {
                  <tr>
                    <td><code>{{ row.key }}</code></td>
                    <td class="msg-cell">{{ row.value }}</td>
                    <td>
                      <div class="row-actions">
                        <button type="button" class="btn btn--ghost btn--small" (click)="editRow(row)">Edit</button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr><td class="empty-row" colspan="3">No settings yet. Add the keys below to start overriding website texts.</td></tr>
                }
              </tbody>
            </table>
          </div>
          <p class="card-note" style="margin-top:16px">
            Useful keys: <code>hero_sub</code>, <code>stat1_value</code>,
            <code>stat1_label</code>, <code>stat2_value</code>, <code>stat2_label</code>,
            <code>stat3_value</code>, <code>stat3_label</code>
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .msg-cell { max-width: 420px; overflow-wrap: anywhere; }
    code { background: var(--sand); padding: 1px 6px; border-radius: 6px; font-size: 12.5px; }
  `],
})
export class SettingsAdmin implements OnInit {
  private readonly admin = inject(AdminService);
  readonly items = signal<SettingRow[]>([]);
  readonly key = signal('');
  readonly value = signal('');
  readonly editingKey = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  private async reload(): Promise<void> {
    this.items.set(await this.admin.listSettings());
  }

  editRow(row: SettingRow): void {
    this.editingKey.set(row.key);
    this.key.set(row.key);
    this.value.set(row.value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  reset(): void {
    this.editingKey.set(null);
    this.key.set('');
    this.value.set('');
  }

  async saveSetting(): Promise<void> {
    await this.admin.saveSetting(this.key().trim(), this.value().trim());
    this.reset();
    await this.reload();
  }
}
