import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService, TeamMemberRow } from './admin.service';

interface TeamForm {
  id: string | null;
  name: string;
  role: string;
  photo_url: string;
  is_published: boolean;
  sort: number;
}

const emptyForm = (): TeamForm => ({
  id: null,
  name: '',
  role: '',
  photo_url: '',
  is_published: true,
  sort: 0,
});

@Component({
  selector: 'app-admin-team',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './admin.scss',
  template: `
    <section class="admin-page">
      <div class="container">
        <div class="admin-head">
          <h1>Team</h1>
          <p>Team members shown on the website. Publish = live immediately.</p>
        </div>

        <div class="admin-card">
          <h2>{{ form().id ? 'Edit member' : 'Add a team member' }}</h2>
          <form (ngSubmit)="saveItem()">
            <div class="form-grid">
              <div class="field">
                <label for="t-name">Name</label>
                <input id="t-name" type="text" required
                  [ngModel]="form().name"
                  (ngModelChange)="patch('name', $event)" name="name">
              </div>
              <div class="field">
                <label for="t-role">Role</label>
                <input id="t-role" type="text" placeholder="e.g. Software Engineer"
                  [ngModel]="form().role"
                  (ngModelChange)="patch('role', $event)" name="role">
              </div>
              <div class="field span-2">
                <label for="t-photo">Photo</label>
                <div class="image-row">
                  <input id="t-photo" type="url" placeholder="https://…/photo.jpg"
                    [ngModel]="form().photo_url"
                    (ngModelChange)="patch('photo_url', $event)" name="photo_url">
                  <label class="btn btn--ink btn--small file-btn">
                    {{ uploading() ? 'Uploading…' : 'Upload photo' }}
                    <input type="file" accept="image/*" hidden
                      (change)="onImageFile($event)" [disabled]="uploading()">
                  </label>
                </div>
                @if (uploadError()) {
                  <p class="field-error">{{ uploadError() }}</p>
                }
                @if (form().photo_url) {
                  <img class="image-preview" [src]="form().photo_url" alt="Team member photo preview">
                }
              </div>
              <div class="field">
                <label for="t-sort">Sort order</label>
                <input id="t-sort" type="number"
                  [ngModel]="form().sort"
                  (ngModelChange)="patch('sort', +$event)" name="sort">
              </div>
              <div class="field checkbox-field">
                <input id="t-published" type="checkbox"
                  [ngModel]="form().is_published"
                  (ngModelChange)="patch('is_published', $event)" name="is_published">
                <label for="t-published">Published on the website</label>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn--accent" [disabled]="!form().name.trim()">
                {{ form().id ? 'Save changes' : 'Add member' }}
              </button>
              @if (form().id) {
                <button type="button" class="btn btn--ghost" (click)="reset()">Cancel edit</button>
              }
            </div>
          </form>
        </div>

        <div class="admin-card">
          <h2>Team members</h2>
          <div class="table-wrap">
            <table class="admin-table">
              <thead>
                <tr><th>Photo</th><th>Name</th><th>Role</th><th>Published</th><th>Actions</th></tr>
              </thead>
              <tbody>
                @for (row of items(); track row.id) {
                  <tr>
                    <td>
                      @if (row.photo_url) {
                        <img class="thumb" [src]="row.photo_url" [alt]="row.name">
                      } @else {
                        <span class="no-thumb">—</span>
                      }
                    </td>
                    <td>{{ row.name }}</td>
                    <td>{{ row.role || '—' }}</td>
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
                  <tr><td class="empty-row" colspan="5">No team members yet.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .image-row { display: flex; gap: 10px; align-items: center; }
    .image-row input[type="url"] { flex: 1; }
    .file-btn { cursor: pointer; white-space: nowrap; }
    .image-preview { margin-top: 10px; max-width: 160px; border-radius: 10px; border: 1px solid var(--line); }
    .field-error { color: #c0392b; font-size: 13px; margin-top: 6px; }
    .thumb { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
    .no-thumb { color: var(--muted); }
  `],
})
export class TeamAdmin implements OnInit {
  private readonly admin = inject(AdminService);
  readonly items = signal<TeamMemberRow[]>([]);
  readonly form = signal<TeamForm>(emptyForm());
  readonly uploading = signal(false);
  readonly uploadError = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  private async reload(): Promise<void> {
    this.items.set(await this.admin.listTeamMembers());
  }

  patch<K extends keyof TeamForm>(key: K, value: TeamForm[K]): void {
    this.form.update((f) => ({ ...f, [key]: value }));
  }

  async onImageFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    this.uploading.set(true);
    this.uploadError.set(null);
    try {
      const url = await this.admin.uploadPortfolioImage(file);
      this.patch('photo_url', url);
    } catch (e) {
      this.uploadError.set(e instanceof Error ? e.message : 'Upload failed, try again.');
    } finally {
      this.uploading.set(false);
    }
  }

  editItem(row: TeamMemberRow): void {
    this.form.set({
      id: row.id,
      name: row.name,
      role: row.role ?? '',
      photo_url: row.photo_url ?? '',
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
    await this.admin.saveTeamMember({
      ...(f.id ? { id: f.id } : {}),
      name: f.name.trim(),
      role: f.role.trim(),
      photo_url: f.photo_url.trim() || null,
      is_published: f.is_published,
      sort: f.sort || 0,
    });
    this.reset();
    await this.reload();
  }

  async togglePublish(row: TeamMemberRow): Promise<void> {
    await this.admin.saveTeamMember({ id: row.id, is_published: !row.is_published });
    await this.reload();
  }

  async moveItem(row: TeamMemberRow, dir: -1 | 1): Promise<void> {
    const sorted = [...this.items()].sort((a, b) => a.sort - b.sort);
    const i = sorted.findIndex((r) => r.id === row.id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= sorted.length) return;
    const a = sorted[i];
    const b = sorted[j];
    await this.admin.saveTeamMember({ id: a.id, sort: b.sort });
    await this.admin.saveTeamMember({ id: b.id, sort: a.sort });
    await this.reload();
  }

  async removeItem(row: TeamMemberRow): Promise<void> {
    if (!confirm(`Delete team member "${row.name}"?`)) return;
    await this.admin.deleteTeamMember(row.id);
    await this.reload();
  }
}
