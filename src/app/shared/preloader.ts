import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { WebThreadsDirective } from './web-threads.directive';

/**
 * Full-screen brand splash shown once per app load, before the site
 * appears. JAURVO in the brand font with a staggered letter rise,
 * a growing slate rule and the tagline, then a soft fade out.
 * Web-Threads glow waves drift behind the wordmark.
 * Minimum on-screen time is 2.2s; skipped fast on /admin and reduced motion.
 */
@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [WebThreadsDirective],
  template: `
    <div class="preloader" [class.done]="done()" aria-hidden="true">
      @if (showThreads()) {
        <canvas class="pre-threads" appWebThreads aria-hidden="true"></canvas>
      }
      <div class="pre-inner">
        <p class="pre-word">
          @for (ch of letters; track $index) {
            <span class="pre-letter" [style.animation-delay]="$index * 70 + 'ms'">{{
              ch
            }}</span>
          }
        </p>
        <span class="pre-rule"></span>
        <p class="pre-tag">building digital solutions that matters</p>
      </div>
    </div>
  `,
  styles: [
    `
      .preloader {
        position: fixed;
        inset: 0;
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg);
        transition:
          opacity 0.6s var(--ease),
          visibility 0.6s;
      }

      .preloader.done {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }

      .pre-inner {
        position: relative;
        z-index: 1;
        text-align: center;
        padding: 24px;
      }

      .pre-threads {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        opacity: 0.85;
      }

      .pre-word {
        margin: 0;
        display: flex;
        justify-content: center;
        overflow: hidden;
        font-family: var(--font-brand);
        font-size: clamp(52px, 13vw, 132px);
        letter-spacing: 0.1em;
        line-height: 1.1;
        color: var(--text);
      }

      .pre-letter {
        display: inline-block;
        opacity: 0;
        transform: translateY(110%);
        animation: pre-letter-in 0.7s var(--ease) forwards;
      }

      @keyframes pre-letter-in {
        to {
          opacity: 1;
          transform: none;
        }
      }

      .pre-rule {
        display: block;
        width: 0;
        height: 2px;
        margin: 24px auto 20px;
        background: var(--accent);
        animation: pre-rule-in 1.4s var(--ease) 0.5s forwards;
      }

      @keyframes pre-rule-in {
        to {
          width: min(320px, 60vw);
        }
      }

      .pre-tag {
        margin: 0;
        color: var(--muted);
        font-size: clamp(14px, 2.6vw, 19px);
        letter-spacing: 0.05em;
        opacity: 0;
        transform: translateY(12px);
        animation: pre-tag-in 0.8s var(--ease) 1s forwards;
      }

      @keyframes pre-tag-in {
        to {
          opacity: 1;
          transform: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .pre-letter,
        .pre-rule,
        .pre-tag {
          animation-duration: 0.01ms;
          animation-delay: 0ms;
        }
      }
    `,
  ],
})
export class Preloader implements OnInit, OnDestroy {
  readonly letters = ['J', 'A', 'U', 'R', 'V', 'O'];
  readonly done = signal(false);
  readonly showThreads = signal(true);
  private timers: number[] = [];
  private removeLoadListener: (() => void) | null = null;
  private finished = false;
  // Prerender/SSR has no window: skip the splash and render content directly.
  private readonly isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

  ngOnInit(): void {
    if (!this.isBrowser) {
      this.finish();
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.timers.push(window.setTimeout(() => this.finish(), 400));
      return;
    }
    document.body.style.overflow = 'hidden';
    const start = Date.now();
    const minTime = 2200;
    let loaded = document.readyState === 'complete';
    const maybeDone = (): void => {
      if (loaded && Date.now() - start >= minTime) this.finish();
    };
    const onLoad = (): void => {
      loaded = true;
      maybeDone();
    };
    window.addEventListener('load', onLoad);
    this.removeLoadListener = () => window.removeEventListener('load', onLoad);
    // Minimum 2.2s even if load already fired; 5s absolute safety cap.
    this.timers.push(window.setTimeout(maybeDone, minTime));
    this.timers.push(window.setTimeout(() => this.finish(), 5000));
  }

  private finish(): void {
    if (this.finished) return;
    this.finished = true;
    this.done.set(true);
    document.body.style.overflow = '';
    // Let the fade finish, then destroy the WebGL canvas to free the context.
    if (this.isBrowser) {
      this.timers.push(window.setTimeout(() => this.showThreads.set(false), 700));
    }
  }

  ngOnDestroy(): void {
    this.timers.forEach((t) => clearTimeout(t));
    this.removeLoadListener?.();
    document.body.style.overflow = '';
  }
}
