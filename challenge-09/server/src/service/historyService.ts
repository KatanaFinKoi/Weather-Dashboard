// TODO: Define a City class with name and id properties
import fs from 'fs';
class City {
  constructor(public name: string, public id: string) {}
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    return JSON.parse(await fs.promises.readFile('db/searchHistory.json', 'utf-8'));
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    await fs.promises.writeFile('db/searchHistory.json', JSON.stringify(cities, null, 2));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    let cities = await this.read();
    return cities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    let cities = await this.getCities();
    let id = cities.length.toString();
    cities.push(new City(city, id));
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    let cities = await this.getCities();
    cities = cities.filter((city: City) => city.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();
