import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasGroupIdGuard } from './has-group-id.guard';

describe('hasGroupIdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => hasGroupIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
