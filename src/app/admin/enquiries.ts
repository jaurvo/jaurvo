import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ENQUIRY_STATUSES } from '../core/data';
import { AdminService, EnquiryRow, shortDate } from './admin.service';
import { Icon } from '../shared/icon';

interface ReplyTemplate {
  label: string;
  text: string;
}

@Component({
  selector: 'app-admin-enquiries',
  standalone: true,
  imports: [FormsModule, Icon],
  styleUrl: './admin.scss',
  template: `
    <section class="admin-page">
      <div class="container">
        <div class="admin-head">
          <h1>Enquiries</h1>
          <p>Every enquiry from the Contact page form. Move each one along the pipeline as you work it.</p>
        </div>

        <div class="admin-card">
          <div class="filter-bar">
            <input
              type="search"
              placeholder="Search name, contact, service..."
              [ngModel]="searchText()"
              (ngModelChange)="searchText.set($event)"
              aria-label="Search enquiries"
            />
            <select
              class="mini-select"
              [ngModel]="statusFilter()"
              (ngModelChange)="statusFilter.set($event)"
              aria-label="Filter by status"
            >
              <option value="All">All statuses</option>
              @for (status of statuses; track status) {
                <option [value]="status">{{ status }}</option>
              }
            </select>
            <button type="button" class="btn btn--small" (click)="exportCsv()">Export CSV</button>
          </div>
          <div class="table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Date</th><th>Name</th><th>Contact</th><th>Service</th><th>Message</th><th>Status</th><th>Quick reply</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (row of filteredRows(); track row.id) {
                  <tr>
                    <td>{{ shortDate(row.created_at) }}</td>
                    <td>{{ row.name }}</td>
                    <td>
                      @if (isEmail(row.contact)) {
                        <a [href]="'mailto:' + row.contact.trim()">{{ row.contact }}</a>
                      } @else {
                        <div><a [href]="telLink(row.contact)">{{ row.contact }}</a></div>
                        <div><a [href]="waLink(row.contact)" target="_blank" rel="noopener">WhatsApp</a></div>
                      }
                    </td>
                    <td>{{ row.service || ', ' }}</td>
                    <td class="msg-cell">{{ row.message || ', ' }}</td>
                    <td>
                      <select
                        class="mini-select"
                        [ngModel]="row.status"
                        (ngModelChange)="changeStatus(row, $event)"
                        [attr.aria-label]="'Status for ' + row.name"
                      >
                        @for (status of statuses; track status) {
                          <option [value]="status">{{ status }}</option>
                        }
                      </select>
                    </td>
                    <td>
                      <div class="reply-box">
                        <select
                          class="mini-select"
                          [ngModel]="replyTemplate()"
                          (ngModelChange)="replyTemplate.set($event)"
                          aria-label="Reply template"
                        >
                          @for (t of replyTemplates; track t.label) {
                            <option [value]="t.label">{{ t.label }}</option>
                          }
                        </select>
                        <button type="button" class="btn btn--small" (click)="copyReply(row)">Copy</button>
                        @if (copiedId() === row.id) {
                          <span class="copied-note">Copied!</span>
                        }
                      </div>
                    </td>
                    <td>
                      <button type="button" class="icon-btn icon-btn--danger" (click)="deleteRow(row)" [attr.aria-label]="'Delete enquiry from ' + row.name" title="Delete">
                        <app-icon name="trash-2" [size]="16" />
                      </button>
                    </td>
                  </tr>
                } @empty {
                  <tr><td class="empty-row" colspan="8">No enquiries yet.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .msg-cell { max-width: 320px; }
    .filter-bar { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 18px; }
    .filter-bar input[type="search"] { flex: 1; min-width: 200px; }
    .filter-bar select { min-width: 160px; }
    .reply-box { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; min-width: 220px; }
    .copied-note { color: #2e7d32; font-size: 12.5px; font-weight: 600; }
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
export class Enquiries implements OnInit {
  private readonly admin = inject(AdminService);
  readonly shortDate = shortDate;
  readonly statuses = ENQUIRY_STATUSES;
  readonly rows = signal<EnquiryRow[]>([]);
  readonly searchText = signal('');
  readonly statusFilter = signal('All');
  readonly replyTemplate = signal('Thanks + ask details');
  readonly copiedId = signal<string | null>(null);

  readonly replyTemplates: ReplyTemplate[] = [
    {
      label: 'Thanks + ask details',
      text: 'Hi {name}, thanks for reaching out to Jaurvo! Could you share a few more details about what you need? I will send you a fixed quote once I understand the scope.',
    },
    {
      label: 'Quote sent',
      text: 'Hi {name}, I have sent your fixed quote. Let me know if you would like any changes, I can adjust the scope to fit your budget.',
    },
    {
      label: 'Follow-up',
      text: 'Hi {name}, just following up on your enquiry. Any questions about the quote? I can start as soon as you confirm.',
    },
    {
      label: 'Project started',
      text: 'Hi {name}, good news, work on your project has started! I will share the first preview with you soon.',
    },
    {
      label: 'Payment reminder',
      text: 'Hi {name}, a friendly reminder that the advance payment is still pending. Once it is received I will begin work right away.',
    },
    {
      label: 'Delivered',
      text: 'Hi {name}, your project is delivered! Please have a look and tell me if anything needs a tweak. Thanks for working with Jaurvo.',
    },
  ];

  readonly filteredRows = computed(() => {
    const q = this.searchText().trim().toLowerCase();
    const s = this.statusFilter();
    return this.rows().filter((row) => {
      if (s !== 'All' && row.status !== s) return false;
      if (!q) return true;
      return [row.name, row.contact, row.service, row.message]
        .some((v) => (v ?? '').toLowerCase().includes(q));
    });
  });

  async ngOnInit(): Promise<void> {
    this.rows.set(await this.admin.listEnquiries());
  }

  async changeStatus(row: EnquiryRow, status: string): Promise<void> {
    await this.admin.setEnquiryStatus(row.id, status);
    this.rows.update((list) => list.map((r) => (r.id === row.id ? { ...r, status } : r)));
  }

  async deleteRow(row: EnquiryRow): Promise<void> {
    const ok = confirm(`Delete enquiry from ${row.name}? This cannot be undone.`);
    if (!ok) return;
    await this.admin.deleteEnquiry(row.id);
    this.rows.update((list) => list.filter((r) => r.id !== row.id));
  }

  async copyReply(row: EnquiryRow): Promise<void> {
    const tpl = this.replyTemplates.find((t) => t.label === this.replyTemplate()) ?? this.replyTemplates[0];
    const text = tpl.text.replaceAll('{name}', row.name?.trim() || 'there');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    this.copiedId.set(row.id);
    setTimeout(() => this.copiedId.set(null), 1500);
  }

  exportCsv(): void {
    const rows = this.filteredRows();
    const esc = (v: string | null | undefined): string => `"${(v ?? '').replace(/"/g, '""')}"`;
    const lines = [
      ['Date', 'Name', 'Contact', 'Service', 'Message', 'Status'].join(','),
      ...rows.map((r) =>
        [shortDate(r.created_at), r.name, r.contact, r.service ?? '', r.message ?? '', r.status]
          .map(esc)
          .join(','),
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  isEmail(contact: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());
  }

  telLink(contact: string): string {
    return 'tel:' + contact.replace(/[^\d+]/g, '');
  }

  waLink(contact: string): string {
    return 'https://wa.me/' + contact.replace(/\D/g, '');
  }
}
