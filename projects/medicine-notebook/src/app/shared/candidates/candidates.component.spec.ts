import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineCandidatesComponent } from './medicine-candidates.component';

describe('MedicineCandidatesComponent', () => {
  let component: MedicineCandidatesComponent;
  let fixture: ComponentFixture<MedicineCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineCandidatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
