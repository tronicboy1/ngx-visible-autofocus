import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoseComponent } from './dose.component';

describe('DoseComponent', () => {
  let component: DoseComponent;
  let fixture: ComponentFixture<DoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
