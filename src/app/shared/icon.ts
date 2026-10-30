import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  FolderKanban,
  Globe,
  Heart,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  LayoutGrid,
  Lock,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Moon,
  Palette,
  PenLine,
  Phone,
  PlugZap,
  Search,
  Send,
  Share2,
  Star,
  Sun,
  Type,
  UtensilsCrossed,
  Wallet,
  X,
} from 'lucide';

type IconNode = [string, Record<string, string>][];

// Lucide 1.61 removed the brand icons, so Instagram / Youtube are provided
// locally in the same stroke format (classic feather-style paths).
const Instagram: IconNode = [
  ['rect', { x: '2', y: '2', width: '20', height: '20', rx: '5', ry: '5' }],
  ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' }],
  ['line', { x1: '17.5', y1: '6.5', x2: '17.51', y2: '6.5' }],
];

const Youtube: IconNode = [
  [
    'path',
    {
      d: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z',
    },
  ],
  ['polygon', { points: '9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02' }],
];

/** Only the icons the site actually uses, imported by name so the bundle stays small. */
const REGISTRY: Record<string, IconNode> = {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  FolderKanban,
  Globe,
  Heart,
  Image: ImageIcon,
  Inbox,
  Instagram,
  LayoutDashboard,
  LayoutGrid,
  Lock,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Moon,
  Palette,
  PenLine,
  Phone,
  PlugZap,
  Search,
  Send,
  Share2,
  Star,
  Sun,
  Type,
  UtensilsCrossed,
  Wallet,
  X,
  Youtube,
} as Record<string, IconNode>;

/** Renders a Lucide icon by kebab-case name, e.g. <app-icon name="arrow-right" />. */
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<span class="icon" [innerHTML]="svg()"></span>`,
  styles: [
    `
      :host {
        display: inline-flex;
        line-height: 0;
      }
      .icon {
        display: inline-flex;
      }
      .icon ::ng-deep svg {
        display: block;
        flex-shrink: 0;
      }
    `,
  ],
})
export class Icon {
  private readonly sanitizer = inject(DomSanitizer);

  readonly name = input.required<string>();
  readonly size = input(20);

  readonly svg = computed<SafeHtml>(() => {
    const pascal = this.name()
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    const node = REGISTRY[pascal];
    if (!node) return '';
    // Snap to the site's icon grid (16 / 20 / 24 px) so no icon ever
    // renders at a fractional or off-grid size.
    const requested = this.size();
    const size = requested <= 16 ? 16 : requested <= 20 ? 20 : 24;
    const children = node
      .map(([tag, attrs]) => {
        const attrText = Object.entries(attrs)
          .map(([k, v]) => `${k}="${v}"`)
          .join(' ');
        return `<${tag} ${attrText}/>`;
      })
      .join('');
    const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${children}</svg>`;
    return this.sanitizer.bypassSecurityTrustHtml(markup);
  });
}
