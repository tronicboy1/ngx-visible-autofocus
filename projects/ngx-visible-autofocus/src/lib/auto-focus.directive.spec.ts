import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutoFocusDirective } from './auto-focus.directive';

@Component({
  template: ` <h2>No Highlight</h2>
    <input #box ngxAutofocus />
    <input #box />`,
})
class TestComponent {}

let triggerInView: (entries: IntersectionObserverEntry[]) => void;

class IntersectionObserver {
  observe: () => void;
  unobserve: () => void;

  constructor(
    public callback: (entries: Array<IntersectionObserverEntry>) => void
  ) {
    this.observe = jasmine.createSpy('observe');
    this.unobserve = jasmine.createSpy('unobserve');
    triggerInView = callback;
  }
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
(window as any).IntersectionObserver = IntersectionObserver;

describe('AutoFocusDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let autoFocus: DebugElement & {
    nativeElement: { [AutoFocusDirective.attributeKey]?: symbol };
  };
  let bareInput: DebugElement;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [AutoFocusDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    autoFocus = fixture.debugElement.query(By.directive(AutoFocusDirective));
    bareInput = fixture.debugElement.query(By.css('input:not([ngxAutofocus])'));
  });

  it('should create an instance', () => {
    const directive = new TestComponent();
    expect(directive).toBeTruthy();
  });

  it('should have autofocus component', () => {
    expect(autoFocus).toBeTruthy();
  });

  it('should have autofocus symbol attribute', () => {
    const key = AutoFocusDirective.attributeKey;
    const uniqueKey = Reflect.get(autoFocus.nativeElement, key);
    expect(uniqueKey).toBeTruthy();
  });

  it('should have callback in map', () => {
    const key = AutoFocusDirective.attributeKey;
    const uniqueKey = Reflect.get(autoFocus.nativeElement, key);
    expect(AutoFocusDirective.callbackCache.size).toBeGreaterThan(0);
    expect(AutoFocusDirective.callbackCache.get(uniqueKey)).toBeTruthy();
  });
});
