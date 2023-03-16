import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserRegisterComponent } from './single-user-register.component';

describe('SingleUserRegisterComponent', () => {
  let component: SingleUserRegisterComponent;
  let fixture: ComponentFixture<SingleUserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleUserRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
