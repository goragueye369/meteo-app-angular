import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData, ForecastData } from '../../models/weather.models';

@Component({
  selector: 'app-simple-weather',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="weather-container">
      <!-- Carte météo principale -->
      <div class="weather-card" *ngIf="weatherData">
        <div class="weather-header">
          <h2 class="city-name">{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
          <p class="weather-date">{{ getCurrentDate() }}</p>
        </div>
        
        <div class="weather-main">
          <div class="weather-icon-section">
            <img [src]="getWeatherIcon()" [alt]="getWeatherDescription()" class="weather-icon" />
            <p class="weather-description">{{ getWeatherDescription() }}</p>
          </div>
          
          <div class="temperature-section">
            <div class="temperature-main">
              <span class="temp-value">{{ getTemperature() }}°</span>
              <span class="temp-unit">C</span>
            </div>
            <p class="temp-feels">Ressenti: {{ getFeelsLike() }}°C</p>
          </div>
        </div>
        
        <div class="weather-details">
          <div class="detail-item">
            <span class="detail-icon">💧</span>
            <span class="detail-value">{{ weatherData.main.humidity }}%</span>
            <span class="detail-label">Humidité</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon">💨</span>
            <span class="detail-value">{{ weatherData.wind.speed }} m/s</span>
            <span class="detail-label">Vent</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon">🌡️</span>
            <span class="detail-value">{{ weatherData.main.pressure }} hPa</span>
            <span class="detail-label">Pression</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon">👁️</span>
            <span class="detail-value">{{ (weatherData.visibility || 10000) / 1000 | number:'1.1' }} km</span>
            <span class="detail-label">Visibilité</span>
          </div>
        </div>
        
        <div class="sun-times">
          <div class="sun-item">
            <span class="sun-icon">🌅</span>
            <span class="sun-time">{{ getSunTime(weatherData.sys.sunrise || 0) }}</span>
            <span class="sun-label">Lever</span>
          </div>
          <div class="sun-item">
            <span class="sun-icon">🌇</span>
            <span class="sun-time">{{ getSunTime(weatherData.sys.sunset || 0) }}</span>
            <span class="sun-label">Coucher</span>
          </div>
        </div>
      </div>
      
      <!-- Prévisions -->
      <div class="forecast-section" *ngIf="forecastData && forecastData.list">
        <h3 class="forecast-title">📅 Prévisions</h3>
        <div class="forecast-grid">
          <div class="forecast-card" *ngFor="let item of getForecastList()">
            <div class="forecast-time">{{ getForecastTime(item.dt) }}</div>
            <img [src]="getForecastIcon(item)" [alt]="item.weather[0].description" class="forecast-icon" />
            <div class="forecast-temp">{{ round(item.main.temp) }}°C</div>
            <div class="forecast-desc">{{ item.weather[0].description }}</div>
          </div>
        </div>
      </div>
      
      <!-- Prévisions à long terme -->
      <div class="long-term-forecast" *ngIf="forecastData && forecastData.list">
        <h3 class="forecast-title">📊 Prévisions 5 jours</h3>
        <div class="long-term-grid">
          <div class="long-term-card" *ngFor="let item of getLongTermForecast()">
            <div class="long-term-day">{{ getDayName(item.dt) }}</div>
            <img [src]="getForecastIcon(item)" [alt]="item.weather[0].description" class="long-term-icon" />
            <div class="long-term-temp-range">
              <span class="temp-max">{{ round(item.main.temp_max) }}°</span>
              <span class="temp-min">{{ round(item.main.temp_min) }}°</span>
            </div>
            <div class="long-term-desc">{{ item.weather[0].description }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./simple-weather.css']
})
export class SimpleWeatherComponent implements OnChanges {
  @Input() weatherData: WeatherData | null = null;
  @Input() forecastData: ForecastData | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  // Détection des changements de données
  ngOnChanges(changes: SimpleChanges) {
    // Forcer la détection des changements
    this.cdr.detectChanges();
  }

  // Méthodes utilitaires pour l'affichage
  getCurrentDate(): string {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getSunTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getForecastTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getDayName(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString('fr-FR', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  }

  getForecastIcon(item: any): string {
    return `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
  }

  // Data binding pour la température
  getTemperature(): string {
    return this.weatherData ? Math.round(this.weatherData.main.temp).toString() : '--';
  }

  getFeelsLike(): string {
    return this.weatherData ? Math.round(this.weatherData.main.feels_like).toString() : '--';
  }

  // Data binding pour les conditions météo
  getWeatherDescription(): string {
    return this.weatherData ? this.weatherData.weather[0].description : '--';
  }

  getWeatherIcon(): string {
    if (!this.weatherData) return '';
    return `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`;
  }

  // Méthode utilitaire pour arrondir les nombres
  round(value: number): number {
    return Math.round(value);
  }

  // Data binding pour les prévisions
  getForecastList(): any[] {
    if (!this.forecastData) return [];
    return this.forecastData.list.slice(0, 8); // 8 premières prévisions (24h)
  }

  getLongTermForecast(): any[] {
    if (!this.forecastData) return [];
    // Prendre une prévision par jour (tous les 8 items = 24h)
    return this.forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 5);
  }
}
