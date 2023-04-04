import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { canCloseAddMemberModalGuard } from './can-close-add-member-modal.guard';

describe('canCloseAddMemberModalGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canCloseAddMemberModalGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
