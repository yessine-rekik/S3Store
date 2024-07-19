import { NextFunction, Request, Response } from 'express';
import fileRepository from '../repositories/file.repository';
import { Types } from 'mongoose';

export async function getUserFiles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userFiles = await fileRepository.getUserFiles(
      new Types.ObjectId(req.userId)
    );
    res.send(userFiles);
  } catch (err) {
    next(err);
  }
}
