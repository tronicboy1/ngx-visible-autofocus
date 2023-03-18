import { Directive, ElementRef, inject, Input, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, fromEvent, map, merge, of, sampleTime, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { MedicineDbService } from '../medicine-db/medicine-db.service';
import { MedicineCandidatesComponent } from './medicine-candidates/medicine-candidates.component';

@Directive({
  selector: '[appMedicineInput]',
})
export class MedicineInputDirective {
  @Input() formControl!: FormControl<string>;
  @Input() name!: string;
  public viewContainerRef = inject(ViewContainerRef);
  private medicineService = inject(MedicineDbService);
  private el = inject(ElementRef);
  private blur$ = fromEvent<FocusEvent>(this.el.nativeElement, 'blur');
  private teardown$ = new Subject<void>();

  ngOnInit(): void {
    merge(this.formControl.valueChanges, this.blur$.pipe(map(() => undefined)))
      .pipe(
        takeUntil(this.teardown$),
        sampleTime(300),
        tap(() => this.viewContainerRef.clear()),
        switchMap((input) =>
          input
            ? this.medicineService.search$(input).pipe(
                filter((results) => Boolean(results.length)),
                switchMap((results) => {
                  const componentRef = this.viewContainerRef.createComponent(MedicineCandidatesComponent);
                  componentRef.instance.medicines = results;
                  return componentRef.instance.candidateClick;
                }),
              )
            : of(),
        ),
      )
      .subscribe((chosenMed) => {
        this.formControl.setValue(chosenMed.name, { emitEvent: false });
        this.viewContainerRef.clear();
      });
  }

  ngOnDestroy(): void {
    this.teardown$.next();
    this.viewContainerRef.clear();
  }
}
