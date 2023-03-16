import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { BehaviorSubject, first, mergeMap } from 'rxjs';
import { GroupService } from '../../group/group.service';

@Component({
  selector: 'startup-create-group-form',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.css', '../../../styles/basic-form.css'],
})
export class CreateGroupFormComponent {
  private auth = inject(AuthService);
  private group = inject(GroupService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly loading$ = new BehaviorSubject(false);
  formGroup = new FormGroup({
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(1), Validators.maxLength(255)],
      nonNullable: true,
    }),
  });

  handleSubmit() {
    if (this.loading$.value) return;
    const { lastName } = this.formGroup.value;
    if (!lastName) return;
    this.loading$.next(true);
    this.auth
      .getUid()
      .pipe(
        first(),
        mergeMap((uid) => this.group.create$({ lastName: lastName.trim(), owner: uid })),
      )
      .subscribe({
        next: () => this.router.navigate(['members'], { relativeTo: this.route }),
        complete: () => this.loading$.next(false),
      });
  }
}
