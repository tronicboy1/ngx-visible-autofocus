import { ModuleWithProviders, NgModule } from '@angular/core';
import type { FirebaseOptions } from 'firebase/app';
import type { AppCheckOptions } from 'firebase/app-check';

type EmulatorSettings =
  | {
      auth: number;
      firestore: number;
      database: number;
      storage: number;
    }
  | undefined;
type AppCheckSettings = AppCheckOptions | undefined;

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class NgxFirebaseUserPlatformModule {
  static forRoot(
    config: FirebaseOptions,
    production: boolean,
    appCheck?: AppCheckSettings,
    emulators?: EmulatorSettings
  ): ModuleWithProviders<NgxFirebaseUserPlatformModule> {
    if (!config) throw TypeError('Firebase configuration is required.');
    const firebaseSettings: FirebaseSettings = {
      config,
      production,
      emulators,
      appCheck,
    };
    return {
      ngModule: NgxFirebaseUserPlatformModule,
      providers: [{ provide: FirebaseSettings, useValue: firebaseSettings }],
    };
  }
}

export class FirebaseSettings {
  config!: FirebaseOptions;
  production = false;
  emulators: EmulatorSettings;
  appCheck: AppCheckSettings;
}
