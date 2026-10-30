import { RenderMode, ServerRoute } from '@angular/ssr';
import { SERVICE_PAGES } from './core/service-pages.data';

/** Server routes: every service page is prerendered to static HTML. */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'services/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SERVICE_PAGES.map((p) => ({ slug: p.slug }));
    },
  },
];
