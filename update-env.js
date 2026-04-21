const fs = require('fs');
const path = require('path');

// Lire le fichier .env.local
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

// Extraire la clé API
const apiKey = envContent.match(/OPENWEATHER_API_KEY=(.+)/)?.[1];

if (!apiKey) {
  console.error('Clé API non trouvée dans .env.local');
  process.exit(1);
}

// Mettre à jour le fichier environment.ts
const envTsPath = path.join(__dirname, 'src', 'environments', 'environment.ts');
const envTsContent = `export const environment = {
  production: false,
  openWeatherMapApiKey: '${apiKey}'
};`;

fs.writeFileSync(envTsPath, envTsContent);
console.log('Clé API mise à jour dans environment.ts');
