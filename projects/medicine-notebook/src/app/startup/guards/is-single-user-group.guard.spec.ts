import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isSingleUserGroupGuard } from './is-single-user-group.guard';

describe('isSingleUserGroupGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isSingleUserGroupGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
