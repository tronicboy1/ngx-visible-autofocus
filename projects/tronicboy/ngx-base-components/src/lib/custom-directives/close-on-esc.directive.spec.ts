import { ElementRef } from '@angular/core';
import { CloseOnEscDirective } from './close-on-esc.directive';

describe('CloseOnEscDirective', () => {
  let directive: CloseOnEscDirective;

  beforeEach(() => {
    const elementRefSpy = jasmine.createSpyObj<ElementRef<HTMLElement>>('ElementRef', [], {
      nativeElement: document.createElement('div'),
    });
    directive = new CloseOnEscDirective(elementRefSpy);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
