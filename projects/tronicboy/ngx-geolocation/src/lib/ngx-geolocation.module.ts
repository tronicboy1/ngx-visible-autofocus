import { ModuleWithProviders, NgModule } from '@angular/core';
import { LocationComponent } from './location/location.component';

@NgModule({
  declarations: [LocationComponent],
  imports: [],
  exports: [LocationComponent],
})
export class NgxGeolocationModule {
  static forRoot(
    config: GeolocationSettings
  ): ModuleWithProviders<NgxGeolocationModule> {
    return {
      ngModule: NgxGeolocationModule,
      providers: [{ provide: GeolocationSettings, useValue: config }],
    };
  }
}

export class GeolocationSettings {
  /**
   * Google Maps API key is required to display map in LocationComponent.
   * https://developers.google.com/maps/documentation/javascript/get-api-key
   */
  googleMapsAPIKey = '';
}
