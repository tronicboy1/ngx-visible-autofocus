import { Injectable, Inject } from '@angular/core';
import { FirebaseSettings } from './ngx-firebase-user-platform.module';
import { initializeApp } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { initializeAppCheck } from 'firebase/app-check';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    @Inject(FirebaseSettings) private firebaseSettings: FirebaseSettings
  ) {
    console.log(firebaseSettings);
    const app = initializeApp(firebaseSettings.config);

    if (!firebaseSettings.production && firebaseSettings.emulators) {
      const firestore = getFirestore(app);
      connectFirestoreEmulator(
        firestore,
        'localhost',
        firebaseSettings.emulators.firestore
      );
      const storage = getStorage(app);
      connectStorageEmulator(
        storage,
        'localhost',
        firebaseSettings.emulators.storage
      );
    }

    if (firebaseSettings.production && firebaseSettings.appCheck) {
      initializeAppCheck(app, firebaseSettings.appCheck);
      getAnalytics(app);
    }
  }

  get app() {
    return initializeApp(this.firebaseSettings.config);
  }

  get auth() {
    return getAuth(this.app);
  }

  get firestore() {
    return getFirestore(this.app);
  }

  get storage() {
    return getStorage(this.app);
  }
}
