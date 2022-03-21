import express from 'express';
import fs from 'fs';

import { synoIndexCallRadarr, synoIndexCallSonarr, synoIndexCallLidarr } from './synoindex'

import { SonarrRequest } from './sonarr-models';
import { RadarrRequest } from './radarr-models';
import { LidarrRequest } from './lidarr-models';

const app = express();
const port = 8000;


const dir = './logs';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/sonarr', (req, res) => {
  const request = req.body as SonarrRequest;
  console.log(`[${new Date().toISOString()}] POST /sonarr ${JSON.stringify(request)}`)
  try {
    synoIndexCallSonarr(request)
  } catch (err) {
    console.error("Failed calling synoindex", err);
    throw err;
  }
  res.send('Ok')
});

app.post('/radarr', (req, res) => {
  const request = req.body as RadarrRequest;
  console.log(`[${new Date().toISOString()}] POST /radarr ${JSON.stringify(request)}`)
  try {
    synoIndexCallRadarr(request)
  } catch (err) {
    console.error("Failed calling synoindex", err);
    throw err;
  }
  res.send('Ok')
})

app.post('/lidarr', (req, res) => {
  const request = req.body as LidarrRequest;
  console.log(`[${new Date().toISOString()}] POST /lidarr ${JSON.stringify(request)}`)
  try {
    synoIndexCallLidarr(request)
  } catch (err) {
    console.error("Failed calling synoindex", err);
    throw err;
  }
  res.send('Ok')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
});