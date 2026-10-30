import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminService } from './admin.service';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon],
  template: `
    <div class="admin-layout">
      <aside class="admin-side">
        <a class="admin-brand" routerLink="/admin">
          <span class="brand-mark">JV</span>
          <span>
            <strong>Jaurvo</strong>
            <small>Admin panel</small>
          </span>
        </a>

        <nav class="admin-nav">
          <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
            <app-icon name="layout-dashboard" [size]="20" /> Dashboard
          </a>
          <a routerLink="/admin/enquiries" routerLinkActive="active">
            <app-icon name="inbox" [size]="20" /> Enquiries
          </a>
          <a routerLink="/admin/projects" routerLinkActive="active">
            <app-icon name="folder-kanban" [size]="20" /> Projects
          </a>
          <a routerLink="/admin/payments" routerLinkActive="active">
            <app-icon name="wallet" [size]="20" /> Payments
          </a>
          <a routerLink="/admin/content" routerLinkActive="active">
            <app-icon name="layout-grid" [size]="20" /> Content
          </a>
          <a routerLink="/admin/reviews" routerLinkActive="active">
            <app-icon name="star" [size]="20" /> Reviews
          </a>
        </nav>

        <div class="admin-side-foot">
          <a class="side-link" routerLink="/">
            <app-icon name="globe" [size]="16" /> View website
          </a>
          <button type="button" class="side-link signout" (click)="signOut()">
            <app-icon name="log-out" [size]="16" /> Sign out
          </button>
        </div>
      </aside>

      <div class="admin-main">
        <router-outlet />
      </div>
    </div>
  `,
  styles: [
    `
      .admin-layout {
        display: grid;
        grid-template-columns: 1fr;
        min-height: 100vh;
      }
      @media (min-width: 1024px) {
        .admin-layout { grid-template-columns: 250px 1fr; }
      }
      .admin-side {
        background: var(--panel);
        border-bottom: 1px solid var(--line);
        padding: 18px 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      @media (min-width: 1024px) {
        .admin-side {
          border-bottom: none;
          border-right: 1px solid var(--line);
          position: sticky;
          top: 0;
          height: 100vh;
        }
      }
      .admin-brand {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
      }
      .admin-brand strong { display: block; font-family: var(--font-display); font-size: 17px; }
      .admin-brand small { color: var(--muted); font-size: 12px; }
      .admin-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      @media (min-width: 1024px) {
        .admin-nav { flex-direction: column; flex: 1; }
      }
      .admin-nav a {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        min-height: 44px;
        padding: 8px 14px;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 500;
        font-size: 14.5px;
        color: var(--muted);
      }
      .admin-nav a:hover { color: var(--text); background: var(--sand); }
      .admin-nav a.active { color: var(--accent); background: var(--sand); }
      .admin-side-foot { display: flex; flex-wrap: wrap; gap: 8px; }
      @media (min-width: 1024px) {
        .admin-side-foot { flex-direction: column; }
      }
      .side-link {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        min-height: 44px;
        padding: 8px 14px;
        border: none;
        background: none;
        border-radius: 10px;
        font: inherit;
        font-size: 14.5px;
        font-weight: 500;
        color: var(--muted);
        text-decoration: none;
        cursor: pointer;
        text-align: left;
      }
      .side-link:hover { color: var(--text); background: var(--sand); }
      .admin-main { min-width: 0; }
    `,
  ],
})
export class Shell {
  private readonly admin = inject(AdminService);
  private readonly router = inject(Router);

  async signOut(): Promise<void> {
    await this.admin.signOut();
    await this.router.navigate(['/admin/login']);
  }
}
