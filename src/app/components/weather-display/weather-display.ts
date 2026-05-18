import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { WeatherData, ForecastData } from '../../models/weather.models';
import { SimpleWeatherComponent } from '../simple-weather/simple-weather';

@Component({
  selector: 'app-weather-display',
  imports: [CommonModule, FormsModule, SimpleWeatherComponent],
  template: `
    <div class="weather-display">
      <!-- Section de recherche moderne -->
      <section class="search-section">
        <form class="search-form" (ngSubmit)="loadWeather()">
          <h2 class="search-title">🔍 Rechercher une ville</h2>
          
          <div class="search-input-group">
            <input 
              type="text" 
              [(ngModel)]="city" 
              name="city"
              class="search-input" 
              placeholder="Entrez le nom d'une ville au Sénégal..."
              required
              (keyup.enter)="loadWeather()"
            />
            <button type="submit" class="search-button" (click)="loadWeather()">
              <span>🌤️</span>
              <span>Rechercher</span>
            </button>
          </div>
        </form>
        
        <!-- Villes populaires -->
        <div class="popular-cities">
          <h3 class="popular-cities-title">Villes populaires</h3>
          <div class="cities-grid">
            <button class="city-chip" (click)="searchCity('Dakar')">Dakar</button>
            <button class="city-chip" (click)="searchCity('Thiès')">Thiès</button>
            <button class="city-chip" (click)="searchCity('Saint-Louis')">Saint-Louis</button>
            <button class="city-chip" (click)="searchCity('Kaolack')">Kaolack</button>
            <button class="city-chip" (click)="searchCity('Ziguinchor')">Ziguinchor</button>
            <button class="city-chip" (click)="searchCity('Touba')">Touba</button>
          </div>
        </div>
      </section>
      
      <!-- Section de chargement -->
      <section class="loading-section" *ngIf="isLoading">
        <div class="loading-spinner"></div>
        <p class="loading-text">Chargement des données météo...</p>
      </section>
      
      <!-- Section d'erreur -->
      <section class="error-section" *ngIf="error">
        <div class="error-icon">⚠️</div>
        <h3 class="error-title">Erreur de chargement</h3>
        <p class="error-message">{{ error }}</p>
      </section>
      
      <!-- Section des données météo -->
      <app-simple-weather 
        [weatherData]="currentWeather"
        [forecastData]="forecast">
      </app-simple-weather>
    </div>
  `,
  styleUrls: ['./weather-display.css']
})
export class WeatherDisplayComponent implements OnInit {
  city: string = 'Dakar';
  currentWeather: WeatherData | null = null;
  forecast: ForecastData | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather() {
    if (!this.city.trim()) {
      this.error = 'Veuillez entrer un nom de ville valide';
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.currentWeather = null;
    this.forecast = null;

    // Utiliser forkJoin pour charger les deux requêtes en parallèle
    forkJoin({
      weather: this.weatherService.getCurrentWeather(this.city.trim()),
      forecast: this.weatherService.getForecast(this.city.trim())
    }).subscribe({
      next: (results: { weather: WeatherData; forecast: ForecastData }) => {
        this.currentWeather = results.weather;
        this.forecast = results.forecast;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.handleError(err);
        this.isLoading = false;
      }
    });
  }

  searchCity(cityName: string) {
    this.city = cityName;
    this.loadWeather();
  }

  private handleError(error: any) {
    this.isLoading = false;
    
    if (error.status === 404) {
      this.error = `La ville "${this.city}" n'a pas été trouvée. Veuillez vérifier l'orthographe.`;
    } else if (error.status === 401) {
      this.error = 'Erreur de clé API. Veuillez contacter l\'administrateur.';
    } else if (error.status === 0) {
      this.error = 'Erreur de connexion. Veuillez vérifier votre connexion internet.';
    } else {
      this.error = 'Une erreur est survenue lors du chargement des données météo.';
    }
    
    console.error('Weather API Error:', error);
  }
}
