import { NgModule, isDevMode } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxFirebaseUserPlatformModule } from 'projects/ngx-firebase-user-platform/src/public-api';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxFirebaseUserPlatformModule.forRoot({
      firebaseConfig: {
        apiKey: 'AIzaSyCysd_o6nPKEz7w710EKNM_SQlqJWRCsR0',
        authDomain: 'medicine-notebook-58ea8.firebaseapp.com',
        projectId: 'medicine-notebook-58ea8',
        storageBucket: 'medicine-notebook-58ea8.appspot.com',
        messagingSenderId: '524208041112',
        appId: '1:524208041112:web:2814a4a0549ec1a1ec74ed',
        measurementId: 'G-WP0LN01QWV',
      },
      production: environment.production,
      emulators: environment.emulatorPorts
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
