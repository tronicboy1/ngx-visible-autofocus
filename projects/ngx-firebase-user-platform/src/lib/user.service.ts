import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import type { updateProfile } from 'firebase/auth';
import { FirebaseService } from './firebase.service';

type AccountDetails = Parameters<typeof updateProfile>[1];
export type UserStatus =
  | 'online'
  | 'away'
  | 'offline'
  | 'unknown'
  | 'new-message'
  | undefined;
export type UidRecord = { email: string; uid: string };
export type UserData = {
  uid: string;
  email: string;
  status?: UserStatus;
  contacts?: string[];
} & AccountDetails;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  static usersPath = 'users';
  private firebaseService = inject(FirebaseService);
  private collection = collection(
    this.firebaseService.firestore,
    UserService.usersPath
  );

  constructor() {}

  protected getUserData(uid: string) {
    const ref = doc(this.firebaseService.firestore, UserService.usersPath, uid);
    return getDoc(ref).then((doc) => doc.data() as UserData | undefined);
  }

  public watchUserDoc(uid: string) {
    const ref = doc(this.firebaseService.firestore, UserService.usersPath, uid);
    return new Observable<UserData>((observer) => {
      let unsubscribe = onSnapshot(ref, (snapshot) => {
        const data = snapshot.data() as UserData | undefined;
        if (!data)
          return observer.error('Specified uid did not have a user document.');
        observer.next(data);
      });
      return unsubscribe;
    });
  }

  public watchOnlineStatus(theirUid: string) {
    return this.watchUserDoc(theirUid).pipe(map((userData) => userData.status));
  }

  public setOnlineStatus(myUid: string, status: UserStatus) {
    const ref = doc(
      this.firebaseService.firestore,
      `${UserService.usersPath}/${myUid}`
    );
    return updateDoc(ref, { status });
  }

  public setUidRecord(email: string, myUid: string) {
    const newUserData: UserData = { email, uid: myUid };
    const ref = doc(this.collection, myUid);
    return getDoc(ref).then((doc) => {
      const hasDoc = Boolean(doc.data());
      return hasDoc ? updateDoc(ref, newUserData) : setDoc(ref, newUserData);
    });
  }

  public getUserByEmail(email: string): Promise<UserData | undefined> {
    const q = query(this.collection, where('email', '==', email));
    return getDocs(q).then((result) => {
      if (result.empty) return;
      const first = result.docs[0];
      return first.data() as UserData;
    });
  }

  public getTheirUid(email: string) {
    return this.getUserByEmail(email).then((data) => {
      if (!data) throw Error('User does not exist.');
      return data.uid;
    });
  }

  public updateUserRecord(myUid: string, data: AccountDetails) {
    const ref = doc(
      this.firebaseService.firestore,
      `${UserService.usersPath}/${myUid}`
    );
    return updateDoc(ref, data);
  }
}
