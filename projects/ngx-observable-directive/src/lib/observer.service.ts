import { Injectable, Optional } from '@angular/core';

export class ObserverSettings {
  settings: IntersectionObserverInit = {};
}

@Injectable({
  providedIn: 'root',
})
export class ObserverService {
  static readonly attributeKey: unique symbol = Symbol(
    'NgxObservableDirectiveKey'
  );
  private callbackCache = new Map<symbol, () => void>();
  private onceSettingsCache = new Map<symbol, boolean>();
  /** only create when needed */
  private _observer?: IntersectionObserver;
  private settings: IntersectionObserverInit = {};

  constructor(@Optional() config?: ObserverSettings) {
    if (config) {
      this.settings = config.settings;
    }
  }

  get observer() {
    return (this._observer ||= new IntersectionObserver(
      (entries) =>
        entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => {
            const { target } = entry;
            if (!(target instanceof HTMLElement))
              throw TypeError('Must observe HTMLElements');
            return target;
          })
          .forEach((el) => {
            const uniqueKey = el[ObserverService.attributeKey];
            if (!uniqueKey) throw TypeError('Unique key not found.');
            const callback = this.callbackCache.get(uniqueKey);
            if (!callback) throw TypeError('Callback not found.');
            callback();
            const isOnce = this.onceSettingsCache.get(uniqueKey);
            if (isOnce) this.observer.unobserve(el);
          }),
      this.settings
    ));
  }

  observe(el: HTMLElement, key: symbol, callback: () => void, once = false) {
    el[ObserverService.attributeKey] = key;
    this.callbackCache.set(key, callback);
    this.onceSettingsCache.set(key, once);
    this.observer.observe(el);
  }

  unobserve(el: HTMLElement, key: symbol) {
    this.observer.unobserve(el);
    this.callbackCache.delete(key);
  }
}

declare global {
  interface HTMLElement {
    [ObserverService.attributeKey]?: symbol;
  }
}
