import { Types } from 'mongoose';

export interface IFile {
  _id: Types.ObjectId;

  userId: Types.ObjectId;

  filename: string;

  size: number;

  mimetype: string;
}
