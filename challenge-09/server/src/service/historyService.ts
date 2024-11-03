// TODO: Define a City class with name and id properties
import fs from 'fs';
class City {
  constructor(public name: string, public id: string) {}
}

class HistoryService {
  private async read() {
    return JSON.parse(await fs.promises.readFile('db/searchHistory.json', 'utf-8'));
  }
  
  private async write(cities: City[]) {
    await fs.promises.writeFile('db/searchHistory.json', JSON.stringify(cities, null, 2));
  }

  async getCities() {
    let cities = await this.read();
    return cities;
  }

  async addCity(city: string) {
    let cities = await this.getCities();
    let id = cities.length.toString();
    cities.push(new City(city, id));
    await this.write(cities);
  }

  async removeCity(id: string) {
    let cities = await this.getCities();
    cities = cities.filter((city: City) => city.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();
