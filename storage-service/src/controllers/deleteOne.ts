import { Request, Response, NextFunction } from 'express';
import { s3 } from '../config/aws';
import { Types } from 'mongoose';
import config from '../config';
import fileRepository from '../repositories/file.repository';

export async function deleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    await s3.deleteObject({ Bucket: config.AWS_S3_BUCKET, Key: id });

    const objectId = new Types.ObjectId(id);
    await fileRepository.deleteFile(objectId);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}
