import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicineFormComponent } from './edit-medicine-form.component';

describe('EditMedicineFormComponent', () => {
  let component: EditMedicineFormComponent;
  let fixture: ComponentFixture<EditMedicineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMedicineFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMedicineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
