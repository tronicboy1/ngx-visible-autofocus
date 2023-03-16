import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const hasGroupIdGuard: CanActivateFn = (route, _state) => {
  const router = inject(Router);
  return (
    Boolean(route.queryParams['groupId'] && route.queryParams['email'] && route.queryParams['memberId']) ||
    router.createUrlTree(['/auth'])
  );
};
