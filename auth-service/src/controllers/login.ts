import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user.repository';
import {
  genereateAccessToken,
  genereateRefreshToken,
} from '../utils/generateTokens';
import config from '../config';
import { IUser } from '../interfaces/user.interface';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const user = await userRepository.getUser({ username });

    if (!user) return res.status(401).send({ username: true });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(401).send({ password: true });

    // generate new pair of tokens
    const accessToken = genereateAccessToken(user._id.toString());
    const refreshToken = genereateRefreshToken(user._id.toString());

    await updateTokens(user.toObject(), refreshToken);

    res
      .cookie('refresh-token', refreshToken, {
        httpOnly: true,
        secure: config.NODE_ENV === 'dev' ? false : true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .send({
        accessToken,
        _id: user._id,
        username: user.username,
      });
  } catch (err) {
    next(err);
  }
}

async function updateTokens(user: IUser, refreshToken: string) {
  const validRefreshTokens = user.refreshTokens.filter((token) =>
    jwt.verify(
      token,
      config.REFRESH_TOKEN_SECRET || '',
      (error: jwt.VerifyErrors | null) => {
        if (error) return false;
        return true;
      }
    )
  );
  validRefreshTokens.push(refreshToken);

  await userRepository.updateUser(user._id, {
    refreshTokens: validRefreshTokens,
  });
}
