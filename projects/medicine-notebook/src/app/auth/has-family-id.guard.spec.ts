import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasFamilyIdGuard } from './has-family-id.guard';

describe('hasFamilyIdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasFamilyIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
