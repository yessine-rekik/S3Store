import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import userRepository from '../repositories/user.repository';

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies['refresh-token'];
    if (!refreshToken) return res.sendStatus(200);

    // Remove the refresh token from the DB
    jwt.verify(
      refreshToken,
      config.REFRESH_TOKEN_SECRET,
      // eslint-disable-next-line
      async (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) return res.sendStatus(200);
        await userRepository.deleteRefreshToken(decoded.id, refreshToken);
      }
    );

    res.clearCookie('refresh-token', {
      httpOnly: true,
      secure: config.NODE_ENV === 'dev' ? false : true,
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}
