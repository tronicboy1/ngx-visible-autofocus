import { inject, Injectable } from '@angular/core';
import { where } from 'firebase/firestore';
import { FirestoreService } from 'projects/ngx-firebase-user-platform/src/lib/firestore.service';
import { map, Observable } from 'rxjs';
import { Member, MemberFactory, MemberWithId } from './member-factory';
import { AbstractMemberService } from './member.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class MemberService extends AbstractMemberService {
  private factory = new MemberFactory();
  private firestore = inject(FirestoreService);

  create$(data: Member) {
    const member = this.factory.create(data);
    return this.firestore.create$(this.rootKey, member);
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
        if (results.empty) throw ReferenceError('Invalid Family ID');
        return results.docs.map((doc) => {
          const data = doc.data() as Member;
          return { ...data, id: doc.id };
        });
      }),
    );
  }
}
