import { inject, Injectable } from '@angular/core';
import { arrayUnion, collection, doc, runTransaction, where } from 'firebase/firestore';
import { FirestoreService } from 'projects/ngx-firebase-user-platform/src/lib/firestore.service';
import { filter, from, map, mergeMap, Observable } from 'rxjs';
import { AbstractFamilyService } from './family.service.abstract';
import { Member, MemberFactory, MemberWithId } from './member-factory';
import { AbstractMemberService } from './member.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class MemberService extends AbstractMemberService {
  private factory = new MemberFactory();
  private firestore = inject(FirestoreService);

  create$(data: Partial<Omit<Member, 'familyId'>> & { familyId: string }) {
    const member = this.factory.create(data);
    return this.getFamilyMembers$(data.familyId).pipe(
      map((members) => {
        if (members.find((member) => member.name === data.name)) throw Error('SameNameError');
        return members;
      }),
      mergeMap(() => this.firestore.create$(this.rootKey, member)),
      map((ref) => ref.id),
    );
  }

  addMemberAccount$(familyId: string, memberId: string, memberUid: string) {
    return runTransaction(this.firestore.db, async (transaction) => {
      const familyRef = doc(this.firestore.db, AbstractFamilyService.rootKey, familyId);
      const family = await transaction.get(familyRef);
      if (!family.exists()) throw ReferenceError('Family ID is incorrect');
      await transaction.update(familyRef, { memberIds: arrayUnion(memberUid) });
      const memberRef = doc(this.firestore.db, this.rootKey, memberId);
      await transaction.update(memberRef, { familyId });
    });
  }

  update$(id: string, data: Partial<Member>): Observable<void> {
    return this.firestore.update$(this.rootKey, id, data);
  }

  delete$(id: string): Observable<void> {
    return this.firestore.delete$(this.rootKey, id);
  }

  get$(id: string): Observable<Member> {
    return this.firestore.get$<MemberWithId>(this.rootKey, id).pipe(
      map((value) => {
        if (!value) throw ReferenceError('Member not found.');
        return value;
      }),
    );
  }

  getFamilyMembers$(familyId: string): Observable<MemberWithId[]> {
    return this.firestore.query$(this.rootKey, where('familyId', '==', familyId)).pipe(
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
