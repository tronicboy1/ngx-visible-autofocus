import { Injectable, Optional } from '@angular/core';

export class ObserverSettings {
  settings: IntersectionObserverInit = {};
}

@Injectable({
  providedIn: 'root',
})
export class ObserverService {
  /** only create when needed */
  private _observer?: IntersectionObserver;
  private _settings: IntersectionObserverInit = {};

  constructor(@Optional() private config?: ObserverSettings) {
    if (config) {
      this._settings = config.settings;
    }
  }
}
