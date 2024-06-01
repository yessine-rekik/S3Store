import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err.message);
  res.status(500).send(err.message);
}
