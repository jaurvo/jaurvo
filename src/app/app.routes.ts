import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Work } from './pages/work/work';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Privacy } from './pages/privacy/privacy';
import { Terms } from './pages/terms/terms';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'services', component: Services },
  {
    path: 'services/:slug',
    loadComponent: () =>
      import('./pages/service-detail/service-detail').then((m) => m.ServiceDetail),
  },
  { path: 'work', component: Work },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'privacy', component: Privacy },
  { path: 'terms', component: Terms },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
