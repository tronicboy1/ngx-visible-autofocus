import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberDetailsFormComponent } from './add-member-details-form.component';

describe('AddMemberDetailsFormComponent', () => {
  let component: AddMemberDetailsFormComponent;
  let fixture: ComponentFixture<AddMemberDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMemberDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
