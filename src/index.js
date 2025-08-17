import express from 'express';
import { hostname, arch, platform } from 'os';
import process from 'process';

const app = express();

const performHeavyComputation = () => {
  const iterations = 1e9; // 1 billion iterations
  for (let i = 0; i < iterations; i++) {
    Math.sqrt(Math.random());
  }
};

const apiRouter = express.Router();

apiRouter.get('/status', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
  });
});

apiRouter.get('/system-info', (req, res) => {
  res.status(200).json({
    hostname: hostname(),
    platform: platform(),
    architecture: arch(),
    processId: process.pid,
  });
});

apiRouter.get('/compute', (req, res) => {
  const startTime = Date.now();
  performHeavyComputation();
  const durationInMs = Date.now() - startTime;

  res.status(200).json({
    message: 'Heavy computation finished.',
    processId: process.pid,
    durationInMs,
  });
});

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('<h2>Welcome to the Performance Demo Server</h2><p>Try the <code>/api/status</code> or <code>/api/compute</code> endpoints.</p>');
});

export { app };  