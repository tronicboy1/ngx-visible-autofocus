import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { BehaviorSubject, first, map, mergeMap, withLatestFrom } from 'rxjs';
import { UseMode } from '../../group/group-factory';
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

  readonly useMode$ = this.route.queryParams.pipe(map((params) => Number(params['useMode'])));
  readonly labelText$ = this.useMode$.pipe(
    map((useMode) =>
      useMode === UseMode.Group
        ? $localize`グループ名を入力してください。家族なら苗字でいかが？`
        : $localize`苗字を教えてください`,
    ),
  );
  readonly loading$ = new BehaviorSubject(false);
  formGroup = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(1), Validators.maxLength(255)],
      nonNullable: true,
    }),
  });

  handleSubmit() {
    if (this.loading$.value) return;
    const { name } = this.formGroup.value;
    if (!name) return;
    this.loading$.next(true);
    this.auth
      .getUid()
      .pipe(
        first(),
        withLatestFrom(this.useMode$),
        mergeMap(([uid, useMode]) => this.group.create$({ name: name.trim(), owner: uid, useMode })),
      )
      .subscribe({
        next: (groupId) =>
          this.router.navigate(['members'], { relativeTo: this.route.parent, queryParams: { groupId } }),
        complete: () => this.loading$.next(false),
      });
  }
}
