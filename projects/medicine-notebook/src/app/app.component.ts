import { Component, inject } from '@angular/core';
import { MedicineDbService } from './medicine-db/medicine-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'medicine-notebook';
  private medicineDbService = inject(MedicineDbService);
}
