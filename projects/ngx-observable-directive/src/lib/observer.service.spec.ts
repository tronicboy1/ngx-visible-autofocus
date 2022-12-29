import { TestBed } from '@angular/core/testing';
import { NgxObservableDirectiveModule } from './ngx-observable-directive.module';

import { ObserverService } from './observer.service';

describe('ObserverService', () => {
  let service: ObserverService;
  const rootMargin = '60px 70px 80px 90px';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxObservableDirectiveModule.forRoot({ rootMargin })],
    });
    service = TestBed.inject(ObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('forRoot settings are defined', () => {
    expect(service.observer.rootMargin).toEqual(rootMargin);
  });

  it('Can register new element', () => {
    spyOn(service.observer, 'observe');
    const el = document.createElement('div');
    const key = Symbol('key');
    const callback = () => {};
    service.observe(el, key, callback);
    expect(service.observer.observe).toHaveBeenCalledWith(el);
    expect(el[ObserverService.attributeKey]).toBe(key);
  });
});
