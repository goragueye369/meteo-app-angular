import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { WeatherService } from './services/weather.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
})
export class App {

  errorMessage: string = '';
  city: string = '';

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.errorMessage = '';
        console.log(data);
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage = "Ville introuvable ❌";
        } else if (error.status === 0) {
          this.errorMessage = "Problème de connexion 🌐";
        } else {
          this.errorMessage = "Erreur inconnue ⚠️";
        }
      }
    });
  }
}
