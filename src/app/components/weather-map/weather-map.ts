import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../models/weather.models';

@Component({
  selector: 'app-weather-map',
  imports: [CommonModule],
  template: `
    <div class="map-container" *ngIf="weatherData">
      <h3 class="map-title">🗺️ Carte Météo Interactive</h3>
      <div class="map-wrapper">
        <div class="map-background">
          <div class="weather-info-card">
            <div class="location-info">
              <h4>{{ weatherData.name }}, {{ weatherData.sys.country }}</h4>
              <div class="coordinates">
                <span>📍 {{ weatherData.coord.lat.toFixed(2) }}°N, {{ weatherData.coord.lon.toFixed(2) }}°W</span>
              </div>
            </div>
            
            <div class="current-weather-map">
              <div class="weather-icon-large">
                <img [src]="getWeatherIcon()" [alt]="weatherData.weather[0].description" />
              </div>
              <div class="weather-details">
                <div class="temperature-display">
                  <span class="temp-main">{{ formatTemp(weatherData.main.temp) }}</span>
                  <span class="temp-feels">Ressenti: {{ formatTemp(weatherData.main.feels_like) }}</span>
                </div>
                <div class="weather-description">
                  <span class="description-text">{{ weatherData.weather[0].description }}</span>
                  <div class="weather-stats">
                    <span>💧 Humidité: {{ weatherData.main.humidity }}%</span>
                    <span>💨 Pression: {{ weatherData.main.pressure }} hPa</span>
                    <span>🌪 Vent: {{ weatherData.wind.speed }} m/s</span>
                    <span>Visibilité: {{ (weatherData.visibility || 0) / 1000 | number:'1.1' }} km</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="additional-info">
              <div class="sun-times">
                <div class="sun-info">
                  <span>🌅 Lever: {{ getSunTime(weatherData.sys.sunrise) }}</span>
                  <span>🌇 Coucher: {{ getSunTime(weatherData.sys.sunset) }}</span>
                </div>
              </div>
              <div class="atmospheric-data">
                <h5>🌡️ Données Atmosphériques</h5>
                <div class="data-grid">
                  <div class="data-item">
                    <span class="data-label">Temp Min</span>
                    <span class="data-value">{{ formatTemp(weatherData.main.temp_min) }}</span>
                  </div>
                  <div class="data-item">
                    <span class="data-label">Temp Max</span>
                    <span class="data-value">{{ formatTemp(weatherData.main.temp_max) }}</span>
                  </div>
                  <div class="data-item">
                    <span class="data-label">Nuages</span>
                    <span class="data-value">{{ weatherData.clouds.all }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="map-animation">
          <div class="weather-particles">
            <div class="particle" *ngFor="let particle of weatherParticles" 
                 [style]="getParticleStyle(particle)"
                 [@particleAnimation]="particle.animation">
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./weather-map.css']
})
export class WeatherMapComponent implements OnInit, OnChanges {
  @Input() weatherData: WeatherData | null = null;

  weatherParticles: any[] = [];

  ngOnInit() {
    this.generateWeatherParticles();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['weatherData'] && this.weatherData) {
      this.generateWeatherParticles();
    }
  }

  // Méthodes utilitaires pour les calculs
  private round(value: number): number {
    return Math.round(value);
  }

  public formatTemp(temp: number): string {
    return `${this.round(temp)}°C`;
  }

  getWeatherIcon(): string {
    if (!this.weatherData) return '';
    return `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`;
  }

  getSunTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  generateWeatherParticles() {
    this.weatherParticles = [];
    const particleCount = this.getParticleCount();
    
    for (let i = 0; i < particleCount; i++) {
      this.weatherParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2
      });
    }
  }

  getParticleCount(): number {
    if (!this.weatherData) return 20;
    
    const weatherMain = this.weatherData.weather[0].main.toLowerCase();
    switch (weatherMain) {
      case 'rain':
        return 50;
      case 'snow':
        return 40;
      case 'clouds':
        return 30;
      case 'clear':
        return 15;
      case 'thunderstorm':
        return 60;
      default:
        return 25;
    }
  }

  getParticleStyle(particle: any): any {
    return {
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      animationDelay: `${particle.delay}s`,
      animationDuration: `${particle.duration}s`
    };
  }
}
