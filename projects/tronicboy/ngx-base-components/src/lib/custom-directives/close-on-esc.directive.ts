import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCloseOnEsc]',
})
export class CloseOnEscDirective {
  get nativeElement() {
    if (!(this.el.nativeElement instanceof HTMLElement)) throw TypeError();
    return this.el.nativeElement as HTMLElement;
  }

  constructor(private el: ElementRef) {}

  @HostListener('keydown.esc')
  handleKeyDown() {
    this.nativeElement.dispatchEvent(new Event('modal-closed', { bubbles: true }));
  }
}
