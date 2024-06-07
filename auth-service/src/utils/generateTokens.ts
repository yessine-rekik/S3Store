import jwt from 'jsonwebtoken';
import config from '../config';

export function genereateAccessToken(id: string) {
  return jwt.sign({ id }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: '1m',
  });
}

export function genereateRefreshToken(id: string) {
  return jwt.sign({ id }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
}
