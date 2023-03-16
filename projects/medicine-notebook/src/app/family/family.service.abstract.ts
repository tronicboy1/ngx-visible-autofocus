import { Observable } from 'rxjs';
import { Family, FamilyWithId } from './family-factory';

export abstract class AbstractFamilyService {
  protected rootKey = 'families';

  abstract create$(data: Family): Observable<any>;

  abstract get$(id: string): Observable<FamilyWithId>;

  abstract getMembersFamily$(memberId: string): Observable<Family | undefined>;

  abstract update$(id: string, data: Partial<Family>): Observable<any>;

  abstract delete$(id: string): Observable<void>;
}
