import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {}

// TODO: Complete the WeatherService class
class WeatherService {
  private city: string = '';
  // TODO: Define the baseURL, API key, and city name properties
  private baseUrl = process.env.WEATHER_API_BASE_URL!;
  private apiKey = process.env.WEATHER_API_KEY!;
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(query);
    const data = await response.json();
    return data;

  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseUrl}/geocode/v1/json?q=${this.city}&key=${this.apiKey}`;

  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseUrl}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;

  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
  // call bulidGeoCodeQuery
  const query = this.buildGeocodeQuery();
  const response = await this.fetchLocationData(query);
  // call fetchLocationData wity query
    return this.destructureLocationData(response.results[0].geometry);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.city = city;
    // call fetchAndDestructureLocationData to return coordinates
    const coordinates = await this.fetchAndDestructureLocationData();
    // call fetchWeatherData with coordinates to return weatherData
    const weatherData = await this.fetchWeatherData(coordinates);
    
  }
}

export default new WeatherService();
