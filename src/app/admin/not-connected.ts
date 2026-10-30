import { Component } from '@angular/core';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-not-connected',
  standalone: true,
  imports: [Icon],
  template: `
    <div class="notice notice--accent not-connected">
      <app-icon name="plug-zap" [size]="24" />
      <h2>Backend not connected yet</h2>
      <p>
        This project still has placeholder Supabase keys, so the admin panel and the enquiry
        database are switched off, the public website keeps working with its built-in content.
      </p>
      <ol>
        <li>Create a free project at supabase.com</li>
        <li>Run <code>supabase/schema.sql</code> in the project's SQL editor</li>
        <li>Create your admin user under Authentication → Users</li>
        <li>
          Paste the project URL and anon key into
          <code>src/environments/environment.ts</code> (and <code>environment.prod.ts</code>)
        </li>
      </ol>
    </div>
  `,
  styles: [
    `
      .not-connected { max-width: 640px; margin: 48px auto; text-align: left; }
      .not-connected h2 { font-size: 22px; margin: 12px 0 8px; }
      .not-connected p { color: var(--muted); font-size: 15px; }
      .not-connected ol { margin: 16px 0 0; padding-left: 20px; color: var(--muted); font-size: 15px; }
      .not-connected li { margin-top: 6px; }
      .not-connected code {
        background: var(--sand);
        padding: 1px 6px;
        border-radius: 6px;
        font-size: 13px;
        color: var(--text);
      }
    `,
  ],
})
export class NotConnected {}
