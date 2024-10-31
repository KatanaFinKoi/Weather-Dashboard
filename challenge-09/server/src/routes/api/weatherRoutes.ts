import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';


router.post('/', (req, res) => {
  let weather = WeatherService.getWeatherForCity(req.body.city)
  HistoryService.addCity(req.body.city);
  res.json(weather);
  console.log(weather);
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  let cities = HistoryService.getCities();
  res.json(cities);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  HistoryService.removeCity(req.params.id);
  res.send('City removed');
});

export default router;
