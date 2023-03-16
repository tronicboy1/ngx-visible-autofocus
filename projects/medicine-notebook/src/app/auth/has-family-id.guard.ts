import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const hasFamilyIdGuard: CanActivateFn = (route, _state) => {
  const router = inject(Router);
  return Boolean(route.queryParams['familyId'] && route.queryParams['email']) || router.createUrlTree(['/auth']);
};
