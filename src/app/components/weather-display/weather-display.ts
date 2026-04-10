import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { WeatherData, ForecastData } from '../../models/weather.models';
import { SimpleWeatherComponent } from '../simple-weather/simple-weather';

@Component({
  selector: 'app-weather-display',
  imports: [CommonModule, FormsModule, SimpleWeatherComponent],
  template: `
    <div>
      <!-- Data binding bidirectionnel pour la recherche -->
      <input [(ngModel)]="city" placeholder="Entrez une ville" />
      <button (click)="loadWeather()">Charger météo</button>
      
      <!-- Data binding des données météo -->
      <app-simple-weather 
        [weatherData]="currentWeather"
        [forecastData]="forecast">
      </app-simple-weather>
    </div>
  `,
  styles: []
})
export class WeatherDisplayComponent implements OnInit {
  city: string = 'Dakar';
  currentWeather: WeatherData | null = null;
  forecast: ForecastData | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather() {
    // Data binding pour charger les données
    this.weatherService.getCurrentWeather(this.city).subscribe({
      next: (data: WeatherData) => {
        this.currentWeather = data; // Data binding
      }
    });

    this.weatherService.getForecast(this.city).subscribe({
      next: (data: ForecastData) => {
        this.forecast = data; // Data binding
      }
    });
  }
}
