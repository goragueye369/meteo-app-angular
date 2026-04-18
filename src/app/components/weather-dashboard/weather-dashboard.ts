import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { WeatherData, ForecastData } from '../../models/weather.models';
import { WeatherCardComponent } from '../weather-card/weather-card';
import { ForecastCardComponent } from '../forecast-card/forecast-card';

@Component({
  selector: 'app-weather-dashboard',
  imports: [CommonModule, FormsModule, WeatherCardComponent, ForecastCardComponent],
  templateUrl: './weather-dashboard.html',
  styleUrl: './weather-dashboard.css'
})
export class WeatherDashboardComponent implements OnInit {
  // Data binding bidirectionnel pour la recherche
  searchCity: string = 'Dakar';
  
  // États de chargement
  loading: boolean = false;
  error: string | null = null;
  
  // Données météo
  currentWeather: WeatherData | null = null;
  forecast: ForecastData | null = null;
  
  // Historique des recherches
  searchHistory: string[] = [];
  
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    // Charger la météo par défaut au démarrage
    this.searchWeather();
  }

  // Data binding bidirectionnel avec [(ngModel)]
  onCityChange() {
    // Optionnel: recherche automatique quand l'utilisateur tape
    if (this.searchCity.length >= 3) {
      this.searchWeather();
    }
  }

  searchWeather() {
    if (!this.searchCity.trim()) {
      this.error = 'Veuillez entrer un nom de ville';
      return;
    }

    this.loading = true;
    this.error = null;

    // Appeler le service pour la météo actuelle
    this.weatherService.getCurrentWeather(this.searchCity).subscribe({
      next: (data: WeatherData) => {
        this.currentWeather = data;
        this.addToHistory(this.searchCity);
        
        // Charger les prévisions
        this.weatherService.getForecast(this.searchCity).subscribe({
          next: (forecastData: ForecastData) => {
            this.forecast = forecastData;
            this.loading = false;
          },
          error: (err: any) => {
            this.error = `Erreur prévisions: ${err}`;
            this.loading = false;
          }
        });
      },
      error: (err: any) => {
        this.error = `Erreur météo: ${err}`;
        this.loading = false;
      }
    });
  }

  // Utiliser la géolocalisation
  getCurrentLocation() {
    if (navigator.geolocation) {
      this.loading = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          this.weatherService.getCurrentWeatherByCoords(lat, lon).subscribe({
            next: (data: WeatherData) => {
              this.currentWeather = data;
              this.searchCity = data.name;
              this.addToHistory(data.name);
              
              this.weatherService.getForecastByCoords(lat, lon).subscribe({
                next: (forecastData: ForecastData) => {
                  this.forecast = forecastData;
                  this.loading = false;
                },
                error: (err: any) => {
                  this.error = `Erreur prévisions: ${err}`;
                  this.loading = false;
                }
              });
            },
            error: (err: any) => {
              this.error = `Erreur de géolocalisation: ${err}`;
              this.loading = false;
            }
          });
        },
        (err: any) => {
          this.error = `Géolocalisation non autorisée: ${err}`;
          this.loading = false;
        }
      );
    } else {
      this.error = 'La géolocalisation n\'est pas supportée par votre navigateur';
    }
  }

  private addToHistory(city: string) {
    if (!this.searchHistory.includes(city)) {
      this.searchHistory.unshift(city);
      if (this.searchHistory.length > 5) {
        this.searchHistory = this.searchHistory.slice(0, 5);
      }
    }
  }

  selectCityFromHistory(city: string) {
    this.searchCity = city;
    this.searchWeather();
  }

  clearHistory() {
    this.searchHistory = [];
  }
}
