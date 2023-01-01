import { Injectable, Inject } from '@angular/core';
import { FirebaseSettings } from './ngx-firebase-user-platform.module';
import { initializeApp } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { initializeAppCheck } from 'firebase/app-check';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    @Inject(FirebaseSettings) private firebaseSettings: FirebaseSettings
  ) {
    if (!firebaseSettings.production && firebaseSettings.emulators) {
      connectFirestoreEmulator(
        this.firestore,
        'localhost',
        firebaseSettings.emulators.firestore
      );
      connectStorageEmulator(
        this.storage,
        'localhost',
        firebaseSettings.emulators.storage
      );
      connectAuthEmulator(
        this.auth,
        `http://localhost:${firebaseSettings.emulators.auth}`
      );
    }

    if (!firebaseSettings.production) return;
    if (firebaseSettings.appCheck) {
      initializeAppCheck(this.app, firebaseSettings.appCheck);
    }
    if (firebaseSettings.analytics) {
      getAnalytics(this.app);
    }
  }

  get app() {
    return initializeApp(this.firebaseSettings.firebaseConfig);
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
