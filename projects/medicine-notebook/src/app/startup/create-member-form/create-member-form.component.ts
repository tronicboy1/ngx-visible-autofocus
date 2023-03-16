import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { BehaviorSubject, first, forkJoin, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { FamilyService } from '../../family/family.service';
import { Sex } from '../../family/member-factory';
import { MemberService } from '../../family/member.service';

@Component({
  selector: 'startup-create-member-form',
  templateUrl: './create-member-form.component.html',
  styleUrls: ['./create-member-form.component.css', '../../../styles/basic-form.css'],
})
export class CreateMemberFormComponent {
  private auth = inject(AuthService);
  private family = inject(FamilyService);
  private member = inject(MemberService);
  @Output() submitted = new EventEmitter<void>();

  readonly isFirstMember$ = this.auth.getUid().pipe(
    switchMap((uid) => this.family.getMembersFamily$(uid)),
    map((family) => family && family.memberIds.length === 0),
  );
  readonly Sex = Sex;
  readonly currentDate = new Date().toISOString().split('T')[0];
  readonly loading$ = new BehaviorSubject(false);
  formGroup = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(1), Validators.maxLength(255)],
      nonNullable: true,
    }),
    dob: new FormControl('1990-1-1', { validators: [Validators.required], nonNullable: true }),
    weight: new FormControl(60, { nonNullable: true }),
    sex: new FormControl(Sex.Q, { nonNullable: true, validators: [Validators.required] }),
    sendInvite: new FormControl(false, { nonNullable: true }),
    email: new FormControl(null, { nonNullable: false, validators: [Validators.email] }),
  });

  handleSubmit() {
    if (this.loading$.value) return;
    const { name, dob, weight, sex, sendInvite, email } = this.formGroup.value;
    if (!(name && dob && weight && sex)) return;
    if (sendInvite && !email) throw ReferenceError('must have email if inviting');
    this.loading$.next(true);
    const dobNumber = new Date(dob).getTime();
    console.log(email);
    this.auth
      .getUid()
      .pipe(
        first(),
        switchMap((uid) =>
          forkJoin([
            this.family.getMembersFamily$(uid),
            this.isFirstMember$.pipe(first()),
            this.auth.getAuthState().pipe(first()),
          ]),
        ),
        mergeMap(([family, isFirstMember, authState]) => {
          if (!family) throw Error('no family found');
          const data = { name: name.trim(), dob: dobNumber, sex, familyId: family.id };
          switch (true) {
            case isFirstMember:
              return this.member
                .create$({ ...data, uid: authState!.uid, email: authState!.email! })
                .pipe(withLatestFrom(of(family)));
            default:
              return this.member.create$(data).pipe(withLatestFrom(of(family)));
          }
        }),
        tap(([ref, family]) => {
          if (!(sendInvite && email)) return;
          this.family.sendInvite(email, family.id, ref.id as any);
        }),
      )
      .subscribe({
        next: () => this.submitted.emit(),
        complete: () => this.loading$.next(false),
      });
  }
}
