import { inject, Injectable } from '@angular/core';
import { limit, where } from 'firebase/firestore';
import { FirestoreService } from 'projects/ngx-firebase-user-platform/src/lib/firestore.service';
import { map } from 'rxjs';
import { TakenAt } from '../prescriptions/prescription-factory';
import { DoseAdministration, DoseAdministrationFactory } from './dose-administration-factory';

@Injectable({
  providedIn: 'root',
})
export class DoseAdministrationService {
  private firestore = inject(FirestoreService);
  private factory = new DoseAdministrationFactory();
  private rootKey = 'dose-administrations';

  create$(memberId: string, rxId: string, takenAt: TakenAt) {
    return this.firestore.create$(this.rootKey, this.factory.create$({ memberId, rxId, takenAt }));
  }

  getByRxId$(rxId: string) {
    const qLimit = limit(500);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(new Date().getMonth() - 3);
    const timeLimit = where('completedAt', '>', threeMonthsAgo.getTime());
    const rxIdConstraint = where('rxId', '==', rxId);
    return this.firestore
      .query$<DoseAdministration>(this.rootKey, qLimit, timeLimit, rxIdConstraint)
      .pipe(map((results) => results.docs.map((doc) => doc.data())));
  }

  getByRxIdAndTakeAtTypeForToday$(rxId: string, takenAt: TakenAt) {
    const qLimit = limit(500);
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0);
    const endTime = new Date();
    endTime.setHours(23, 59, 59);
    const startTimeLimit = where('completedAt', '>', startTime.getTime());
    const endTimeLimit = where('completedAt', '<', endTime.getTime());
    const rxIdConstraint = where('rxId', '==', rxId);
    const takenAtConstraint = where('takenAt', '==', takenAt);
    return this.firestore
      .query$<DoseAdministration>(this.rootKey, qLimit, startTimeLimit, endTimeLimit, rxIdConstraint, takenAtConstraint)
      .pipe(map((results) => results.docs.map((doc) => doc.data())));
  }
}
