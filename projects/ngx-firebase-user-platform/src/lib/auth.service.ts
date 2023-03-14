import { inject, Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  updatePassword,
  fetchSignInMethodsForEmail,
  updateEmail,
  updateProfile,
} from 'firebase/auth';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { filter, map, Observable, shareReplay } from 'rxjs';
import type { User } from 'firebase/auth';
import { UserService } from './user.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseService = inject(FirebaseService);
  private userService = inject(UserService);
  private authState$?: Observable<User | null>;

  public createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.firebaseService.auth, email, password).then((creds) => {
      return this.userService.setUidRecord(email, creds.user.uid);
    });
  }

  public signInUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.firebaseService.auth, email, password).then((creds) => {
      return this.userService.setUidRecord(email, creds.user.uid).then(() => this.userService.setOnlineStatus(creds.user.uid, 'online'));
    });
  }

  public sendSignInEmail(email: string) {
    return signInWithEmailLink(this.firebaseService.auth, email);
  }

  public sendPasswordResetEmail(email: string) {
    return sendPasswordResetEmail(this.firebaseService.auth, email);
  }

  public changeEmail(newEmail: string) {
    const { currentUser } = this.firebaseService.auth;
    if (!currentUser) throw Error('Cannot change email if not logged in.');
    return updateEmail(currentUser, newEmail).then(() => this.userService.setUidRecord(newEmail, currentUser.uid));
  }

  public updateAccount(accountData: Parameters<typeof updateProfile>[1], photo?: File) {
    const { currentUser } = this.firebaseService.auth;
    if (!currentUser) throw Error('Cannot change account if not logged in.');
    return Promise.resolve(photo ? this.uploadAvatar(currentUser.uid, photo) : undefined).then((photoURL) => {
      const data = photoURL ? Object.assign(accountData, { photoURL }) : accountData;
      return Promise.all([updateProfile(currentUser, data), this.userService.updateUserRecord(currentUser.uid, data)]);
    });
  }

  private uploadAvatar(uid: string, photo: File) {
    const ref = storageRef(this.firebaseService.storage, uid);
    return uploadBytes(ref, photo).then((result) => {
      const { ref } = result;
      return getDownloadURL(ref);
    });
  }

  public changePassword(newPassword: string) {
    const { currentUser } = this.firebaseService.auth;
    if (!currentUser) throw Error('Cannot change password if not logged in.');
    return updatePassword(currentUser, newPassword);
  }

  public signOutUser() {
    const { currentUser } = this.firebaseService.auth;
    if (!currentUser) throw Error('User data was not available.');
    return this.userService.setOnlineStatus(currentUser.uid, 'offline').then(() => signOut(this.firebaseService.auth));
  }

  public getAuthState(): Observable<User | null> {
    return (this.authState$ ||= new Observable<User | null>((observer) => {
      let unsubscribe = onAuthStateChanged(this.firebaseService.auth, (user) => {
        observer.next(user);
      });
      return unsubscribe;
    }).pipe(shareReplay(1)));
  }

  /**
   * Waits for auth state to be non-null User.
   */
  public waitForUser() {
    return this.getAuthState().pipe(filter((user): user is NonNullable<typeof user> => Boolean(user)));
  }

  public getUid() {
    return this.waitForUser().pipe(map((user) => user.uid));
  }

  public checkIfUserExists(email: string) {
    return fetchSignInMethodsForEmail(this.firebaseService.auth, email).then((result) => {
      if (!(result instanceof Array)) return false;
      return Boolean(result.length);
    });
  }
}
