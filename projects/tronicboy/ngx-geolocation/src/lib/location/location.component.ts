import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { catchError, finalize } from 'rxjs';
import { GeolocationService, LocationArray } from '../geolocation.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent implements OnInit {
  @Input() googleMapsURL?: SafeResourceUrl;
  public locationError = signal(false);
  public showMap = signal(false);
  public loading = signal(false);

  @Output() location = new EventEmitter<LocationArray>();

  constructor(private geolocationService: GeolocationService) {}

  ngOnInit(): void {}

  public toggleMap = (force?: boolean) => this.showMap.set(force ?? !this.showMap());
  public handleLocationClick() {
    this.loading.set(true);
    this.locationError.set(false);
    this.geolocationService
      .aquireLocation()
      .pipe(
        catchError((err, caught) => {
          this.locationError.set(true);
          throw err;
        }),
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe({ next: (location) => this.location.emit(location) });
  }

  public handleLocationFormSubmit(location: LocationArray) {
    this.locationError.set(false);
    this.location.emit(location);
  }
}
