import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRxComponent } from './edit-rx.component';

describe('EditRxComponent', () => {
  let component: EditRxComponent;
  let fixture: ComponentFixture<EditRxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
