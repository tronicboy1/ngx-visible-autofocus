import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxBaseComponentsModule } from '@tronicboy/ngx-base-components';
import { GeolocationSettings } from './geolocation.service';
import { LocationFormComponent } from './location/location-form/location-form.component';
import { LocationComponent } from './location/location.component';

@NgModule({
  declarations: [LocationComponent, LocationFormComponent],
  imports: [ReactiveFormsModule, NgxBaseComponentsModule, BrowserModule],
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
