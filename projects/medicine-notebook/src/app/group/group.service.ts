import { inject, Injectable } from '@angular/core';
import { where } from 'firebase/firestore';
import { FirestoreService } from 'projects/ngx-firebase-user-platform/src/lib/firestore.service';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Group, GroupFactory, GroupWithId } from './group-factory';
import { AbstractGroupService } from './group.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class GroupService extends AbstractGroupService {
  private factory = new GroupFactory();
  private firestoreService = inject(FirestoreService);
  private auth = inject(AuthService);

  create$(data: Omit<Group, 'createdAt' | 'memberIds' | 'setupCompleted' | 'useMode'>) {
    const group = this.factory.create(data);
    return this.firestoreService.create$(this.rootKey, group);
  }

  get$(id: string) {
    return this.firestoreService.get$<GroupWithId>(this.rootKey, id).pipe(
      map((value) => {
        if (!value) throw ReferenceError('Group not found.');
        return value;
      }),
    );
  }

  getMembersGroup$(memberId: string) {
    return forkJoin([
      this.firestoreService.query$(this.rootKey, where('memberIds', 'array-contains', memberId)),
      this.firestoreService.query$(this.rootKey, where('owner', '==', memberId)),
    ]).pipe(
      map(([memberIdsQuery, ownerQuery]) => {
        const hit = !memberIdsQuery.empty ? memberIdsQuery : !ownerQuery.empty ? ownerQuery : undefined;
        if (!hit) return undefined;
        const groupFound = hit.docs[0];
        const data = groupFound.data() as Group;
        return { ...data, id: groupFound.id };
      }),
    );
  }

  update$(id: string, data: Partial<Group>) {
    return this.firestoreService.update$(this.rootKey, id, data);
  }

  delete$(id: string): Observable<void> {
    return this.firestoreService.delete$(this.rootKey, id);
  }

  sendInvite(email: string, groupId: string, memberId: string) {
    const url = new URL('auth/finish-signup', environment.url);
    url.searchParams.set('groupId', groupId);
    url.searchParams.set('email', email);
    url.searchParams.set('memberId', memberId);
    return this.auth.sendSignInEmail(email, url.toString());
  }
}
