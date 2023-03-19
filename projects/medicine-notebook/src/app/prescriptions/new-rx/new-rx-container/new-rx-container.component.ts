import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { RxFormMode } from '../../rx-form/rx-form.component';

@Component({
  selector: 'rx-new-rx-container',
  templateUrl: './new-rx-container.component.html',
  styleUrls: ['./new-rx-container.component.css'],
})
export class NewRxContainerComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly RxFormMode = RxFormMode;
  readonly memberId$ = this.route.parent!.parent!.parent!.params.pipe(map((params) => params['memberId'] as string));
  readonly rxId = this.route.snapshot.queryParams['rxId'] as string | undefined;

  close() {
    this.router.navigate([''], { relativeTo: this.route.parent });
  }
}
