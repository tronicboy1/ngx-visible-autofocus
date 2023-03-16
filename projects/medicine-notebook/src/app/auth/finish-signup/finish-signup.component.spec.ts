import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishSignupComponent } from './finish-signup.component';

describe('FinishSignupComponent', () => {
  let component: FinishSignupComponent;
  let fixture: ComponentFixture<FinishSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
