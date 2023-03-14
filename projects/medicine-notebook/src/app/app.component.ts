import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseService } from 'projects/ngx-firebase-user-platform/src/lib/firebase.service';
import { switchMap } from 'rxjs';
import { MedicineDbService } from './medicine-db/medicine-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private medicineDbService = inject(MedicineDbService);
  private firebase = inject(FirebaseService)

  searchInput = new FormControl<string>('', { nonNullable: true });

  searchResult$ = this.searchInput.valueChanges.pipe(switchMap((value) => this.medicineDbService.search$(value)));

  handleClick(value: string) {
    this.searchInput.setValue(value, { emitEvent: false });
  }
}
