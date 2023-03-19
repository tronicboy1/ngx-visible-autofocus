import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxFormComponent } from './rx-form.component';

describe('RxFormComponent', () => {
  let component: RxFormComponent;
  let fixture: ComponentFixture<RxFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RxFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
