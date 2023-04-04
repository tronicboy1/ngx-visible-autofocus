import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export abstract class RelativeRoutingInheritable {
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);

  protected parentRoute = this.route.parent?.parent?.parent;

  close() {
    this.router.navigate([{ outlets: { menus: null } }], { relativeTo: this.parentRoute?.parent });
  }
}
