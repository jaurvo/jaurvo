import { Directive, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

/**
 * Click-spark bursts in the reactbits spirit: a tiny golden sparkle burst on
 * every click/tap. Canvas 2D, ~10 particles per burst, gravity + fade, capped
 * totals, DPR capped, pauses when idle, off for reduced-motion.
 */
@Directive({
  selector: 'canvas[appClickSpark]',
  standalone: true,
})
export class ClickSparkDirective implements OnDestroy {
  private readonly canvas = inject(ElementRef<HTMLCanvasElement>).nativeElement;
  private readonly ngZone = inject(NgZone);
  private ctx: CanvasRenderingContext2D | null = null;
  private raf = 0;
  private running = false;
  private sparks: Spark[] = [];
  private w = 0;
  private h = 0;

  private static readonly COLORS = [
    '242, 214, 138', // light gold
    '200, 161, 90', // gold
    '168, 98, 47', // copper
    '70, 160, 138', // emerald
  ];
  private static readonly MAX_SPARKS = 160;

  private readonly onResize = (): void => this.size();
  private readonly onDown = (e: PointerEvent): void => this.burst(e.clientX, e.clientY);

  constructor() {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Touch devices: no tap bursts. Keeps mobile fast; desktop clicks keep it.
    if (window.matchMedia('(pointer: coarse)').matches) return;
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;
    this.size();
    // Canvas-only effect: outside the zone so every click skips change
    // detection (this was the click lag).
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('resize', this.onResize, { passive: true });
      window.addEventListener('pointerdown', this.onDown, { passive: true });
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

  private burst(x: number, y: number): void {
    const count = 10;
    for (let i = 0; i < count; i++) {
      if (this.sparks.length >= ClickSparkDirective.MAX_SPARKS) this.sparks.shift();
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 2 + Math.random() * 3.2;
      this.sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        life: 0,
        maxLife: 34 + Math.random() * 22,
        size: 1.4 + Math.random() * 2.2,
        color:
          ClickSparkDirective.COLORS[
            Math.floor(Math.random() * ClickSparkDirective.COLORS.length)
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
    this.sparks = this.sparks.filter((s) => s.life < s.maxLife);
    if (!this.sparks.length) {
      this.stop();
      return;
    }
    for (const s of this.sparks) {
      s.life++;
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.09;
      s.vx *= 0.985;
      const t = 1 - s.life / s.maxLife;
      ctx.fillStyle = `rgba(${s.color}, ${(t * 0.9).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, Math.max(0.1, s.size * t), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ngOnDestroy(): void {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointerdown', this.onDown);
  }
}
