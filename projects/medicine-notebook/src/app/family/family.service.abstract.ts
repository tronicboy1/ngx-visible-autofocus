import { Observable } from 'rxjs';
import { Family, FamilyWithId } from './family-factory';

export abstract class AbstractFamilyService {
  static rootKey = 'families';
  protected rootKey = AbstractFamilyService.rootKey;

  abstract create$(data: Family): Observable<any>;

  abstract get$(id: string): Observable<FamilyWithId>;

  /**
   * Gets the user's family based off owner or memberids
   */
  abstract getMembersFamily$(memberId: string): Observable<FamilyWithId | undefined>;

  abstract update$(id: string, data: Partial<Family>): Observable<any>;

  abstract delete$(id: string): Observable<void>;
}
