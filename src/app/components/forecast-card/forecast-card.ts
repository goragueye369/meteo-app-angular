import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastData } from '../../models/weather.models';

@Component({
  selector: 'app-forecast-card',
  imports: [CommonModule],
  templateUrl: './forecast-card.html',
  styleUrl: './forecast-card.css'
})
export class ForecastCardComponent {
  @Input() forecastData: ForecastData | null = null;
  @Input() loading: boolean = false;
  @Input() error: string | null = null;

  // Propriétés calculées pour le data binding
  get cityName(): string {
    return this.forecastData ? this.forecastData.city.name : '--';
  }

  get forecastList(): any[] {
    if (!this.forecastData) return [];
    
    // Grouper par jour et prendre une prévision par jour
    const dailyForecasts = this.forecastData.list.reduce((acc: {[key: string]: any}, item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      
      if (!acc[date]) {
        acc[date] = item;
      }
      
      return acc;
    }, {});

    // Prendre les 5 premiers jours
    return Object.values(dailyForecasts).slice(0, 5);
  }

  getTemperature(item: any): string {
    return item ? `${Math.round(item.main.temp)}°C` : '--';
  }

  getMinTemperature(item: any): string {
    return item ? `${Math.round(item.main.temp_min)}°C` : '--';
  }

  getMaxTemperature(item: any): string {
    return item ? `${Math.round(item.main.temp_max)}°C` : '--';
  }

  getWeatherDescription(item: any): string {
    return item ? item.weather[0].description : '--';
  }

  getIconUrl(item: any): string {
    if (!item) return '';
    return `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
  }

  getDayName(item: any): string {
    if (!item) return '--';
    const date = new Date(item.dt * 1000);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    }
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === tomorrow.toDateString()) {
      return "Demain";
    }
    
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'numeric' });
  }
}
