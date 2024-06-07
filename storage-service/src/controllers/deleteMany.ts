import { Request, Response, NextFunction } from 'express';
import { s3 } from '../config/aws';
import { Types } from 'mongoose';
import config from '../config';
import fileRepository from '../repositories/file.repository';

export async function deleteMany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const ids: string[] = req.body.ids;

    const { Deleted: deletedFiles } = await s3.deleteObjects({
      Bucket: config.AWS_S3_BUCKET,
      Delete: {
        Objects: ids.map((id) => ({ Key: id })),
      },
    });

    const objectIds =
      deletedFiles?.map((file) => new Types.ObjectId(file.Key)) || [];
    await fileRepository.deleteFiles(objectIds);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}
