import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { map } from 'rxjs';

export const alreadyLoggedInGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.getAuthState().pipe(map((user) => !user || router.createUrlTree(['/home'])));
};
