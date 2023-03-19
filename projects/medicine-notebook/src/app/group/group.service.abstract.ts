import { Observable } from 'rxjs';
import { Group, GroupWithId } from './group-factory';

export abstract class AbstractGroupService {
  static rootKey = 'groups';
  protected rootKey = AbstractGroupService.rootKey;

  abstract create$(data: Group): Observable<string>;

  abstract get$(id: string): Observable<GroupWithId>;

  /**
   * Gets the user's group based off owner or memberids
   */
  abstract getGroupByUid$(uid: string): Observable<GroupWithId | undefined>;

  abstract update$(id: string, data: Partial<Group>): Observable<any>;

  abstract delete$(id: string): Observable<void>;
}
