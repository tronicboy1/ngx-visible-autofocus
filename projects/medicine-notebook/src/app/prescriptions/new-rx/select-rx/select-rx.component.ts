import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, shareReplay, switchMap } from 'rxjs';
import { PrescriptionService } from '../../prescription.service';

@Component({
  selector: 'rx-select-rx',
  templateUrl: './select-rx.component.html',
  styleUrls: ['./select-rx.component.css']
})
export class SelectRxComponent {
  private route = inject(ActivatedRoute);
  private rxService = inject(PrescriptionService);

  readonly rxs$ = this.route.parent!.parent!.parent!.params.pipe(
    map((params) => params['memberId'] as string),
    switchMap((memberId) => this.rxService.getByMember$(memberId)),
    shareReplay(1),
  );
}
