import { CanActivateFn } from '@angular/router';

export const setupFinishedGuard: CanActivateFn = (route, state) => {
  return true;
};
