import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberModalComponent } from './edit-member-modal.component';

describe('EditMemberModalComponent', () => {
  let component: EditMemberModalComponent;
  let fixture: ComponentFixture<EditMemberModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMemberModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMemberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
