import { inject, Injectable } from '@angular/core';
import { QueryConstraint, where } from 'firebase/firestore';
import { FirestoreService } from 'projects/ngx-firebase-user-platform/src/lib/firestore.service';
import { forkJoin, map, Observable } from 'rxjs';
import { Family, FamilyFactory, FamilyWithId } from './family-factory';
import { AbstractFamilyService } from './family.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class FamilyService extends AbstractFamilyService {
  private factory = new FamilyFactory();
  private firestoreService = inject(FirestoreService);

  create$(data: Omit<Family, 'createdAt' | 'memberIds' | 'setupCompleted'>) {
    const family = this.factory.create(data);
    return this.firestoreService.create$(this.rootKey, family);
  }

  get$(id: string) {
    return this.firestoreService.get$<FamilyWithId>(this.rootKey, id).pipe(
      map((value) => {
        if (!value) throw ReferenceError('Family not found.');
        return value;
      }),
    );
  }

  getMembersFamily$(memberId: string) {
    return forkJoin([
      this.firestoreService.query$(this.rootKey, where('memberIds', 'array-contains', memberId)),
      this.firestoreService.query$(this.rootKey, where('owner', '==', memberId)),
    ]).pipe(
      map(([memberIdsQuery, ownerQuery]) => {
        const hit = !memberIdsQuery.empty ? memberIdsQuery : !ownerQuery.empty ? ownerQuery : undefined;
        if (!hit) return undefined;
        const familyFound = hit.docs[0];
        const data = familyFound.data() as Family;
        return { ...data, id: familyFound.id };
      }),
    );
  }

  update$(id: string, data: Partial<Family>) {
    return this.firestoreService.update$(this.rootKey, id, data);
  }

  delete$(id: string): Observable<void> {
    return this.firestoreService.delete$(this.rootKey, id);
  }
}
