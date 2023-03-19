import { inject, Injectable } from '@angular/core';
import { where } from 'firebase/firestore';
import { FirestoreService } from 'projects/ngx-firebase-user-platform/src/lib/firestore.service';
import { map, mergeMap, Observable } from 'rxjs';
import { MedicineDbService } from '../medicine-db/medicine-db.service';
import { Prescription, PrescriptionFactory, RxWithId } from './prescription-factory';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionService {
  protected rootKey = 'prescriptions';
  private firestore = inject(FirestoreService);
  private medicine = inject(MedicineDbService);
  private factory = new PrescriptionFactory();

  get$(id: string): Observable<RxWithId> {
    return this.firestore.get$<RxWithId>(this.rootKey, id).pipe(
      map((value) => {
        if (!value) throw ReferenceError('Member not found.');
        return value;
      }),
    );
  }

  getByMember$(memberId: string): Observable<RxWithId[]> {
    const ownedByMember = where('memberId', '==', memberId);
    return this.firestore.query$<Prescription>(this.rootKey, ownedByMember).pipe(
      map((result) => {
        if (result.empty) return [];
        return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      }),
    );
  }

  create$(rx: Omit<Prescription, 'createdAt'>): Observable<string> {
    return this.medicine.search$(rx.medicineName).pipe(
      mergeMap((medicines) => {
        const producedRx = this.factory.create({
          ...rx,
          medicine: medicines.length === 1 ? medicines.at(1) : undefined,
        });
        return this.firestore.create$(this.rootKey, producedRx);
      }),
      map((result) => result.id),
    );
  }
}
