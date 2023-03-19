import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRxAddModeComponent } from './choose-rx-add-mode.component';

describe('ChooseRxAddModeComponent', () => {
  let component: ChooseRxAddModeComponent;
  let fixture: ComponentFixture<ChooseRxAddModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseRxAddModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseRxAddModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
