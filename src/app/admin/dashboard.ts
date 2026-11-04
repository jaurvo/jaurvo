import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService, EnquiryRow, inr, shortDate } from './admin.service';

interface TodayAction {
  text: string;
  link?: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './admin.scss',
  template: `
    <section class="admin-page">
      <div class="container">
        <div class="admin-head">
          <h1>Dashboard</h1>
          <p>The whole studio at a glance, enquiries, work in flight and money.</p>
        </div>

        <div class="admin-card">
          <h2>Today's focus</h2>
          <ul class="today-list">
            @for (a of actions(); track a.text) {
              <li>
                @if (a.link) {
                  <a [routerLink]="a.link">{{ a.text }} →</a>
                } @else {
                  <span>{{ a.text }}</span>
                }
              </li>
            }
          </ul>
        </div>

        <div class="stat-grid">
          <div class="stat-card">
            <p class="stat-value">{{ totalEnquiries() }}</p>
            <p class="stat-label">Total enquiries</p>
          </div>
          <div class="stat-card">
            <p class="stat-value">{{ activeProjects() }}</p>
            <p class="stat-label">Active projects</p>
          </div>
          <div class="stat-card">
            <p class="stat-value">{{ inr(monthEarnings()) }}</p>
            <p class="stat-label">Earned this month</p>
          </div>
          <div class="stat-card">
            <p class="stat-value">{{ inr(pendingBalance()) }}</p>
            <p class="stat-label">Pending balance</p>
          </div>
        </div>

        <div class="admin-card">
          <h2>Latest enquiries</h2>
          <div class="table-wrap">
            <table class="admin-table">
              <thead>
                <tr><th>Date</th><th>Name</th><th>Service</th><th>Status</th></tr>
              </thead>
              <tbody>
                @for (row of latest(); track row.id) {
                  <tr>
                    <td>{{ shortDate(row.created_at) }}</td>
                    <td>{{ row.name }}</td>
                    <td>{{ row.service || ', ' }}</td>
                    <td><span class="status-pill">{{ row.status }}</span></td>
                  </tr>
                } @empty {
                  <tr><td class="empty-row" colspan="4">No enquiries yet, they will appear here from the Contact page form.</td></tr>
                }
              </tbody>
            </table>
          </div>
          <p style="margin-top: 16px">
            <a class="link-sweep" routerLink="/admin/enquiries">Manage all enquiries →</a>
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .today-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .today-list li a {
      font-weight: 600;
    }
  `],
})
export class Dashboard implements OnInit {
  private readonly admin = inject(AdminService);
  readonly inr = inr;
  readonly shortDate = shortDate;

  readonly totalEnquiries = signal(0);
  readonly activeProjects = signal(0);
  readonly monthEarnings = signal(0);
  readonly pendingBalance = signal(0);
  readonly latest = signal<EnquiryRow[]>([]);
  readonly actions = signal<TodayAction[]>([]);

  async ngOnInit(): Promise<void> {
    const [enquiries, projects, payments, pendingReviews] = await Promise.all([
      this.admin.listEnquiries(),
      this.admin.listProjects(),
      this.admin.listPayments(),
      this.admin.countPendingReviews(),
    ]);

    this.totalEnquiries.set(enquiries.length);
    this.latest.set(enquiries.slice(0, 5));
    this.activeProjects.set(projects.filter((p) => p.status !== 'Delivered').length);
    const balance = projects.reduce((sum, p) => sum + Math.max(0, p.total_amount - p.advance_paid), 0);
    this.pendingBalance.set(balance);

    const now = new Date();
    this.monthEarnings.set(
      payments
        .filter((pay) => {
          const d = new Date(pay.paid_at);
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        })
        .reduce((sum, pay) => sum + pay.amount, 0),
    );

    // "Aaj kya karna hai": only things that actually need attention.
    const acts: TodayAction[] = [];
    const newCount = enquiries.filter((e) => e.status === 'New').length;
    if (newCount > 0) {
      acts.push({
        text: `Reply to ${newCount} new ${newCount === 1 ? 'enquiry' : 'enquiries'}`,
        link: '/admin/enquiries',
      });
    }
    if (pendingReviews > 0) {
      acts.push({
        text: `Approve ${pendingReviews} pending ${pendingReviews === 1 ? 'review' : 'reviews'}`,
        link: '/admin/reviews',
      });
    }
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const dueSoon = projects.filter(
      (p) => p.status !== 'Delivered' && p.deadline && new Date(p.deadline) <= weekFromNow,
    );
    if (dueSoon.length > 0) {
      acts.push({
        text: `${dueSoon.length} ${dueSoon.length === 1 ? 'project' : 'projects'} due within 7 days (${dueSoon.map((p) => p.client_name).join(', ')})`,
        link: '/admin/projects',
      });
    }
    if (balance > 0) {
      acts.push({
        text: `Collect ${inr(balance)} pending balance`,
        link: '/admin/payments',
      });
    }
    if (acts.length === 0) {
      acts.push({ text: 'All clear! Nothing needs your attention today.' });
    }
    this.actions.set(acts);
  }
}
