import { TestBed } from '@angular/core/testing';

import { NewRxEditStateService } from './new-rx-edit-state.service';

describe('NewRxEditStateService', () => {
  let service: NewRxEditStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewRxEditStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
