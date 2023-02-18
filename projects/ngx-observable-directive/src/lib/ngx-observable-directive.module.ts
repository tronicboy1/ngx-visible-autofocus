import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { NgxObservableDirective } from './ngx-observable.directive';
import { ObserverSettings } from './observer.service';

@NgModule({
  declarations: [NgxObservableDirective],
  imports: [],
  exports: [NgxObservableDirective],
})
export class NgxObservableDirectiveModule {
  static settingsCache?: IntersectionObserverInit;
  static callbackCache?: IntersectionObserverCallback;

  static forRoot(
    /** Options to provide to IntersectionObserver instance, ie the second parameter of new IntersectionObserver(..., { ... }) */
    settings: IntersectionObserverInit = {},
    /** Optional callback to overwrite default IntersectionObserver callback */
    intersectionObserverCallback?: IntersectionObserverCallback
  ): ModuleWithProviders<NgxObservableDirectiveModule> {
    this.settingsCache = settings;
    this.callbackCache = intersectionObserverCallback;
    return {
      ngModule: NgxObservableDirectiveModule,
      providers: [
        {
          provide: ObserverSettings,
          useValue: { settings, intersectionObserverCallback },
        },
      ],
    };
  }

  static forChild(): ModuleWithProviders<NgxObservableDirectiveModule> {
    if (!this.settingsCache) throw Error('Not imported in root.');
    return {
      ngModule: NgxObservableDirectiveModule,
      providers: [
        {
          provide: ObserverSettings,
          useValue: {
            settings: this.settingsCache,
            intersectionObserverCallback: this.callbackCache,
          },
        },
      ],
    };
  }
}
