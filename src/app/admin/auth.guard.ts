import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../core/supabase.service';

/** Admin pages need a configured backend and a signed-in admin. */
export const authGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const db = await supabase.dbAsync();
  if (!supabase.isConfigured || !db) {
    return router.createUrlTree(['/admin/login']);
  }
  const { data } = await db.auth.getSession();
  return data.session ? true : router.createUrlTree(['/admin/login']);
};
