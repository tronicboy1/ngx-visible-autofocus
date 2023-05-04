import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';

@Component({
  selector: 'base-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css', '../../../styles/index.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input('modal-title') modalTitle?: string;
  readonly fadeOut$ = signal(false);
  readonly show$ = signal<boolean | undefined | null>(false);
  @Input() set show(value: boolean | undefined | null) {
    if (value) {
      this.show$.set(value);
      return;
    }
    if (!this.show$()) return;
    this.fadeOut$.set(true);
    setTimeout(() =>
      Promise.all(
        document.getAnimations().map((animation) => animation.finished)
      ).finally(() => {
        this.show$.set(false);
        this.fadeOut$.set(false);
      })
    );
  }
  @Output('modal-closed') closeModal = new EventEmitter<void>();

  stopPropagation: EventListener = (event) => event.stopPropagation();
}
