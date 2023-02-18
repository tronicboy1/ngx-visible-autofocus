import { ElementRef } from '@angular/core';
import { SubmitOnModifierEnterDirective } from './submit-on-modifier-enter.directive';

describe('SubmitOnModifierEnterDirective', () => {
  let directive: SubmitOnModifierEnterDirective;

  beforeEach(() => {
    const elementRefSpy = jasmine.createSpyObj<ElementRef<HTMLFormElement>>('ElementRef<HTMLFormElement>', [], {
      nativeElement: document.createElement('form'),
    });
    directive = new SubmitOnModifierEnterDirective(elementRefSpy);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
