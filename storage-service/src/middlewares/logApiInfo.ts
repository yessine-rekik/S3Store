import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export function logApiInfo(req: Request, res: Response, next: NextFunction) {
  logger.debug(`Inside ${req.method}: ${req.url}`);

  const url = req.url;
  const start = Date.now();

  res.on('finish', () => {
    const responseTime = Date.now() - start;
    logger.info(
      `${req.method}: ${url} - ${res.statusCode} - ${responseTime} ms`
    );
  });

  next();
}
