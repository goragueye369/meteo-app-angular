import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { WeatherData, ForecastData } from '../../models/weather.models';
// import { SimpleWeatherComponent } from '../simple-weather/simple-weather';

@Component({
  selector: 'app-weather-display',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="weather-app">
      <!-- Barre de recherche -->
      <div class="search-bar">
        <input [(ngModel)]="city" placeholder="Entrer une ville" />
        <button (click)="loadWeather()">Rechercher</button>
      </div>

      <!-- Les 3 cartes -->
      <div class="cards" *ngIf="currentWeather">
        <!-- Carte pluie -->
        <div class="card blue">
          <h2>{{ city }}</h2>
          <div class="icon">🌧</div>
          <h1>{{ currentWeather.main.temp }}°</h1>
          <p>Pluie</p>
        </div>

        <!-- Carte orage -->
        <div class="card purple">
          <h2>{{ city }}</h2>
          <div class="icon">⚡</div>
          <h1>{{ currentWeather.main.temp }}°</h1>
          <p>Orage</p>
        </div>

        <!-- Carte soleil -->
        <div class="card light">
          <h2>{{ city }}</h2>
          <div class="icon">☀️</div>
          <h1>{{ currentWeather.main.temp }}°</h1>
          <p>Ensoleillé</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .weather-app {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
        background: #eef2f7;
        min-height: 100vh;
      }

      .search-bar {
        display: flex;
        background: white;
        padding: 10px;
        border-radius: 30px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .search-bar input {
        border: none;
        outline: none;
        padding: 10px;
        border-radius: 30px;
        width: 200px;
      }

      .search-bar button {
        background: linear-gradient(135deg, #4facfe, #00c6ff);
        border: none;
        color: white;
        padding: 10px 15px;
        border-radius: 30px;
        cursor: pointer;
      }

      /* CONTENEUR DES CARTES */
      .cards {
        display: flex;
        gap: 20px;
        margin-top: 40px;
      }

      /* STYLE COMMUN */
      .card {
        width: 200px;
        padding: 20px;
        border-radius: 20px;
        color: white;
        text-align: center;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      }

      .icon {
        font-size: 40px;
        margin: 15px 0;
      }

      /* COULEURS */
      .blue {
        background: linear-gradient(135deg, #4facfe, #00c6ff);
      }

      .purple {
        background: linear-gradient(135deg, #667eea, #764ba2);
      }

      .light {
        background: linear-gradient(135deg, #dfe9f3, #ffffff);
        color: #333;
      }
    `,
  ],
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
      },
    });

    this.weatherService.getForecast(this.city).subscribe({
      next: (data: ForecastData) => {
        this.forecast = data; // Data binding
      },
    });
  }
}
