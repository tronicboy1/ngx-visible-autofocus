import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, forkJoin, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { GroupService } from '../../group/group.service';
import { Sex } from '../../group/member-factory';
import { MemberService } from '../../group/member.service';

@Component({
  selector: 'startup-create-member-form',
  templateUrl: './create-member-form.component.html',
  styleUrls: ['./create-member-form.component.css', '../../../styles/basic-form.css'],
})
export class CreateMemberFormComponent {
  private auth = inject(AuthService);
  private group = inject(GroupService);
  private member = inject(MemberService);
  @Output() submitted = new EventEmitter<void>();

  readonly isFirstMember$ = this.auth.getUid().pipe(
    switchMap((uid) => this.group.getGroupByUid$(uid)),
    map((group) => group && !group.memberIds.length),
  );
  readonly Sex = Sex;
  readonly currentDate = new Date().toISOString().split('T')[0];
  readonly loading$ = signal(false);
  formGroup = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(1), Validators.maxLength(255)],
      nonNullable: true,
    }),
    dob: new FormControl(new Date('1990/1/2').toISOString().split('T')[0], {
      validators: [Validators.required],
      nonNullable: true,
    }),
    weight: new FormControl(60, { nonNullable: true }),
    sex: new FormControl(Sex.Q, { nonNullable: true, validators: [Validators.required] }),
    sendInvite: new FormControl(false, { nonNullable: true }),
    email: new FormControl(null, { nonNullable: false, validators: [Validators.email] }),
  });

  handleSubmit() {
    if (this.loading$()) return;
    const { name, dob, weight, sex, sendInvite, email } = this.formGroup.value;
    if (!(name && dob && weight && sex)) return;
    if (sendInvite && !email) throw ReferenceError('must have email if inviting');
    this.loading$.set(true);
    const dobNumber = new Date(dob).getTime();
    this.auth
      .getUid()
      .pipe(
        first(),
        switchMap((uid) =>
          forkJoin([
            this.group.getGroupByUid$(uid),
            this.isFirstMember$.pipe(first()),
            this.auth.getAuthState().pipe(first()),
          ]),
        ),
        mergeMap(([group, isFirstMember, authState]) => {
          if (!group) throw Error('no group found');
          const data = { name: name.trim(), dob: dobNumber, weight, sex, groupId: group.id };
          switch (true) {
            case isFirstMember:
              return this.member
                .create$({ ...data, uid: authState!.uid, email: authState!.email! })
                .pipe(withLatestFrom(of(group)));
            default:
              return this.member.create$(data).pipe(withLatestFrom(of(group)));
          }
        }),
        tap(([memberId, group]) => {
          if (!(sendInvite && email)) return;
          this.group.sendInvite(email, group.id, memberId);
        }),
      )
      .subscribe({
        next: () => {
          this.member.refresh();
          this.submitted.emit();
        },
        error: () => this.loading$.set(false),
      });
  }
}
