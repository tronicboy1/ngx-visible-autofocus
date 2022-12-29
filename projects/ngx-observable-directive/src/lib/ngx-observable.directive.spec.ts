import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxObservableDirectiveModule } from './ngx-observable-directive.module';
import { NgxObservableDirective } from './ngx-observable.directive';

@Component({
  template: `<h2>No observer</h2>
    <h2 ngxObservable>Observer</h2>
    <h2 ngxObservable [once]="true">Once</h2>
    <h2 ngxObservable [customCallback]="this.customCallback">
      customCallback
    </h2>`,
})
class TestComponent {
  customCallback() {
    return 48;
  }
}

describe('NgxObservableDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [NgxObservableDirectiveModule.forRoot({ rootMargin: '50px' })],
      declarations: [TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new TestComponent();
    expect(directive).toBeTruthy();
  });
});
