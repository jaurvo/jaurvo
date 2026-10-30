import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<'light' | 'dark'>('dark');

  constructor() {
    let initial: 'light' | 'dark' = 'dark';
    try {
      const saved = typeof localStorage === 'undefined' ? null : localStorage.getItem('jaur-theme');
      if (saved === 'dark' || saved === 'light') initial = saved;
    } catch {
      // storage unavailable, stay on dark
    }
    this.theme.set(initial);
    this.apply(initial);
  }

  toggle(): void {
    const next = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(next);
    this.apply(next);
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem('jaur-theme', next);
    } catch {
      // ignore
    }
  }

  private apply(theme: 'light' | 'dark'): void {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset['theme'] = theme;
  }
}
