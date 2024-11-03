import { Router } from 'express';
const router = Router();

import historyService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';


router.post('/', (req, res) => {
  weatherService.getWeatherForCity(req.body.city)
    .then(weather => {
      historyService.addCity(req.body.city);
      res.json(weather);
      console.log(weather);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to get weather data' });
    });
});

// TODO: GET search history
router.get('/history', (_req, res) => {
  historyService.getCities()
    .then(cities => {
      res.json(cities);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve history' });
    });
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  historyService.removeCity(req.params.id);
  res.send('City removed');
});

export default router;
