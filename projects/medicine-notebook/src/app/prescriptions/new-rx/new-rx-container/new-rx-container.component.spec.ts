import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRxContainerComponent } from './new-rx-container.component';

describe('NewRxContainerComponent', () => {
  let component: NewRxContainerComponent;
  let fixture: ComponentFixture<NewRxContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRxContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRxContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
