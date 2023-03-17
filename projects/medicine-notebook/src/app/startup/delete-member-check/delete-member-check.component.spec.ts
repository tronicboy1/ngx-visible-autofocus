import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMemberCheckComponent } from './delete-member-check.component';

describe('DeleteMemberCheckComponent', () => {
  let component: DeleteMemberCheckComponent;
  let fixture: ComponentFixture<DeleteMemberCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMemberCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMemberCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
