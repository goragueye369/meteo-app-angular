import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  
  constructor() {}

  getCurrentPosition(): Observable<GeolocationPosition> {
    if (!navigator.geolocation) {
      return of(this.getDefaultPosition());
    }

    return new Observable<GeolocationPosition>((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position);
          observer.complete();
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          observer.next(this.getDefaultPosition());
          observer.complete();
        }
      );
    });
  }

  watchPosition(): Observable<GeolocationPosition> {
    if (!navigator.geolocation) {
      return of(this.getDefaultPosition());
    }

    return new Observable<GeolocationPosition>((observer) => {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          observer.next(position);
        },
        (error) => {
          console.error('Erreur de suivi de position:', error);
          observer.next(this.getDefaultPosition());
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    });
  }

  private getDefaultPosition(): GeolocationPosition {
    return {
      coords: {
        latitude: 48.8566, // Paris par défaut
        longitude: 2.3522,
        accuracy: 1000,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: Date.now()
    };
  }

  reverseGeocode(lat: number, lon: number): Observable<string> {
    return new Observable<string>((observer) => {
      // Utilisation de l'API Nominatim pour la géolocalisation inversée
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=fr`;
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data && data.address) {
            const address = data.address;
            const city = address.city || address.town || address.village || 'Localisation inconnue';
            const country = address.country || '';
            observer.next(`${city}${country ? ', ' + country : ''}`);
          } else {
            observer.next('Localisation inconnue');
          }
          observer.complete();
        })
        .catch(error => {
          console.error('Erreur de géolocalisation inversée:', error);
          observer.next('Localisation inconnue');
          observer.complete();
        });
    });
  }

  async requestLocationPermission(): Promise<boolean> {
    if (!navigator.permissions) {
      return true;
    }

    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      return result.state === 'granted';
    } catch (error) {
      console.error('Erreur de vérification des permissions:', error);
      return false;
    }
  }
}

export interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}
