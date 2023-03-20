import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBaseComponent } from './home-base.component';

describe('HomeBaseComponent', () => {
  let component: HomeBaseComponent;
  let fixture: ComponentFixture<HomeBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
