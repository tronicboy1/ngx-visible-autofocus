import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDosesComponent } from './current-doses.component';

describe('CurrentDosesComponent', () => {
  let component: CurrentDosesComponent;
  let fixture: ComponentFixture<CurrentDosesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentDosesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentDosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
