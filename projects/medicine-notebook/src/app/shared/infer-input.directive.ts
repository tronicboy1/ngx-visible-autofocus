import { Directive, ElementRef, inject, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, fromEvent, map, merge, of, sampleTime, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { MedicineDbService } from '../medicine-db/medicine-db.service';
import { CandidatesComponent } from './candidates/candidates.component';
import { AbstractSearchService } from './search-service.abstract';

@Directive()
export abstract class InferInputDirective<T extends { name: string }> implements OnInit, OnDestroy {
  @Input() formControl!: FormControl<string>;
  @Input() name!: string;
  protected abstract searchService: AbstractSearchService<T>;
  private viewContainerRef = inject(ViewContainerRef);
  private medicineService = inject(MedicineDbService);
  private el = inject(ElementRef);
  private blur$ = fromEvent<FocusEvent>(this.el.nativeElement, 'blur');
  private teardown$ = new Subject<void>();

  ngOnInit(): void {
    merge(this.formControl.valueChanges.pipe(sampleTime(300)), this.blur$.pipe(map(() => undefined)))
      .pipe(
        takeUntil(this.teardown$),
        tap(() => this.viewContainerRef.clear()),
        switchMap((input) =>
          input
            ? this.medicineService.search$(input).pipe(
                filter((results) => Boolean(results.length)),
                switchMap((results) => {
                  const componentRef = this.viewContainerRef.createComponent(CandidatesComponent);
                  componentRef.instance.candidates = results;
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
