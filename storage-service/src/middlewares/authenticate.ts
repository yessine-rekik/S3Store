import jwt from 'jsonwebtoken';
import config from '../config';
import { Request, Response, NextFunction } from 'express';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }

  const token = authHeader.replace('Bearer ', '');

  jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401);

    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      typeof decoded.id === 'string'
    )
      req.userId = decoded.id;
    else {
      return next(Error('Could not retreive the field `id` from the token.'));
    }

    next();
  });
}
