import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Sex } from '../../group/member-factory';
import { MemberService } from '../../group/member.service';

@Component({
  selector: 'startup-edit-member-form',
  templateUrl: './edit-member-form.component.html',
  styleUrls: ['./edit-member-form.component.css', '../../../styles/basic-form.css'],
})
export class EditMemberFormComponent implements OnInit {
  private member = inject(MemberService);
  @Input() memberId!: string;
  @Output() submitted = new EventEmitter<void>();

  readonly Sex = Sex;
  readonly loading$ = new BehaviorSubject(false);
  readonly currentDate = new Date().toISOString().split('T')[0];
  formGroup = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(1), Validators.maxLength(255)],
      nonNullable: true,
    }),
    dob: new FormControl(new Date('1990-1-2').toISOString().split('T')[0], {
      validators: [Validators.required],
      nonNullable: true,
    }),
    weight: new FormControl(60, { nonNullable: true }),
    sex: new FormControl(Sex.Q, { nonNullable: true, validators: [Validators.required] }),
    sendInvite: new FormControl(false, { nonNullable: true }),
    email: new FormControl(null, { nonNullable: false, validators: [Validators.email] }),
  });

  ngOnInit(): void {
    this.member.get$(this.memberId).subscribe((member) => {
      this.formGroup.controls.name.setValue(member.name);
      this.formGroup.controls.dob.setValue(new Date(member.dob).toISOString().split('T')[0]);
      this.formGroup.controls.sex.setValue(member.sex);
      this.formGroup.controls.weight.setValue(member.weight);
    });
  }

  handleSubmit() {
    if (this.loading$.value) return;
    const { name, dob, weight, sex, sendInvite, email } = this.formGroup.value;
    if (!(name && dob && weight && sex)) return;
    if (sendInvite && !email) throw ReferenceError('must have email if inviting');
    this.loading$.next(true);
    const dobNumber = new Date(dob).getTime();
    this.member
      .update$(this.memberId, {
        name: name.trim(),
        dob: dobNumber,
        weight,
        sex,
      })
      .subscribe({
        next: () => this.submitted.emit(),
        error: () => this.loading$.next(false),
      });
  }
}
