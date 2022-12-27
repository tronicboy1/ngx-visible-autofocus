import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutoFocusDirective } from './auto-focus.directive';

@Component({
  template: `<h2>No Highlight</h2>
    <input #box ngxAutofocus />
    <input #boxNone />
    <input id="box-once" ngxAutofocus [once]="false" />
    <input
      id="custom-callback"
      ngxAutofocus
      [customCallback]="this.customCallback"
    />`,
})
class TestComponent {
  customCallback() {
    return 48;
  }
}

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
type AutoFocusDirectiveElement = DebugElement & {
  nativeElement: { [AutoFocusDirective.attributeKey]?: symbol };
};
describe('AutoFocusDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let autoFocus: AutoFocusDirectiveElement;
  let bareInput: DebugElement;
  let notOnce: AutoFocusDirectiveElement;
  let customCallbackComponent: AutoFocusDirectiveElement;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [AutoFocusDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    autoFocus = fixture.debugElement.query(By.directive(AutoFocusDirective));
    bareInput = fixture.debugElement.query(By.css('input:not([ngxAutofocus])'));
    notOnce = fixture.debugElement.query(By.css('#box-once'));
    customCallbackComponent = fixture.debugElement.query(
      By.css('#custom-callback')
    );
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

  it('should have once settings in map', () => {
    const key = AutoFocusDirective.attributeKey;
    const uniqueKey = Reflect.get(autoFocus.nativeElement, key);
    expect(AutoFocusDirective.fireOnceSettings.size).toBeGreaterThan(0);
    expect(AutoFocusDirective.fireOnceSettings.get(uniqueKey)).toBeTrue();
  });

  it('Not once element should be truthy', () => {
    expect(notOnce).toBeTruthy();
  });

  it('Not once element should have once setting as false', () => {
    const key = AutoFocusDirective.attributeKey;
    const uniqueKey = Reflect.get(notOnce.nativeElement, key);
    expect(AutoFocusDirective.fireOnceSettings.get(uniqueKey)).toBeFalse();
  });

  it('Custom callback should be truthy', () => {
    expect(customCallbackComponent).toBeTruthy();
  });

  it('Custom callback should be assigned properly', () => {
    const key = AutoFocusDirective.attributeKey;
    const uniqueKey = Reflect.get(customCallbackComponent.nativeElement, key);
    const callback = AutoFocusDirective.callbackCache.get(uniqueKey);
    expect(callback).toBeTruthy();
    expect(callback!()).toBeGreaterThanOrEqual(48);
  });
});
