import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export abstract class RelativeRoutingInheritable {
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);

  protected closePath = '../../';

  close() {
    this.router.navigate([this.closePath], { relativeTo: this.route });
  }
}
