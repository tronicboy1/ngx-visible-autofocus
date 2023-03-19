import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosageTableComponent } from './dosage-table.component';

describe('DosageTableComponent', () => {
  let component: DosageTableComponent;
  let fixture: ComponentFixture<DosageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DosageTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DosageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
