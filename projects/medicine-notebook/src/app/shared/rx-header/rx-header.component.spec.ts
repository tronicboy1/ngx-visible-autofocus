import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxHeaderComponent } from './rx-header.component';

describe('RxHeaderComponent', () => {
  let component: RxHeaderComponent;
  let fixture: ComponentFixture<RxHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
