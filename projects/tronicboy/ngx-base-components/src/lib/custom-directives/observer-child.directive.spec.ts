import { ElementRef } from '@angular/core';
import { ObserverChildDirective } from './observer-child.directive';

describe('ObserverChildDirective', () => {
  let directive: ObserverChildDirective;

  beforeEach(() => {
    const elementRefSpy = jasmine.createSpyObj<ElementRef<HTMLElement>>('ElementRef<HTMLFormElement>', [], {
      nativeElement: document.createElement('div'),
    });
    directive = new ObserverChildDirective(elementRefSpy);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
