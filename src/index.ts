import express from 'express';
import logger from './logger';

import { synoIndexCallRadarr, synoIndexCallSonarr, synoIndexCallLidarr } from './synoindex';

import { SonarrRequest } from './sonarr-models';
import { RadarrRequest } from './radarr-models';
import { LidarrRequest } from './lidarr-models';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/sonarr', (req, res) => {
  const request = req.body as SonarrRequest;
  logger.info(`POST /sonarr ${JSON.stringify(request)}`);
  try {
    synoIndexCallSonarr(request);
  } catch (err) {
    logger.error('Failed calling synoindex', err);
    throw err;
  }
  res.send('Ok');
});

app.post('/radarr', (req, res) => {
  const request = req.body as RadarrRequest;
  logger.info(`POST /radarr ${JSON.stringify(request)}`);
  try {
    synoIndexCallRadarr(request);
  } catch (err) {
    logger.error('Failed calling synoindex', err);
    throw err;
  }
  res.send('Ok');
});

app.post('/lidarr', (req, res) => {
  const request = req.body as LidarrRequest;
  logger.info(`POST /lidarr ${JSON.stringify(request)}`);
  try {
    synoIndexCallLidarr(request);
  } catch (err) {
    logger.error('Failed calling synoindex', err);
    throw err;
  }
  res.send('Ok');
});

app.listen(port, () => {
  logger.info(`App listening on port ${port}!`);
});
