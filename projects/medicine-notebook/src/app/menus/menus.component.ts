import { Component } from '@angular/core';
import { RelativeRoutingInheritable } from './relative-routing.inheritable';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
})
export class MenusComponent extends RelativeRoutingInheritable {
  closeMenus() {
    this.router.navigate([{ outlets: { menus: null } }], { relativeTo: this.parentRoute });
  }
}
