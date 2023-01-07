import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'base-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css', '../../../styles/index.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input('modal-title') modalTitle?: string;
  readonly fadeOut$ = new BehaviorSubject(false);
  readonly show$ = new BehaviorSubject<boolean | undefined | null>(false);
  @Input() set show(value: boolean | undefined | null) {
    if (value) {
      this.show$.next(value);
      return;
    }
    if (!this.show$.getValue()) return;
    this.fadeOut$.next(true);
    setTimeout(() =>
      Promise.all(
        document.getAnimations().map((animation) => animation.finished)
      ).finally(() => {
        this.show$.next(false);
        this.fadeOut$.next(false);
      })
    );
  }
  @Output('modal-closed') closeModal = new EventEmitter<void>();

  stopPropagation: EventListener = (event) => event.stopPropagation();
}
