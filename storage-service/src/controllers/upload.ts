import { NextFunction, Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { putObjectSignedUrl } from '../utils/generateSignedUrl';
import fileRepository from '../repositories/file.repository';

export async function upload(req: Request, res: Response, next: NextFunction) {
  try {
    const { filename, mimetype, size } = req.body;

    const { _id: fileId } = await fileRepository.createFile({
      userId: new Types.ObjectId(req.userId),
      filename,
      mimetype,
      size,
    });

    const signedUrl = await putObjectSignedUrl(fileId.toString());

    res.send({ url: signedUrl });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError)
      return res.status(400).send(err.message);

    next(err);
  }
}
