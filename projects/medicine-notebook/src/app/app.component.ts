import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap } from 'rxjs';
import { MedicineDbService } from './medicine-db/medicine-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'medicine-notebook';
  private medicineDbService = inject(MedicineDbService);

  searchInput = new FormControl<string>('', { nonNullable: true });

  searchResult$ = this.searchInput.valueChanges.pipe(switchMap((value) => this.medicineDbService.search$(value)));
}
