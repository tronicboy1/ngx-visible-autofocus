import type { Observable, Subject } from 'rxjs';

/**
 * Caches a Subject used to trigger the next page associated with the component (this) provided in watchAll.
 * Used to ensure that multiple watchAll pagination observables are independant of one another.
 */
export type SubjectCache = WeakMap<any, Subject<void>>;

export abstract class PaginatedService<T extends Array<any> = any[]> {
  protected nextPageSubjectCache = new WeakMap() as SubjectCache;
  protected refreshSubjectCache = new WeakMap() as SubjectCache;
  /**
   * Watch multiple entities with pagination.
   * Hot until end of pagination.
   */
  abstract watchAll$(component: Object, ...args: any[]): Observable<T>;

  /**
   * Resets Pagination with optional search parameters.
   * @param component key (component) to retrieve Search Subject from WeakMap
   */
  abstract setSearch?(component: Object, ...args: any[]): void;

  /**
   * Triggers next page loading. Use when page end comes into view.
   * @param component component provided in watchAll in a weak map with a subject to trigger
   */
  public triggerNextPage(component: Object) {
    const nextPage$ = this.nextPageSubjectCache.get(component);
    if (!nextPage$) throw ReferenceError('next page subject not in cache.');
    nextPage$.next();
  }

  /**
   * Use to refresh pagination.
   * Resets pagination to page 1.
   * @param component key (component) to retrieve refreshSubject from WeakMap
   */
  public clearPaginationCache(component: Object) {
    const refresh$ = this.refreshSubjectCache.get(component);
    if (!refresh$) throw ReferenceError('Refresh subject not in cache.');
    refresh$.next();
  }
}
