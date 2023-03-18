import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasOneRxGuard } from './has-one-rx.guard';

describe('hasOneRxGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasOneRxGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
