import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { Login } from './login';
import { Shell } from './shell';
import { Dashboard } from './dashboard';
import { Enquiries } from './enquiries';
import { CallRequests } from './call-requests';
import { ProjectsAdmin } from './projects-admin';
import { Payments } from './payments';
import { ContentAdmin } from './content-admin';
import { ReviewsAdmin } from './reviews-admin';
import { TeamAdmin } from './team-admin';
import { PricingAdmin } from './pricing-admin';
import { SettingsAdmin } from './settings-admin';
import { OffersAdmin } from './offers-admin';

export const ADMIN_ROUTES: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: Shell,
    canActivate: [authGuard],
    children: [
      { path: '', component: Dashboard },
      { path: 'enquiries', component: Enquiries },
      { path: 'call-requests', component: CallRequests },
      { path: 'projects', component: ProjectsAdmin },
      { path: 'payments', component: Payments },
      { path: 'content', component: ContentAdmin },
      { path: 'reviews', component: ReviewsAdmin },
      { path: 'team', component: TeamAdmin },
      { path: 'pricing', component: PricingAdmin },
      { path: 'settings', component: SettingsAdmin },
      { path: 'offers', component: OffersAdmin },
    ],
  },
];
