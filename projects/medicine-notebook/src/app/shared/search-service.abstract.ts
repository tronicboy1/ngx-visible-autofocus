import { Observable } from 'rxjs';

export abstract class AbstractSearchService<T extends { name: string }> {
  abstract search$(text: string): Observable<T[]>;
}
