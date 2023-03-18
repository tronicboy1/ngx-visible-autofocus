import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { Member, MemberArrayFields, Sex } from '../../group/member-factory';
import { MemberService } from '../../group/member.service';
import { MedicineDbService } from '../../medicine-db/medicine-db.service';

type OnlyArrayControls<T extends Object> = { [K in keyof T]: T[K] extends FormArray<any> ? T[K] : never };

enum EditTabMode {
  BasicInfo = 1,
  DetailedInfo,
}

@Component({
  selector: 'startup-edit-member-form',
  templateUrl: './edit-member-form.component.html',
  styleUrls: ['./edit-member-form.component.css', '../../../styles/basic-form.css'],
})
export class EditMemberFormComponent implements OnInit, OnDestroy {
  private member = inject(MemberService);
  private medicineDb = inject(MedicineDbService);
  @Input() memberId!: string;
  @Output() submitted = new EventEmitter<void>();

  private teardown$ = new Subject<void>();
  readonly Sex = Sex;
  readonly loading$ = new BehaviorSubject(false);
  readonly mode$ = new BehaviorSubject(EditTabMode.BasicInfo);
  readonly EditTabMode = EditTabMode;
  readonly currentDate = new Date().toISOString().split('T')[0];
  readonly arrayFieldKeys: { key: keyof MemberArrayFields; name: string; selections?: {}[] }[] = [
    //{ key: 'diseaseHistory', name: $localize`病歴` },
    { key: 'sideEffectHistory', name: $localize`副作用歴` },
    { key: 'foodAllergies', name: $localize`食物アレルギー` },
    { key: 'medicineAllergies', name: $localize`薬物アレルギー` },
    { key: 'otherAllergies', name: $localize`その他のアレルギー` },
    { key: 'medicalInstitutions', name: $localize`通院中の医療機関` },
    { key: 'pharmacies', name: $localize`通院中の薬局` },
  ];
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
    medicineAllergies: new FormArray<FormControl<string>>([], [Validators.maxLength(255)]),
    foodAllergies: new FormArray<FormControl<string>>([], [Validators.maxLength(255)]),
    otherAllergies: new FormArray<FormControl<string>>([], [Validators.maxLength(255)]),
    sideEffectHistory: new FormArray<FormControl<string>>([], [Validators.maxLength(255)]),
    diseaseHistory: new FormArray<FormControl<string>>([], [Validators.maxLength(255)]),
    pharmacies: new FormArray<FormControl<string>>([], [Validators.maxLength(255)]),
    medicalInstitutions: new FormArray<FormControl<string>>([], [Validators.maxLength(255)]),
  });

  ngOnInit(): void {
    this.member.get$(this.memberId).subscribe((member) => {
      this.formGroup.controls.name.setValue(member.name);
      this.formGroup.controls.dob.setValue(new Date(member.dob).toISOString().split('T')[0]);
      this.formGroup.controls.sex.setValue(member.sex);
      this.formGroup.controls.weight.setValue(member.weight);
      this.arrayFieldKeys.forEach(({ key }) =>
        member[key].forEach((value) => {
          const control = this.addFormControl(key);
          control.setValue(value);
        }),
      );
    });
  }

  ngOnDestroy(): void {
    this.teardown$.next();
  }

  addFormControl(controlName: keyof MemberArrayFields) {
    const formControl = new FormControl('', { nonNullable: true, validators: [Validators.required] });
    this.formGroup.controls[controlName].push(formControl);
    return formControl;
  }

  changeMode(mode: EditTabMode) {
    this.mode$.next(mode);
  }

  handleSubmit() {
    if (this.loading$.value) return;
    const {
      name,
      dob,
      weight,
      sex,
      medicineAllergies,
      medicalInstitutions,
      foodAllergies,
      otherAllergies,
      sideEffectHistory,
      diseaseHistory,
      pharmacies,
    } = this.formGroup.value!;
    this.loading$.next(true);
    const dobNumber = new Date(dob!).getTime();
    this.member
      .update$(this.memberId, {
        name: name!.trim(),
        dob: dobNumber,
        weight,
        sex,
        medicineAllergies,
        medicalInstitutions,
        foodAllergies,
        otherAllergies,
        sideEffectHistory,
        diseaseHistory,
        pharmacies,
      })
      .subscribe({
        next: () => this.submitted.emit(),
        error: () => this.loading$.next(false),
      });
  }
}
