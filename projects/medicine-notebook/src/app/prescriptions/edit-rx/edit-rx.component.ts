import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PrescriptionService } from '../prescription.service';
import { NewRxEditStateService } from '../rx-form/new-rx-edit-state.service';
import { RxFormMode } from '../rx-form/rx-form.component';

@Component({
  selector: 'rx-edit-rx',
  templateUrl: './edit-rx.component.html',
  styleUrls: ['./edit-rx.component.css'],
})
export class EditRxComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private rxService = inject(PrescriptionService);
  private rxEditStateService = inject(NewRxEditStateService);

  readonly formMode = RxFormMode.Edit;
  readonly memberId = this.route.snapshot.parent!.parent!.params['memberId'] as string;
  readonly rxId = this.route.snapshot.params['rxId'] as string;
  readonly rx$ = this.rxService.get$(this.rxId);
  readonly showDelete$ = new BehaviorSubject(false);

  close() {
    this.router.navigate(['..', 'prescriptions'], { relativeTo: this.route.parent });
  }

  delete() {
    this.rxService.delete$(this.rxId).subscribe(() => this.close());
  }

  handleChange() {
    this.rxEditStateService.set(this, true);
  }
}
