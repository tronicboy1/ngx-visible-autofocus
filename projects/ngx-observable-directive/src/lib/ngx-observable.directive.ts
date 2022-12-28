import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[ngxNgxObservable]',
})
export class NgxObservableDirective implements OnInit, OnDestroy {
  static readonly attributeKey: unique symbol = Symbol(
    'NgxObservableDirectiveKey'
  );
  static readonly callbackCache = new Map<symbol, () => void>();
  /** only create when needed */
  private static _observer?: IntersectionObserver;
  static get observer() {
    return (this._observer ||= new IntersectionObserver((entries) =>
      entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => {
          const { target } = entry;
          if (!(target instanceof HTMLElement))
            throw TypeError('Must observe HTMLElements');
          return target;
        })
        .forEach((el) => {
          const uniqueKey = el[NgxObservableDirective.attributeKey];
          if (!uniqueKey) throw TypeError('Unique key not found.');
          const callback = NgxObservableDirective.callbackCache.get(uniqueKey);
          if (!callback) throw TypeError('Callback not found.');
          callback();
        })
    ));
  }

  @Output('in-view') inView = new EventEmitter<void>();
  private el = inject(ElementRef);
  private get nativeEl() {
    if (!(this.el.nativeElement instanceof HTMLElement))
      throw TypeError('Must be used with HTMLElement.');
    return this.el.nativeElement;
  }
  private uniqueKey = Symbol('UniqueKey');

  ngOnInit(): void {
    NgxObservableDirective.callbackCache.set(this.uniqueKey, () =>
      this.inView.emit()
    );
    NgxObservableDirective.observer.observe(this.nativeEl);
  }

  ngOnDestroy(): void {
    NgxObservableDirective.callbackCache.delete(this.uniqueKey);
    NgxObservableDirective.observer.unobserve(this.nativeEl);
  }
}

declare global {
  interface HTMLElement {
    [NgxObservableDirective.attributeKey]?: symbol;
  }
}
