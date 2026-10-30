import { Directive, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';

interface Blob {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
  decay: number;
  vx: number;
  vy: number;
  color: string;
}

/**
 * Lightweight splash-cursor in the spirit of reactbits' Splash Cursor, rebuilt
 * dependency-free on canvas 2D. Soft matte ink blobs bloom where the pointer
 * moves (mouse) or touches (touch), in the studio palette: gold, copper and
 * emerald at low alpha. Capped particle count, DPR capped, pauses when the tab
 * is hidden, and stays off entirely for reduced-motion users.
 */
@Directive({
  selector: 'canvas[appSplashCursor]',
  standalone: true,
})
export class SplashCursorDirective implements OnDestroy {
  private readonly canvas = inject(ElementRef<HTMLCanvasElement>).nativeElement;
  private readonly ngZone = inject(NgZone);
  private ctx: CanvasRenderingContext2D | null = null;
  private raf = 0;
  private running = false;
  private blobs: Blob[] = [];
  private w = 0;
  private h = 0;
  private lastX = -1;
  private lastY = -1;

  private static readonly COLORS = [
    '200, 161, 90', // gold
    '168, 98, 47', // copper
    '70, 160, 138', // emerald
  ];
  private static readonly MAX_BLOBS = 130;

  private readonly onResize = (): void => this.size();
  private readonly onVisibility = (): void => {
    if (document.hidden) this.stop();
    else if (this.blobs.length) this.start();
  };

  private readonly onMove = (e: MouseEvent): void => {
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    if (this.lastX >= 0 && dx * dx + dy * dy < 36) return;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.spawn(e.clientX, e.clientY, 2);
  };

  private readonly onTouch = (e: TouchEvent): void => {
    for (let i = 0; i < e.touches.length; i++) {
      const t = e.touches[i];
      this.spawn(t.clientX, t.clientY, 4);
    }
  };

  constructor() {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Touch devices: no cursor trail. Keeps mobile fast and avoids stray
    // blobs while scrolling; desktop mouse keeps the full effect.
    if (window.matchMedia('(pointer: coarse)').matches) return;
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;
    this.size();
    // Canvas-only effect: keep every listener outside Angular's zone so mouse
    // movement never triggers change detection (click/scroll lag).
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('resize', this.onResize, { passive: true });
      window.addEventListener('mousemove', this.onMove, { passive: true });
      document.addEventListener('visibilitychange', this.onVisibility);
    });
  }

  private size(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.floor(this.w * dpr);
    this.canvas.height = Math.floor(this.h * dpr);
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private spawn(x: number, y: number, n: number): void {
    for (let i = 0; i < n; i++) {
      if (this.blobs.length >= SplashCursorDirective.MAX_BLOBS) this.blobs.shift();
      const maxR = 14 + Math.random() * 34;
      this.blobs.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        r: 2 + Math.random() * 4,
        maxR,
        alpha: 0.32 + Math.random() * 0.18,
        decay: 0.012 + Math.random() * 0.014,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7 - 0.25,
        color:
          SplashCursorDirective.COLORS[
            Math.floor(Math.random() * SplashCursorDirective.COLORS.length)
          ],
      });
    }
    this.start();
  }

  private start(): void {
    if (this.running) return;
    this.running = true;
    const tick = (): void => {
      if (!this.running) return;
      this.draw();
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  private stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private draw(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, this.w, this.h);
    this.blobs = this.blobs.filter((b) => b.alpha > 0.012);
    if (!this.blobs.length) {
      this.stop();
      return;
    }
    for (const b of this.blobs) {
      b.r += (b.maxR - b.r) * 0.1;
      b.x += b.vx;
      b.y += b.vy;
      b.vx *= 0.985;
      b.vy *= 0.985;
      b.alpha -= b.decay;
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      g.addColorStop(0, `rgba(${b.color}, ${Math.max(0, b.alpha).toFixed(3)})`);
      g.addColorStop(1, `rgba(${b.color}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ngOnDestroy(): void {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMove);
    window.removeEventListener('touchstart', this.onTouch);
    window.removeEventListener('touchmove', this.onTouch);
    document.removeEventListener('visibilitychange', this.onVisibility);
  }
}
