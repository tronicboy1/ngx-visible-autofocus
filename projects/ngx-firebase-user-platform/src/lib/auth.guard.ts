import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, map } from 'rxjs';

export const authGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.getAuthState().pipe(
    first(),
    map((user) => Boolean(user)),
    map((isLoggedIn) => isLoggedIn || router.createUrlTree(['auth'], { queryParamsHandling: 'merge' })),
  );
};

type CreateUrlParams = Parameters<InstanceType<typeof Router>['createUrlTree']>;
export const authGuardWithCustomRedirect: (...args: CreateUrlParams) => CanActivateFn =
  (commands, navigationExtras) => (_route, _state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.getAuthState().pipe(
      first(),
      map((user) => Boolean(user)),
      map((isLoggedIn) => isLoggedIn || router.createUrlTree(commands, navigationExtras)),
    );
  };

/** Backwards compatibility with class based */
export const AuthGuard = authGuard;
