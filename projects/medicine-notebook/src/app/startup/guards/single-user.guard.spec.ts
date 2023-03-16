import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { singleUserGuard } from './single-user.guard';

describe('singleUserGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => singleUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
