import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService, PaymentRow, ProjectRow, inr, shortDate } from './admin.service';

@Component({
  selector: 'app-admin-payments',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './admin.scss',
  template: `
    <section class="admin-page">
      <div class="container">
        <div class="admin-head">
          <h1>Payments</h1>
          <p>Money received, linked to its project. This month's total:
            <strong>{{ inr(monthTotal()) }}</strong></p>
        </div>

        <div class="admin-card">
          <h2>Record a payment</h2>
          <form (ngSubmit)="add()">
            <div class="form-grid">
              <div class="field">
                <label for="pay-project">Project</label>
                <select id="pay-project" required
                  [ngModel]="projectId()"
                  (ngModelChange)="projectId.set($event)" name="project_id">
                  <option value="" disabled>Choose a project…</option>
                  @for (project of projects(); track project.id) {
                    <option [value]="project.id">{{ project.client_name }}, {{ project.service || 'Project' }}</option>
                  }
                </select>
              </div>
              <div class="field">
                <label for="pay-amount">Amount (₹)</label>
                <input id="pay-amount" type="number" min="1" required
                  [ngModel]="amount()"
                  (ngModelChange)="amount.set(+$event)" name="amount">
              </div>
              <div class="field">
                <label for="pay-date">Date</label>
                <input id="pay-date" type="date" required
                  [ngModel]="paidAt()"
                  (ngModelChange)="paidAt.set($event)" name="paid_at">
              </div>
              <div class="field span-3">
                <label for="pay-note">Note (optional)</label>
                <input id="pay-note" type="text" placeholder="e.g. Advance via UPI"
                  [ngModel]="note()"
                  (ngModelChange)="note.set($event)" name="note">
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn--accent" [disabled]="!projectId() || amount() <= 0">
                Add payment
              </button>
            </div>
          </form>
        </div>

        <div class="admin-card">
          <h2>Payment history</h2>
          <div class="table-wrap">
            <table class="admin-table">
              <thead>
                <tr><th>Date</th><th>Project</th><th>Amount</th><th>Note</th><th>Actions</th></tr>
              </thead>
              <tbody>
                @for (row of rows(); track row.id) {
                  <tr>
                    <td>{{ shortDate(row.paid_at) }}</td>
                    <td>{{ projectName(row.project_id) }}</td>
                    <td><strong>{{ inr(row.amount) }}</strong></td>
                    <td>{{ row.note || ', ' }}</td>
                    <td>
                      <button type="button" class="btn btn--danger btn--small" (click)="remove(row)">Delete</button>
                    </td>
                  </tr>
                } @empty {
                  <tr><td class="empty-row" colspan="5">No payments recorded yet.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Payments implements OnInit {
  private readonly admin = inject(AdminService);
  readonly inr = inr;
  readonly shortDate = shortDate;

  readonly rows = signal<PaymentRow[]>([]);
  readonly projects = signal<ProjectRow[]>([]);
  readonly projectId = signal('');
  readonly amount = signal(0);
  readonly note = signal('');
  readonly paidAt = signal(new Date().toISOString().slice(0, 10));

  async ngOnInit(): Promise<void> {
    const [payments, projects] = await Promise.all([
      this.admin.listPayments(),
      this.admin.listProjects(),
    ]);
    this.rows.set(payments);
    this.projects.set(projects);
  }

  monthTotal(): number {
    const now = new Date();
    return this.rows()
      .filter((p) => {
        const d = new Date(p.paid_at);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, p) => sum + p.amount, 0);
  }

  projectName(id: string | null): string {
    return this.projects().find((p) => p.id === id)?.client_name ?? ', ';
  }

  async add(): Promise<void> {
    await this.admin.addPayment({
      project_id: this.projectId() || null,
      amount: this.amount(),
      note: this.note().trim() || null,
      paid_at: this.paidAt(),
    });
    this.amount.set(0);
    this.note.set('');
    this.rows.set(await this.admin.listPayments());
  }

  async remove(row: PaymentRow): Promise<void> {
    if (!confirm('Delete this payment record?')) return;
    await this.admin.deletePayment(row.id);
    this.rows.set(await this.admin.listPayments());
  }
}
