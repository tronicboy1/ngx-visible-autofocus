import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFamilyFormComponent } from './create-family-form.component';

describe('CreateFamilyFormComponent', () => {
  let component: CreateFamilyFormComponent;
  let fixture: ComponentFixture<CreateFamilyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFamilyFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFamilyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
