import { TestBed } from '@angular/core/testing';

import { DoseAdministrationService } from './dose-administration.service';

describe('DoseAdministrationService', () => {
  let service: DoseAdministrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoseAdministrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
