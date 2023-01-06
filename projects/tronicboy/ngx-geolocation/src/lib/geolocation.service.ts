import { Injectable, Optional } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

export class GeolocationSettings {
  /**
   * Google Maps API key is required to display map in LocationComponent.
   * https://developers.google.com/maps/documentation/javascript/get-api-key
   */
  googleMapsAPIKey = '';
}

export type LocationArray = [
  /** Latitude */
  number,
  /** Longitude */
  number,
  /** Altitude */
  number | null
];

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private googleMapsAPIKey?: string;
  constructor(
    private sanitizer: DomSanitizer,
    @Optional() private config: GeolocationSettings | null
  ) {
    if (config) {
      this.googleMapsAPIKey = config.googleMapsAPIKey;
    }
  }

  public aquireLocation(cache = false): Observable<LocationArray> {
    return new Observable<LocationArray>((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next([
            position.coords.latitude,
            position.coords.longitude,
            position.coords.altitude,
          ]);
          observer.complete();
        },
        (error) => {
          console.error('Geolocation Error: ', error);
          observer.error(error);
        },
        { enableHighAccuracy: true, maximumAge: cache ? Infinity : 0 }
      );
    });
  }

  public getGoogleMapsURL<T extends { location?: LocationArray }>(
    target: T
  ): SafeResourceUrl | undefined {
    if (!(target.location && this.googleMapsAPIKey)) return undefined;
    const url = new URL('https://www.google.com/maps/embed/v1/place');
    url.searchParams.set('key', this.googleMapsAPIKey);
    url.searchParams.set(
      'center',
      `${target.location[0]},${target.location[1]}`
    );
    url.searchParams.set('q', `${target.location[0]},${target.location[1]}`);
    url.searchParams.set('zoom', '19');
    url.searchParams.set('language', 'ja');
    url.searchParams.set('maptype', 'satellite');
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.toString());
  }
}
