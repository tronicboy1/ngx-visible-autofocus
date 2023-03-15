import { inject, Injectable } from '@angular/core';
import { FirebaseService } from 'projects/ngx-firebase-user-platform/src/lib/firebase.service';
import { AbstractFamilyService } from './family.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class FamilyService extends AbstractFamilyService {
  private firebaseService = inject(FirebaseService);

}
