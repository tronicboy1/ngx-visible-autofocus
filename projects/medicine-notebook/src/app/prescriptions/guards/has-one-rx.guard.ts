import { CanActivateFn } from '@angular/router';

export const hasOneRxGuard: CanActivateFn = (route, state) => {
  return true;
};
