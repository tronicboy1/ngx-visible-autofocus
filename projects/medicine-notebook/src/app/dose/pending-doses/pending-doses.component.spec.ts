import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDosesComponent } from './pending-doses.component';

describe('PendingDosesComponent', () => {
  let component: PendingDosesComponent;
  let fixture: ComponentFixture<PendingDosesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingDosesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingDosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
