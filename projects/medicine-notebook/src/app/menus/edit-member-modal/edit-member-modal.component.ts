import { Component } from '@angular/core';
import { RelativeRoutingInheritable } from '../relative-routing.inheritable';

@Component({
  selector: 'app-edit-member-modal',
  templateUrl: './edit-member-modal.component.html',
  styleUrls: ['./edit-member-modal.component.css'],
})
export class EditMemberModalComponent extends RelativeRoutingInheritable {
  override close() {
    this.router.navigate([{ outlets: { menus: ['menus', 'members'] } }], {
      relativeTo: this.parentRoute?.parent?.parent,
    });
  }
}
