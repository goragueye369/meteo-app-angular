# 🌤️ Météo Sénégal - Application Angular

Une application météo moderne et élégante développée avec Angular 17 pour afficher les prévisions météorologiques en temps réel pour les villes du Sénégal.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-FF6900?style=for-the-badge&logo=openweathermap&logoColor=white)

## 📋 Table des matières

- [🎯 Objectif](#-objectif)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies utilisées](#️-technologies-utilisées)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🏃‍♂️ Démarrage](#️-démarrage)
- [📱 Utilisation](#-utilisation)
- [🏗️ Architecture du projet](#️-architecture-du-projet)
- [🔧 API OpenWeatherMap](#-api-openweathermap)
- [🎨 Design et UI](#-design-et-ui)
- [🧪 Tests](#-tests)
- [📦 Build et déploiement](#-build-et-déploiement)
- [🤝 Contribution](#-contribution)
- [📄 Licence](#-licence)

## 🎯 Objectif

Concevoir une application Angular qui consomme l'API OpenWeatherMap pour afficher les prévisions météorologiques en temps réel pour une ville donnée au Sénégal, avec une interface utilisateur moderne et responsive.

## ✨ Fonctionnalités

### 🌡️ Données météo complètes
- **Température actuelle** avec ressenti
- **Conditions météo** détaillées
- **Prévisions à court terme** (24-48h)
- **Prévisions à long terme** (5 jours)
- **Données atmosphériques** (pression, humidité, vent)
- **Lever/coucher du soleil**

### 🎨 Interface utilisateur moderne
- **Design élégant** avec dégradés et animations
- **Interface responsive** pour mobile et desktop
- **Recherche intuitive** avec suggestions
- **Villes populaires** du Sénégal en un clic
- **États de chargement** et messages d'erreur
- **Mode sombre** automatique

### ⚡ Fonctionnalités avancées
- **Data binding** bidirectionnel
- **Gestion des erreurs** complète
- **Validation des entrées**
- **Cache des données**
- **Animations fluides**
- **Accessibilité** améliorée

## 🛠️ Technologies utilisées

- **Frontend** : Angular 17, TypeScript 5.3
- **UI/UX** : CSS3 moderne, animations, gradients
- **API** : OpenWeatherMap REST API
- **Build** : Angular CLI, Vite
- **Déploiement** : GitHub Pages (optionnel)

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- Angular CLI 21+
- npm ou yarn

### Cloner le projet
```bash
git clone https://github.com/votre-username/meteo-app-angular.git
cd meteo-app-angular/meteo-app
```

### Installer les dépendances
```bash
npm install
```

## ⚙️ Configuration

### 1. Clé API OpenWeatherMap
1. Créez un compte sur [OpenWeatherMap](https://openweathermap.org/api)
2. Obtenez votre clé API gratuite
3. Créez un fichier `.env.local` à la racine :

```env
OPENWEATHER_API_KEY=votre_clé_api_ici
```

### 2. Configuration du service
La clé API est automatiquement chargée depuis le fichier `.env.local` et utilisée dans le service météo.

## 🏃‍♂️ Démarrage

### Serveur de développement
```bash
ng serve
```

L'application sera disponible sur `http://localhost:4200/`

### Build de production
```bash
ng build --configuration production
```

## 📱 Utilisation

### Recherche météo
1. **Recherche manuelle** : Entrez le nom d'une ville
2. **Villes populaires** : Cliquez sur une ville prédéfinie
3. **Soumettre** : Appuyez sur Entrée ou cliquez sur "Rechercher"

### Données affichées
- 📍 **Localisation** : Nom de la ville et coordonnées
- 🌡️ **Température** : Actuelle, min/max, ressenti
- 🌤️ **Conditions** : Description et icône
- 💧 **Humidité** : Pourcentage
- 💨 **Vent** : Vitesse et direction
- ☀️ **Lever/coucher** : Heures locales
- 📊 **Prévisions** : Prochains jours

## 🏗️ Architecture du projet

```
src/
├── app/
│   ├── components/
│   │   ├── weather-display/     # Composant principal
│   │   ├── simple-weather/      # Affichage météo détaillé
│   │   └── weather-map/         # Carte météo interactive
│   ├── services/
│   │   └── weather.service.ts   # Service API météo
│   ├── models/
│   │   └── weather.models.ts    # Modèles de données
│   ├── config/
│   │   └── api.config.ts        # Configuration API
│   ├── app.ts                   # Composant racine
│   └── app.css                  # Styles globaux
├── styles.css                   # Styles de l'application
└── index.html                   # Template HTML
```

### Composants principaux

#### WeatherDisplayComponent
- Gère la recherche et l'affichage principal
- Intègre les états de chargement et d'erreur
- Data binding avec les composants enfants

#### SimpleWeatherComponent
- Affiche les données météo détaillées
- Gère les prévisions court et long terme
- Interface responsive avec animations

#### WeatherService
- Communication avec l'API OpenWeatherMap
- Gestion des erreurs HTTP
- Transformation des données

## 🔧 API OpenWeatherMap

### Endpoints utilisés
- **Current Weather** : `/weather?q={city}&appid={API_KEY}`
- **Forecast** : `/forecast?q={city}&appid={API_KEY}`
- **Geocoding** : `/geo/1.0/direct?q={query}&appid={API_KEY}`

### Paramètres
- `units=metric` : Températures en Celsius
- `lang=fr` : Réponses en français
- `appid` : Clé API authentifiée

### Gestion des erreurs
- **404** : Ville non trouvée
- **401** : Clé API invalide
- **429** : Trop de requêtes
- **Network** : Problème de connexion

## 🎨 Design et UI

### Palette de couleurs
```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
```

### Animations
- **fadeIn** : Apparition en douceur
- **slideIn** : Glissement depuis les côtés
- **pulse** : Effet de pulsation
- **shimmer** : Effet de chargement

### Responsive Design
- **Mobile** : < 480px
- **Tablet** : 480px - 768px  
- **Desktop** : > 768px

## 🧪 Tests

### Tests unitaires
```bash
ng test
```

### Tests e2e
```bash
ng e2e
```

### Tests de composants
```bash
ng test --watch=false --browsers=ChromeHeadless
```

## 📦 Build et déploiement

### Build production
```bash
ng build --configuration production
```

### Déploiement sur GitHub Pages
```bash
ng add @angular/ssr
npm run build
npm run deploy
```

### Variables d'environnement
- `environment.ts` : Développement
- `environment.prod.ts` : Production

## 🤝 Contribution

### Workflow de développement
1. Forker le projet
2. Créer une branche de fonctionnalité
3. Commiter les changements
4. Pousser vers la branche
5. Créer une Pull Request

### Convention de nommage
- **Composants** : PascalCase (WeatherDisplay)
- **Services** : camelCase (weatherService)
- **Fichiers** : kebab-case (weather-display.component.ts)

### Code style
- TypeScript strict
- ESLint configuré
- Prettier pour le formatage

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- **OpenWeatherMap** pour l'API météo
- **Angular Team** pour le framework
- **Communauté** pour les contributions

---

**Développé avec ❤️ pour le peuple sénégalais**

**Contact** : [votre-email@exemple.com](mailto:votre-email@exemple.com)

**Projet** : [GitHub Repository](https://github.com/votre-username/meteo-app-angular)
