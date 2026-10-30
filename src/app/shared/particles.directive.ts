import { Directive, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';

/**
 * Lightweight canvas particle field for the hero. Slow-drifting gold dots
 * with a gentle twinkle. Transform/opacity only, pauses off-screen, and
 * stays off entirely for reduced-motion or touch-only devices.
 */
@Directive({
  selector: 'canvas[appParticles]',
  standalone: true,
})
export class ParticlesDirective implements OnDestroy {
  private readonly canvas = inject(ElementRef<HTMLCanvasElement>).nativeElement;
  private readonly ngZone = inject(NgZone);
  private ctx: CanvasRenderingContext2D | null = null;
  private raf = 0;
  private running = false;
  private observer: IntersectionObserver | null = null;
  private particles: { x: number; y: number; r: number; vx: number; vy: number; phase: number; speed: number }[] = [];
  private w = 0;
  private h = 0;

  private readonly onResize = (): void => this.size();

  constructor() {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;
    this.size();
    this.seed();
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('resize', this.onResize, { passive: true });
    });
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible) this.start();
        else this.stop();
      },
      { threshold: 0 }
    );
    this.observer.observe(this.canvas);
  }

  private size(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    this.w = Math.max(1, Math.floor(rect.width));
    this.h = Math.max(1, Math.floor(rect.height));
    this.canvas.width = this.w * dpr;
    this.canvas.height = this.h * dpr;
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private seed(): void {
    const count = Math.min(90, Math.floor((this.w * this.h) / 16000));
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      r: 0.8 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.8,
    }));
  }

  private start(): void {
    if (this.running) return;
    this.running = true;
    const tick = (): void => {
      if (!this.running) return;
      this.draw();
      this.raf = requestAnimationFrame(tick);
    };
    tick();
  }

  private stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private draw(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const dark = document.documentElement.dataset['theme'] !== 'light';
    const baseAlpha = dark ? 0.55 : 0.28;
    ctx.clearRect(0, 0, this.w, this.h);
    const t = performance.now() / 1000;
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -4) p.x = this.w + 4;
      if (p.x > this.w + 4) p.x = -4;
      if (p.y < -4) p.y = this.h + 4;
      if (p.y > this.h + 4) p.y = -4;
      const tw = 0.55 + 0.45 * Math.sin(t * p.speed + p.phase);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 161, 90, ${(baseAlpha * tw).toFixed(3)})`;
      ctx.fill();
    }
  }

  ngOnDestroy(): void {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    this.observer?.disconnect();
  }
}
