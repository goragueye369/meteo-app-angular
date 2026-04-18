import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData, ForecastData } from '../../models/weather.models';

@Component({
  selector: 'app-simple-weather',
  imports: [CommonModule],
  template: `
    <div>
      <!-- Température avec data binding -->
      <h2>Température: {{ getTemperature() }}°C</h2>
      <p>Ressenti: {{ getFeelsLike() }}°C</p>
      
      <!-- Conditions météo avec data binding -->
      <p>Conditions: {{ getWeatherDescription() }}</p>
      <img [src]="getWeatherIcon()" [alt]="getWeatherDescription()" />
      
      <!-- Prévisions avec data binding -->
      <h3>Prévisions:</h3>
      <div *ngFor="let item of getForecastList()">
        <p>{{ item.dt_txt }}: {{ item.main.temp }}°C - {{ item.weather[0].description }}</p>
      </div>
    </div>
  `,
  styles: []
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

  // Data binding pour les conditions météo
  getWeatherDescription(): string {
    return this.weatherData ? this.weatherData.weather[0].description : '--';
  }

  getWeatherIcon(): string {
    if (!this.weatherData) return '';
    return `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}.png`;
  }

  // Data binding pour les prévisions
  getForecastList(): any[] {
    if (!this.forecastData) return [];
    return this.forecastData.list.slice(0, 5); // 5 premières prévisions
  }
}
