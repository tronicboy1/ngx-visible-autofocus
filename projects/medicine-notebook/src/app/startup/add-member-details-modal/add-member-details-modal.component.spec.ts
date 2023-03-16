import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberDetailsModalComponent } from './add-member-details-modal.component';

describe('AddMemberDetailsModalComponent', () => {
  let component: AddMemberDetailsModalComponent;
  let fixture: ComponentFixture<AddMemberDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMemberDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
