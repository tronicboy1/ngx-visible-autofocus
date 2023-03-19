import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRxComponent } from './select-rx.component';

describe('SelectRxComponent', () => {
  let component: SelectRxComponent;
  let fixture: ComponentFixture<SelectRxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
