import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
})
export class MenusComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  closeMenus() {
    this.router.navigate([{ outlets: { menus: null } }], { relativeTo: this.route.parent!.parent!.parent! });
  }
}
