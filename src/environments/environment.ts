import { config } from 'dotenv';

// Charger les variables d'environnement
config();

export const environment = {
  production: false,
  openWeatherMapApiKey: process.env['OPENWEATHER_API_KEY'] || 'votre_clé_par_défaut'
};