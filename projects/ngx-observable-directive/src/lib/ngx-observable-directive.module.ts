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
  constructor(
    @Optional() @SkipSelf() parentModule?: NgxObservableDirectiveModule
  ) {
    if (parentModule) {
      throw new Error(
        'NgxObservableDirectiveModule is already loaded. Import AppModule.'
      );
    }
  }

  static forRoot(
    settings: IntersectionObserverInit = {}
  ): ModuleWithProviders<NgxObservableDirectiveModule> {
    return {
      ngModule: NgxObservableDirectiveModule,
      providers: [{ provide: ObserverSettings, useValue: { settings } }],
    };
  }
}
