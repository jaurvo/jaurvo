import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService, EnquiryRow, inr, shortDate } from './admin.service';

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

  async ngOnInit(): Promise<void> {
    const [enquiries, projects, payments] = await Promise.all([
      this.admin.listEnquiries(),
      this.admin.listProjects(),
      this.admin.listPayments(),
    ]);

    this.totalEnquiries.set(enquiries.length);
    this.latest.set(enquiries.slice(0, 5));
    this.activeProjects.set(projects.filter((p) => p.status !== 'Delivered').length);
    this.pendingBalance.set(
      projects.reduce((sum, p) => sum + Math.max(0, p.total_amount - p.advance_paid), 0),
    );

    const now = new Date();
    this.monthEarnings.set(
      payments
        .filter((pay) => {
          const d = new Date(pay.paid_at);
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        })
        .reduce((sum, pay) => sum + pay.amount, 0),
    );
  }
}
