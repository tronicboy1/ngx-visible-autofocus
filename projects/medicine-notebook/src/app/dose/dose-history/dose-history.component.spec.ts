import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoseHistoryComponent } from './dose-history.component';

describe('DoseHistoryComponent', () => {
  let component: DoseHistoryComponent;
  let fixture: ComponentFixture<DoseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoseHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
