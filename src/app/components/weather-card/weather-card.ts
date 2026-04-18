import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../models/weather.models';

@Component({
  selector: 'app-weather-card',
  imports: [CommonModule],
  templateUrl: './weather-card.html',
  styleUrls: ['./weather-card.css']
})
export class WeatherCardComponent {
  @Input() weatherData: WeatherData | null = null;
  @Input() loading: boolean = false;
  @Input() error: string | null = null;

  // Propriétés calculées pour le data binding
  get temperature(): string {
    return this.weatherData ? `${Math.round(this.weatherData.main.temp)}°C` : '--';
  }

  get feelsLike(): string {
    return this.weatherData ? `${Math.round(this.weatherData.main.feels_like)}°C` : '--';
  }

  get humidity(): string {
    return this.weatherData ? `${this.weatherData.main.humidity}%` : '--';
  }

  get windSpeed(): string {
    return this.weatherData ? `${this.weatherData.wind.speed} m/s` : '--';
  }

  get pressure(): string {
    return this.weatherData ? `${this.weatherData.main.pressure} hPa` : '--';
  }

  get description(): string {
    return this.weatherData ? this.weatherData.weather[0].description : '--';
  }

  get cityName(): string {
    return this.weatherData ? this.weatherData.name : '--';
  }

  get iconUrl(): string {
    if (!this.weatherData) return '';
    return `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`;
  }
}
