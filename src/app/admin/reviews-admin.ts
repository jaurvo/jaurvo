import { Component, OnInit, inject, signal } from '@angular/core';
import { AdminService, ReviewRow, shortDate } from './admin.service';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [Icon],
  styleUrl: './admin.scss',
  template: `
    <section class="admin-page">
      <div class="container">
        <div class="admin-head">
          <h1>Reviews</h1>
          <p>Only approved reviews appear on the public About page. Nothing is published without your say-so.</p>
        </div>

        <div class="admin-card">
          <div class="table-wrap">
            <table class="admin-table">
              <thead>
                <tr><th>Date</th><th>Name</th><th>Rating</th><th>Review</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                @for (row of rows(); track row.id) {
                  <tr>
                    <td>{{ shortDate(row.created_at) }}</td>
                    <td>{{ row.name }}</td>
                    <td>
                      <span class="stars" [attr.aria-label]="row.rating + ' out of 5'">
                        @for (star of stars; track star) {
                          <app-icon name="star" [size]="16" />
                        }
                        {{ row.rating }}/5
                      </span>
                    </td>
                    <td class="msg-cell">{{ row.text }}</td>
                    <td><span class="status-pill">{{ row.is_approved ? 'Approved' : 'Pending' }}</span></td>
                    <td>
                      <div class="row-actions">
                        <button type="button" class="btn btn--ghost btn--small" (click)="toggle(row)">
                          {{ row.is_approved ? 'Unapprove' : 'Approve' }}
                        </button>
                        <button type="button" class="btn btn--danger btn--small" (click)="remove(row)">Delete</button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr><td class="empty-row" colspan="6">No reviews yet, new client reviews will wait here for approval.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .msg-cell { max-width: 340px; }
      .stars { display: inline-flex; align-items: center; gap: 3px; color: var(--accent); white-space: nowrap; }
    `,
  ],
})
export class ReviewsAdmin implements OnInit {
  private readonly admin = inject(AdminService);
  readonly shortDate = shortDate;
  readonly stars = [1, 2, 3, 4, 5];
  readonly rows = signal<ReviewRow[]>([]);

  async ngOnInit(): Promise<void> {
    this.rows.set(await this.admin.listReviews());
  }

  async toggle(row: ReviewRow): Promise<void> {
    await this.admin.setReviewApproved(row.id, !row.is_approved);
    this.rows.update((list) =>
      list.map((r) => (r.id === row.id ? { ...r, is_approved: !r.is_approved } : r)),
    );
  }

  async remove(row: ReviewRow): Promise<void> {
    if (!confirm(`Delete the review from ${row.name}?`)) return;
    await this.admin.deleteReview(row.id);
    this.rows.update((list) => list.filter((r) => r.id !== row.id));
  }
}
