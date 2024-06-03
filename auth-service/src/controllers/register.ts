import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import userService from '../services/user.service';
import { IUser } from '../interfaces/user.interface';
import {
  genereateAccessToken,
  genereateRefreshToken,
} from '../utils/generateTokens';
import config from '../config';

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user: IUser = req.body;

    const userExists = await userService.getUser({
      username: req.body.username,
    });
    if (userExists) return res.status(409).send('Username already exists');

    user.password = await bcrypt.hash(user.password, 10);

    const createdUser = await userService.createUser(user);

    const refreshToken = genereateRefreshToken(createdUser._id.toString());
    await userService.createRefreshToken(
      createdUser._id.toString(),
      refreshToken
    );

    const accessToken = genereateAccessToken(createdUser._id.toString());

    res
      .cookie('refresh-token', refreshToken, {
        httpOnly: true,
        secure: config.NODE_ENV === 'dev' ? false : true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .send({
        accessToken,
        _id: createdUser._id,
        username: createdUser.username,
      });
  } catch (err) {
    next(err);
  }
}
