import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ENQUIRY_STATUSES } from '../core/data';
import { AdminService, EnquiryRow, shortDate } from './admin.service';

@Component({
  selector: 'app-admin-enquiries',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './admin.scss',
  template: `
    <section class="admin-page">
      <div class="container">
        <div class="admin-head">
          <h1>Enquiries</h1>
          <p>Every enquiry from the Contact page form. Move each one along the pipeline as you work it.</p>
        </div>

        <div class="admin-card">
          <div class="table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Date</th><th>Name</th><th>Contact</th><th>Service</th><th>Message</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                @for (row of rows(); track row.id) {
                  <tr>
                    <td>{{ shortDate(row.created_at) }}</td>
                    <td>{{ row.name }}</td>
                    <td>{{ row.contact }}</td>
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
                  </tr>
                } @empty {
                  <tr><td class="empty-row" colspan="6">No enquiries yet.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`.msg-cell { max-width: 320px; }`],
})
export class Enquiries implements OnInit {
  private readonly admin = inject(AdminService);
  readonly shortDate = shortDate;
  readonly statuses = ENQUIRY_STATUSES;
  readonly rows = signal<EnquiryRow[]>([]);

  async ngOnInit(): Promise<void> {
    this.rows.set(await this.admin.listEnquiries());
  }

  async changeStatus(row: EnquiryRow, status: string): Promise<void> {
    await this.admin.setEnquiryStatus(row.id, status);
    this.rows.update((list) => list.map((r) => (r.id === row.id ? { ...r, status } : r)));
  }
}
