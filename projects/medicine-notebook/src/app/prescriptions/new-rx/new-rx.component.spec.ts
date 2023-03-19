import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRxComponent } from './new-rx.component';

describe('NewRxComponent', () => {
  let component: NewRxComponent;
  let fixture: ComponentFixture<NewRxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
