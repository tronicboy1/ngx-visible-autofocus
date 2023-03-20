import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasActiveRxGuard } from './has-active-rx.guard';

describe('hasActiveRxGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasActiveRxGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
