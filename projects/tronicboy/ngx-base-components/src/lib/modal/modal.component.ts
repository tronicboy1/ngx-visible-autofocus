import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
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
  @HostBinding('class.show') @Input() show: boolean | undefined | null = true;
  @Output('modal-closed') closeModal = new EventEmitter<void>();

  stopPropagation: EventListener = (event) => event.stopPropagation();
}
