import { inject, Injectable } from '@angular/core';
import { arrayUnion, collection, doc, runTransaction, where } from 'firebase/firestore';
import { FirestoreService } from 'projects/ngx-firebase-user-platform/src/lib/firestore.service';
import { from, map, mergeMap, Observable } from 'rxjs';
import { AbstractGroupService } from './group.service.abstract';
import { Member, MemberFactory, MemberWithId } from './member-factory';
import { AbstractMemberService } from './member.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class MemberService extends AbstractMemberService {
  private factory = new MemberFactory();
  private firestore = inject(FirestoreService);

  create$(data: Partial<Omit<Member, 'groupId'>> & { groupId: string }) {
    const member = this.factory.create(data);
    return this.getGroupMembers$(data.groupId).pipe(
      map((members) => {
        if (members.find((member) => member.name === data.name)) throw Error('SameNameError');
        return members;
      }),
      mergeMap(() =>
        runTransaction(this.firestore.db, async (transaction) => {
          const groupRef = doc(this.firestore.db, AbstractGroupService.rootKey, member.groupId);
          const group = await transaction.get(groupRef);
          if (!group.exists()) throw ReferenceError('Group ID is incorrect');
          const memberRef = doc(collection(this.firestore.db, this.rootKey));
          await transaction.set(memberRef, member);
          if (member.uid) {
            await transaction.update(groupRef, { memberIds: arrayUnion(member.uid) });
          }
          return memberRef.id;
        }),
      ),
    );
  }

  addMemberAccount$(groupId: string, memberId: string, memberUid: string) {
    return from(
      runTransaction(this.firestore.db, async (transaction) => {
        const groupRef = doc(this.firestore.db, AbstractGroupService.rootKey, groupId);
        const group = await transaction.get(groupRef);
        if (!group.exists()) throw ReferenceError('Group ID is incorrect');
        await transaction.update(groupRef, { memberIds: arrayUnion(memberUid) });
        const memberRef = doc(this.firestore.db, this.rootKey, memberId);
        const memberUpdates: Partial<Member> = { groupId, uid: memberUid };
        await transaction.update(memberRef, memberUpdates);
      }),
    );
  }

  update$(id: string, data: Partial<Member>): Observable<void> {
    return this.firestore.update$(this.rootKey, id, data);
  }

  delete$(id: string): Observable<void> {
    return this.get$(id).pipe(
      mergeMap((member) => {
        if (member.uid) throw Error('Cannot delete member who is registered.');
        return this.firestore.delete$(this.rootKey, id);
      }),
    );
  }

  get$(id: string): Observable<MemberWithId> {
    return this.firestore.get$<MemberWithId>(this.rootKey, id).pipe(
      map((value) => {
        if (!value) throw ReferenceError('Member not found.');
        return value;
      }),
    );
  }

  getGroupMembers$(groupId: string): Observable<MemberWithId[]> {
    return this.firestore.query$(this.rootKey, where('groupId', '==', groupId)).pipe(
      map((results) => {
        if (results.empty) return [];
        return results.docs.map((doc) => {
          const data = doc.data() as Member;
          return { ...data, id: doc.id };
        });
      }),
    );
  }
}
