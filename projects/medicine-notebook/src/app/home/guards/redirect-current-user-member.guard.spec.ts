import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { redirectCurrentUserMemberGuard } from './redirect-current-user-member.guard';

describe('redirectCurrentUserMemberGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redirectCurrentUserMemberGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
