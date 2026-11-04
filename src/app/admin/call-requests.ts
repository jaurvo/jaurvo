import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService, CallRequestRow, shortDate } from './admin.service';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-call-requests',
  standalone: true,
  imports: [FormsModule, Icon],
  styleUrl: './admin.scss',
  template: `
    <section class="admin-page">
      <div class="container">
        <div class="admin-head">
          <h1>Call Requests</h1>
          <p>Visitors who asked for a call back. Call them, then mark as done.</p>
        </div>

        <div class="admin-card">
          <div class="filter-bar">
            <input
              type="search"
              placeholder="Search name, phone..."
              [ngModel]="searchText()"
              (ngModelChange)="searchText.set($event)"
              aria-label="Search call requests"
            />
            <select
              class="mini-select"
              [ngModel]="statusFilter()"
              (ngModelChange)="statusFilter.set($event)"
              aria-label="Filter by status"
            >
              <option value="All">All statuses</option>
              <option value="New">New</option>
              <option value="Called">Called</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div class="table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Date</th><th>Name</th><th>Phone</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (row of filteredRows(); track row.id) {
                  <tr>
                    <td>{{ shortDate(row.created_at) }}</td>
                    <td>{{ row.name }}</td>
                    <td><a [href]="'tel:' + row.phone">{{ row.phone }}</a></td>
                    <td>
                      <select
                        class="mini-select"
                        [ngModel]="row.status"
                        (ngModelChange)="setStatus(row, $event)"
                        [attr.aria-label]="'Status for ' + row.name"
                      >
                        <option value="New">New</option>
                        <option value="Called">Called</option>
                        <option value="Done">Done</option>
                      </select>
                    </td>
                    <td>
                      <button type="button" class="icon-btn icon-btn--danger" (click)="remove(row)" [attr.aria-label]="'Delete call request from ' + row.name" title="Delete">
                        <app-icon name="trash-2" [size]="16" />
                      </button>
                    </td>
                  </tr>
                } @empty {
                  <tr><td class="empty-row" colspan="5">No call requests yet.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .filter-bar { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 18px; }
    .filter-bar input[type="search"] { flex: 1; min-width: 200px; }
    .filter-bar select { min-width: 160px; }
    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 10px;
      border: 1px solid var(--line);
      background: transparent;
      cursor: pointer;
      color: var(--muted);
    }
    .icon-btn--danger { color: #B3261E; border-color: #B3261E; }
    .icon-btn--danger:hover { background: #B3261E; color: #fff; }
  `],
})
export class CallRequests implements OnInit {
  private readonly admin = inject(AdminService);
  readonly shortDate = shortDate;
  readonly rows = signal<CallRequestRow[]>([]);
  readonly searchText = signal('');
  readonly statusFilter = signal('All');
  readonly loading = signal(true);

  readonly filteredRows = computed(() => {
    const q = this.searchText().trim().toLowerCase();
    const s = this.statusFilter();
    return this.rows().filter((row) => {
      if (s !== 'All' && row.status !== s) return false;
      if (!q) return true;
      return [row.name, row.phone].some((v) => (v ?? '').toLowerCase().includes(q));
    });
  });

  async ngOnInit(): Promise<void> {
    try {
      this.rows.set(await this.admin.listCallRequests());
    } finally {
      this.loading.set(false);
    }
  }

  async setStatus(row: CallRequestRow, status: string): Promise<void> {
    await this.admin.setCallRequestStatus(row.id, status);
    this.rows.update((list) => list.map((r) => (r.id === row.id ? { ...r, status } : r)));
  }

  async remove(row: CallRequestRow): Promise<void> {
    const ok = confirm(`Delete call request from ${row.name}? This cannot be undone.`);
    if (!ok) return;
    await this.admin.deleteCallRequest(row.id);
    this.rows.update((list) => list.filter((r) => r.id !== row.id));
  }
}
