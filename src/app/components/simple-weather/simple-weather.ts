import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData, ForecastData } from '../../models/weather.models';

@Component({
  selector: 'app-simple-weather',
  imports: [CommonModule],
  template: `
    <div class="weather-container">
      <!-- Température actuelle avec icône -->
      <div class="current-weather">
        <h2>Température: {{ getTemperature() }}°C</h2>
        <p>Ressenti: {{ getFeelsLike() }}°C</p>
        <div class="weather-icon">
          <img [src]="getWeatherIcon()" [alt]="getWeatherDescription()" />
          <p>{{ getWeatherDescription() }}</p>
        </div>
      </div>
      
      <!-- Prévisions à court terme (aujourd'hui et demain) -->
      <div class="short-term-forecast">
        <h3>Prévisions à court terme</h3>
        <div class="forecast-grid">
          <div *ngFor="let item of getShortTermForecast()" class="forecast-item">
            <img [src]="getForecastIcon(item)" [alt]="item.weather[0].description" />
            <p class="forecast-time">{{ getForecastTime(item) }}</p>
            <p class="forecast-temp">{{ getFormattedTemp(item.main.temp) }}°C</p>
            <p class="forecast-desc">{{ item.weather[0].description }}</p>
          </div>
        </div>
      </div>
      
      <!-- Prévisions à long terme (5 jours) -->
      <div class="long-term-forecast">
        <h3>Prévisions à long terme</h3>
        <div class="forecast-list">
          <div *ngFor="let item of getLongTermForecast()" class="forecast-day">
            <div class="day-info">
              <p class="day-name">{{ getDayName(item) }}</p>
              <img [src]="getForecastIcon(item)" [alt]="item.weather[0].description" />
              <p class="temp-range">{{ getFormattedTempRange(item.main.temp_min, item.main.temp_max) }}</p>
              <p class="weather-desc">{{ item.weather[0].description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SimpleWeatherComponent {
  @Input() weatherData: WeatherData | null = null;
  @Input() forecastData: ForecastData | null = null;

  // Data binding pour la température
  getTemperature(): string {
    return this.weatherData ? Math.round(this.weatherData.main.temp).toString() : '--';
  }

  getFeelsLike(): string {
    return this.weatherData ? Math.round(this.weatherData.main.feels_like).toString() : '--';
  }

  // Méthodes de formatage pour le template
  getFormattedTemp(temp: number): string {
    return Math.round(temp).toString();
  }

  getFormattedTempRange(min: number, max: number): string {
    return `${Math.round(min)}°C / ${Math.round(max)}°C`;
  }

  // Data binding pour les conditions météo
  getWeatherDescription(): string {
    return this.weatherData ? this.weatherData.weather[0].description : '--';
  }

  getWeatherIcon(): string {
    if (!this.weatherData) return '';
    return `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}.png`;
  }

  // Data binding pour les prévisions à court terme (aujourd'hui et demain)
  getShortTermForecast(): any[] {
    if (!this.forecastData) return [];
    return this.forecastData.list.slice(0, 8); // Aujourd'hui et demain
  }

  // Data binding pour les prévisions à long terme (5 jours)
  getLongTermForecast(): any[] {
    if (!this.forecastData) return [];
    
    // Grouper par jour et prendre une prévision par jour
    const dailyForecasts = this.forecastData.list.reduce((acc: {[key: string]: any}, item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      
      if (!acc[date]) {
        acc[date] = item;
      } else {
        // Garder la prévision avec la température la plus élevée
        if (item.main.temp_max > acc[date].main.temp_max) {
          acc[date] = item;
        }
      }
      
      return acc;
    }, {});

    // Prendre les 5 premiers jours
    return Object.values(dailyForecasts).slice(0, 5);
  }

  // Méthode pour obtenir l'icône de prévision
  getForecastIcon(item: any): string {
    if (!item || !item.weather || !item.weather[0]) return '';
    return `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
  }

  // Méthode pour formater l'heure de prévision
  getForecastTime(item: any): string {
    const date = new Date(item.dt * 1000);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  // Méthode pour obtenir le nom du jour
  getDayName(item: any): string {
    const date = new Date(item.dt * 1000);
    return date.toLocaleDateString('fr-FR', { weekday: 'long' });
  }
}
