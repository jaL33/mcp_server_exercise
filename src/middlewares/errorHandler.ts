import { Request, Response, NextFunction } from 'express';
import { logger } from '../tools/logger';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  logger.error('Unhandled error', err);

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
}
