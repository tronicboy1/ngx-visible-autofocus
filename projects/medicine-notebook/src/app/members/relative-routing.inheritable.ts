import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export abstract class RelativeRoutingInheritable {
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);

  close(route = '../../') {
    this.router.navigate([route], { relativeTo: this.route });
  }
}
