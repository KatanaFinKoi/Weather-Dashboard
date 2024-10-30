import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
// class Weather {}


class WeatherService {
  private city: string = '';
  private baseUrl = process.env.API_BASE_URL!;
  private apiKey = process.env.API_KEY!;

  private async fetchLocationData(query: string) {
    console.log('here is query', query)
    const response = await fetch(query);
    const data = await response.json();
    return data;
  }


  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }


  private buildGeocodeQuery(): string {
    return `${this.baseUrl}/geo/1.0/direct?q=${this.city}&appid=${this.apiKey}`;

  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseUrl}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;

  }


  private async fetchAndDestructureLocationData() {
  // call bulidGeoCodeQuery
  const query = this.buildGeocodeQuery();
  const response = await this.fetchLocationData(query);
  // call fetchLocationData wity query
  console.log("here is the response", response);
    return this.destructureLocationData(response[0]);
  }


  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    const response = await this.fetchLocationData(query);
    return response.list;
  }

  // private parseCurrentWeather(response: any) {}
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  async getWeatherForCity(city: string) {
    this.city = city;
    // call fetchAndDestructureLocationData to return coordinates
    const coordinates = await this.fetchAndDestructureLocationData();
    // call fetchWeatherData with coordinates to return weatherData
    const weatherData = await this.fetchWeatherData(coordinates);
    console.log(weatherData);
  }

}

export default new WeatherService();
