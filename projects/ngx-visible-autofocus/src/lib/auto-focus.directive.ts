import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[ngxAutofocus]',
})
export class AutoFocusDirective implements AfterViewInit, OnDestroy {
  static readonly attributeKey: unique symbol = Symbol(
    'AutoFocusDirectiveAttributeKey'
  );
  static readonly callbackCache = new Map<symbol, () => void>();
  static readonly observer = new IntersectionObserver((entries) =>
    entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => {
        const { target } = entry;
        if (!(target instanceof HTMLElement))
          throw TypeError('Must observe HTML elements');
        return target;
      })
      .forEach((el) => {
        const key = el[AutoFocusDirective.attributeKey];
        if (!key)
          throw TypeError('HTML element has no auto focus attribute key.');
        const callback = AutoFocusDirective.callbackCache.get(key);
        if (!callback) throw TypeError('Auto focus callback not cached.');
        callback();
      })
  );

  private uniqueKey = Symbol('InstanceStaticCacheKey');
  private el = inject(ElementRef);
  get nativeElement() {
    if (!(this.el.nativeElement instanceof HTMLElement))
      throw TypeError('Auto focus must be used with an HTML element.');
    return this.el.nativeElement;
  }

  ngAfterViewInit(): void {
    this.nativeElement[AutoFocusDirective.attributeKey] = this.uniqueKey;
    AutoFocusDirective.callbackCache.set(this.uniqueKey, () =>
      this.nativeElement.focus()
    );
    AutoFocusDirective.observer.observe(this.nativeElement);
  }

  ngOnDestroy(): void {
    AutoFocusDirective.observer.unobserve(this.nativeElement);
    AutoFocusDirective.callbackCache.delete(this.uniqueKey);
  }

  static ngTemplateContextGuard(
    _directive: AutoFocusDirectiveContext,
    _context: HTMLElement
  ): _context is AutoFocusDirectiveContext {
    return true;
  }
}

interface AutoFocusDirectiveContext extends HTMLElement {}

declare global {
  interface HTMLElement {
    [AutoFocusDirective.attributeKey]?: symbol;
  }
}
