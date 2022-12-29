import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ObserverService } from './observer.service';

@Directive({
  selector: '[ngxObservable]',
})
export class NgxObservableDirective implements OnInit, OnDestroy {
  @Input() once?: boolean;
  @Input() customCallback?: () => void;
  @Output('in-view') inView = new EventEmitter<void>();
  private observerService = inject(ObserverService);
  private el = inject(ElementRef);
  private get nativeEl() {
    if (!(this.el.nativeElement instanceof HTMLElement))
      throw TypeError('Must be used with HTMLElement.');
    return this.el.nativeElement;
  }
  private uniqueKey = Symbol('UniqueKey');

  ngOnInit(): void {
    this.observerService.observe(
      this.nativeEl,
      this.uniqueKey,
      this.customCallback ?? (() => this.inView.emit()),
      this.once
    );
  }

  ngOnDestroy(): void {
    this.observerService.unobserve(this.nativeEl, this.uniqueKey);
  }

  static ngTemplateContextGuard(
    directive: NgxObservableDirective,
    context: HTMLElement
  ): context is NgxObservableDirectiveContext {
    return true;
  }
}

interface NgxObservableDirectiveContext extends HTMLElement {
  customCallback?: () => void;
  /** Defaults to false. */
  once?: boolean;
}
