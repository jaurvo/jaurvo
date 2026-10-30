import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PROJECT_STATUSES, SERVICES } from '../core/data';
import { AdminService, ProjectRow, inr, shortDate } from './admin.service';

interface ProjectForm {
  id: string | null;
  client_name: string;
  service: string;
  deadline: string;
  total_amount: number;
  advance_paid: number;
  status: string;
}

const emptyForm = (): ProjectForm => ({
  id: null,
  client_name: '',
  service: 'Websites',
  deadline: '',
  total_amount: 0,
  advance_paid: 0,
  status: 'New',
});

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './admin.scss',
  template: `
    <section class="admin-page">
      <div class="container">
        <div class="admin-head">
          <h1>Projects</h1>
          <p>Client work, totals and advances. Balance is worked out automatically.</p>
        </div>

        <div class="admin-card">
          <h2>{{ form().id ? 'Edit project' : 'Add a project' }}</h2>
          <form (ngSubmit)="save()">
            <div class="form-grid">
              <div class="field">
                <label for="p-client">Client name</label>
                <input id="p-client" type="text" required
                  [ngModel]="form().client_name"
                  (ngModelChange)="patch('client_name', $event)" name="client_name">
              </div>
              <div class="field">
                <label for="p-service">Service</label>
                <select id="p-service"
                  [ngModel]="form().service"
                  (ngModelChange)="patch('service', $event)" name="service">
                  @for (name of serviceNames; track name) {
                    <option [value]="name">{{ name }}</option>
                  }
                </select>
              </div>
              <div class="field">
                <label for="p-deadline">Deadline</label>
                <input id="p-deadline" type="date"
                  [ngModel]="form().deadline"
                  (ngModelChange)="patch('deadline', $event)" name="deadline">
              </div>
              <div class="field">
                <label for="p-total">Total amount (₹)</label>
                <input id="p-total" type="number" min="0"
                  [ngModel]="form().total_amount"
                  (ngModelChange)="patch('total_amount', +$event)" name="total_amount">
              </div>
              <div class="field">
                <label for="p-advance">Advance paid (₹)</label>
                <input id="p-advance" type="number" min="0"
                  [ngModel]="form().advance_paid"
                  (ngModelChange)="patch('advance_paid', +$event)" name="advance_paid">
              </div>
              <div class="field">
                <label for="p-status">Status</label>
                <select id="p-status"
                  [ngModel]="form().status"
                  (ngModelChange)="patch('status', $event)" name="status">
                  @for (status of statuses; track status) {
                    <option [value]="status">{{ status }}</option>
                  }
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn--accent" [disabled]="!form().client_name.trim()">
                {{ form().id ? 'Save changes' : 'Add project' }}
              </button>
              @if (form().id) {
                <button type="button" class="btn btn--ghost" (click)="reset()">Cancel edit</button>
              }
            </div>
          </form>
        </div>

        <div class="admin-card">
          <h2>All projects</h2>
          <div class="table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Client</th><th>Service</th><th>Deadline</th><th>Total</th>
                  <th>Advance</th><th>Balance</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (row of rows(); track row.id) {
                  <tr>
                    <td>{{ row.client_name }}</td>
                    <td>{{ row.service || ', ' }}</td>
                    <td>{{ shortDate(row.deadline) }}</td>
                    <td>{{ inr(row.total_amount) }}</td>
                    <td>{{ inr(row.advance_paid) }}</td>
                    <td><strong>{{ inr(row.total_amount - row.advance_paid) }}</strong></td>
                    <td><span class="status-pill">{{ row.status }}</span></td>
                    <td>
                      <div class="row-actions">
                        <button type="button" class="btn btn--ghost btn--small" (click)="edit(row)">Edit</button>
                        <button type="button" class="btn btn--danger btn--small" (click)="remove(row)">Delete</button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr><td class="empty-row" colspan="8">No projects yet, add your first one above.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ProjectsAdmin implements OnInit {
  private readonly admin = inject(AdminService);
  readonly inr = inr;
  readonly shortDate = shortDate;
  readonly statuses = PROJECT_STATUSES;
  readonly serviceNames = SERVICES.map((s) => s.name);
  readonly rows = signal<ProjectRow[]>([]);
  readonly form = signal<ProjectForm>(emptyForm());

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  private async reload(): Promise<void> {
    this.rows.set(await this.admin.listProjects());
  }

  patch<K extends keyof ProjectForm>(key: K, value: ProjectForm[K]): void {
    this.form.update((f) => ({ ...f, [key]: value }));
  }

  edit(row: ProjectRow): void {
    this.form.set({
      id: row.id,
      client_name: row.client_name,
      service: row.service ?? 'Websites',
      deadline: row.deadline ?? '',
      total_amount: row.total_amount,
      advance_paid: row.advance_paid,
      status: row.status,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  reset(): void {
    this.form.set(emptyForm());
  }

  async save(): Promise<void> {
    const f = this.form();
    await this.admin.saveProject({
      ...(f.id ? { id: f.id } : {}),
      client_name: f.client_name.trim(),
      service: f.service,
      deadline: f.deadline || null,
      total_amount: f.total_amount || 0,
      advance_paid: f.advance_paid || 0,
      status: f.status,
    });
    this.reset();
    await this.reload();
  }

  async remove(row: ProjectRow): Promise<void> {
    if (!confirm(`Delete the project for ${row.client_name}? Payments linked to it stay in the payments list.`)) return;
    await this.admin.deleteProject(row.id);
    await this.reload();
  }
}
