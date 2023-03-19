import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRxFormComponent } from './new-rx-form.component';

describe('NewRxFormComponent', () => {
  let component: NewRxFormComponent;
  let fixture: ComponentFixture<NewRxFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRxFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
