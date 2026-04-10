import { Component, signal } from '@angular/core';
import { WeatherDisplayComponent } from './components/weather-display/weather-display';

@Component({
  selector: 'app-root',
  imports: [WeatherDisplayComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('meteo-app');
}
