import { ModuleWithProviders, NgModule } from '@angular/core';
import type { FirebaseOptions } from 'firebase/app';
import type { AppCheckOptions } from 'firebase/app-check';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class NgxFirebaseUserPlatformModule {
  static forRoot(
    config: InstanceType<typeof FirebaseSettings>
  ): ModuleWithProviders<NgxFirebaseUserPlatformModule> {
    if (!config) throw TypeError('Firebase configuration is required.');
    return {
      ngModule: NgxFirebaseUserPlatformModule,
      providers: [{ provide: FirebaseSettings, useValue: config }],
    };
  }
}

export class FirebaseSettings {
  production = false;
  /**
     * @example
     * Provide ports for Firebase Emulator Suite
     * {
        auth: 9099,
        firestore: 8080,
        storage: 9199,
      }
     */
  emulators?: {
    auth: number;
    firestore: number;
    database: number;
    storage: number;
  };
  /**
   * Initialize App Check in app
   *
   * @example
   * {
      provider: new ReCaptchaV3Provider('...'),
      isTokenAutoRefreshEnabled: true,
    }
  */
  appCheck?: AppCheckOptions;
  analytics?: boolean;

  constructor(public firebaseConfig: FirebaseOptions) {}
}
