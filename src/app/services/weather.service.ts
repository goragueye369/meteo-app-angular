
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=TON_API_KEY`)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WeatherData, ForecastData, WeatherError } from '../models/weather.models';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly API_KEY = API_CONFIG.OPENWEATHER_API_KEY;
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5';
  
  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<WeatherData> {
    const url = `${this.BASE_URL}/weather?q=${city}&appid=${this.API_KEY}&units=metric&lang=fr`;
    
    return this.http.get<WeatherData>(url).pipe(
      catchError(this.handleError)
    );
  }

  getForecast(city: string): Observable<ForecastData> {
    const url = `${this.BASE_URL}/forecast?q=${city}&appid=${this.API_KEY}&units=metric&lang=fr`;
    
    return this.http.get<ForecastData>(url).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentWeatherByCoords(lat: number, lon: number): Observable<WeatherData> {
    const url = `${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric&lang=fr`;
    
    return this.http.get<WeatherData>(url).pipe(
      catchError(this.handleError)
    );
  }

  getForecastByCoords(lat: number, lon: number): Observable<ForecastData> {
    const url = `${this.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric&lang=fr`;
    
    return this.http.get<ForecastData>(url).pipe(
      catchError(this.handleError)
    );
  }

  searchCities(query: string): Observable<any> {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${this.API_KEY}`;
    
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur client: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      if (error.status === 404) {
        errorMessage = 'Ville non trouvée. Vérifiez le nom de la ville.';
      } else if (error.status === 401) {
        errorMessage = 'Clé API invalide. Vérifiez votre configuration.';
      } else if (error.status === 429) {
        errorMessage = 'Trop de requêtes. Veuillez réessayer plus tard.';
      } else {
        errorMessage = `Erreur serveur: ${error.status} - ${error.message}`;
      }
    }
    
    return throwError(() => errorMessage);
  }
}
