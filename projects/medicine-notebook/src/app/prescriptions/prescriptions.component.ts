import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { PrescriptionService } from './prescription.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrescriptionsComponent {
  private route = inject(ActivatedRoute);
  private rxService = inject(PrescriptionService);

  readonly rxs$ = this.route.params
    .pipe(map((params) => params['memberId'] as string))
    .pipe(switchMap((memberId) => this.rxService.getByMember$(memberId)));
}
