import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddForgottenDoseComponent } from './add-forgotten-dose.component';

describe('AddForgottenDoseComponent', () => {
  let component: AddForgottenDoseComponent;
  let fixture: ComponentFixture<AddForgottenDoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddForgottenDoseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddForgottenDoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
