import { TestBed } from '@angular/core/testing';

import { MedicineDbService } from './medicine-db.service';

describe('MedicineDbService', () => {
  let service: MedicineDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
