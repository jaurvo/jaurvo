import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../core/supabase.service';
import { AdminService } from './admin.service';
import { NotConnected } from './not-connected';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, NotConnected, Icon],
  template: `
    <section class="section login-wrap">
      <div class="container">
        @if (!supabase.isConfigured) {
          <app-not-connected />
        } @else {
          <form class="login-card" (ngSubmit)="login()">
            <span class="brand-mark">JV</span>
            <h1>Admin sign in</h1>
            <p class="login-sub">Jaurvo owner panel, enquiries, projects, payments and content.</p>

            @if (error()) {
              <div class="notice notice--accent login-error">{{ error() }}</div>
            }

            <div class="field">
              <label for="a-email">Email</label>
              <input
                id="a-email"
                type="email"
                required
                autocomplete="username"
                [ngModel]="email()"
                (ngModelChange)="email.set($event)"
                name="email"
              >
            </div>
            <div class="field">
              <label for="a-password">Password</label>
              <input
                id="a-password"
                type="password"
                required
                autocomplete="current-password"
                [ngModel]="password()"
                (ngModelChange)="password.set($event)"
                name="password"
              >
            </div>

            <button type="submit" class="btn btn--accent login-btn" [disabled]="busy()">
              <app-icon name="lock" [size]="16" />
              {{ busy() ? 'Signing in…' : 'Sign in' }}
            </button>
          </form>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .login-wrap { padding-top: 72px; }
      .login-card {
        max-width: 420px;
        margin: 0 auto;
        background: var(--panel);
        border: 1px solid var(--line-strong);
        border-radius: var(--radius);
        padding: 36px;
      }
      .login-card h1 { font-size: 26px; margin-top: 18px; }
      .login-sub { color: var(--muted); font-size: 14.5px; margin: 6px 0 22px; }
      .login-error { margin-bottom: 18px; font-size: 14px; }
      .login-btn { width: 100%; margin-top: 6px; }
    `,
  ],
})
export class Login {
  readonly supabase = inject(SupabaseService);
  private readonly admin = inject(AdminService);
  private readonly router = inject(Router);

  readonly email = signal('');
  readonly password = signal('');
  readonly busy = signal(false);
  readonly error = signal<string | null>(null);

  async login(): Promise<void> {
    if (this.busy()) return;
    this.busy.set(true);
    this.error.set(null);
    const message = await this.admin.signIn(this.email().trim(), this.password());
    this.busy.set(false);
    if (message) {
      this.error.set('Sign-in failed: ' + message);
      return;
    }
    await this.router.navigate(['/admin']);
  }
}
