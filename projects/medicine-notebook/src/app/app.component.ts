import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MedicineDbService } from './medicine-db/medicine-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private medicineDbService = inject(MedicineDbService);
  private router = inject(Router);

  ngOnInit() {
    //this.router.events.subscribe(console.log)
  }
  searchInput = new FormControl<string>('', { nonNullable: true });

  searchResult$ = this.searchInput.valueChanges.pipe(switchMap((value) => this.medicineDbService.search$(value)));

  handleClick(value: string) {
    this.searchInput.setValue(value, { emitEvent: false });
  }
}
