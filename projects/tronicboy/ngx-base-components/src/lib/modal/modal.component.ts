import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'base-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css', '../../../styles/index.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input('modal-title') modalTitle?: string;
  @Input() show: boolean | undefined | null = true;
  @Output('close-modal') closeModal = new EventEmitter<void>();

  stopPropagation: EventListener = (event) => event.stopPropagation();
}
