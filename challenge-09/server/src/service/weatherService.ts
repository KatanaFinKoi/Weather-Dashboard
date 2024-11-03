import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}


class Weather {
  date: number;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  constructor(date: number, temp: number, feels_like: number, humidity: number, wind_speed: number, description: string) {
    this.date = date;
    this.temp = temp;
    this.feels_like = feels_like;
    this.humidity = humidity;
    this.wind_speed = wind_speed;
    this.description = description;
  }
}


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

  private parseCurrentWeather(response: any) {
    return {
      date: response.dt,
      temp: response.main.temp,
      feels_like: response.main.feels_like,
      humidity: response.main.humidity,
      wind_speed: response.wind.speed,
      description: response.weather[0].description,
    };
  }
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecast = [];
    forecast.push(currentWeather);
    for (let i = 0; i < weatherData.length; i += 8) {
      const data = weatherData[i];
      forecast.push({
        date: data.dt,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        description: data.weather[0].description,
      });
    }
    return forecast;
  }
  async getWeatherForCity(city: string) {
    this.city = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    console.log(weatherData);
    const currentWeather = this.parseCurrentWeather(weatherData[0]);
    this.buildForecastArray(currentWeather, weatherData);
  }

}

export default new WeatherService();
