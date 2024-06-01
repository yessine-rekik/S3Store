import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userService from '../services/user.service';
import {
  genereateAccessToken,
  genereateRefreshToken,
} from '../utils/generateTokens';
import config from '../config';

export async function refreshTokens(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const oldRefreshToken = req.cookies['refresh-token'];

    if (!oldRefreshToken)
      return res.status(401).send('No refresh token provided');

    res.clearCookie('refresh-token', {
      httpOnly: true,
      secure: config.NODE_ENV === 'dev' ? false : true,
    });

    // the token has already been rotated ==> reuse reuse
    const foundUser = await userService.getUser({
      refreshTokens: oldRefreshToken,
    });

    jwt.verify(
      oldRefreshToken,
      config.REFRESH_TOKEN_SECRET || '',
      async (err: any, decoded: any) => {
        if (err) return res.status(403).send('Invalid Refresh Token');

        // Reuse detected --> delete all existing refresh tokens
        if (!foundUser) {
          await userService.updateUser(decoded.id, { refreshTokens: [] });
          return res
            .status(403)
            .send(
              'Refresh token has already been rotated: Potentially compromised'
            );
        }

        // generate new set of tokens and update DB
        const newRefreshToken = genereateRefreshToken(decoded.id);
        await userService.updateRefreshToken(
          decoded.id,
          oldRefreshToken,
          newRefreshToken
        );

        const accessToken = genereateAccessToken(decoded.id);

        res
          .cookie('refresh-token', newRefreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === 'dev' ? false : true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          })
          .send({
            _id: foundUser._id,
            accessToken,
          });
      }
    );
  } catch (err) {
    next(err);
  }
}
