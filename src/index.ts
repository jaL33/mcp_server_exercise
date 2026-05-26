import express, { Request, Response, NextFunction } from 'express';
import config from './config';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFound';
import { logger } from './tools/logger';

const app = express();

app.use(express.json());

app.use('/api', routes);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    app: config.appName,
    status: 'running'
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(config.port, () => {
  logger.info(`${config.appName} listening on port ${config.port}`);
});

process.on('SIGINT', () => {
  logger.info('Graceful shutdown requested.');
  server.close(() => {
    logger.info('Server stopped.');
    process.exit(0);
  });
});
