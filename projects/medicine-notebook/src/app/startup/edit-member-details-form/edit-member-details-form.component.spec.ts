import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberDetailsFormComponent } from './edit-member-details-form.component';

describe('EditMemberDetailsFormComponent', () => {
  let component: EditMemberDetailsFormComponent;
  let fixture: ComponentFixture<EditMemberDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMemberDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMemberDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
