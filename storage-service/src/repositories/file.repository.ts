import { Types } from 'mongoose';
import { IFile } from '../interfaces/file.interface';
import File from '../models/file.model';

class FileRepository {
  async createFile(fileData: Partial<IFile>) {
    return File.create(fileData);
  }

  // async getFileById(fileId: Types.ObjectId) {
  //   return await File.findById(fileId);
  // }

  // async updateFile(fileId: Types.ObjectId, fileData: Partial<IFile>) {
  //   return await File.findByIdAndUpdate(fileId, fileData);
  // }

  // async getFile(fileData: Partial<IFile>) {
  //   return await File.findOne(fileData);
  // }

  async deleteFile(fileId: Types.ObjectId) {
    return await File.findByIdAndDelete(fileId);
  }

  async deleteFiles(filesIds: Types.ObjectId[]) {
    return await File.deleteMany({ _id: { $in: filesIds } });
  }

  async getUserFiles(userId: Types.ObjectId) {
    return await File.find({ userId });
  }
}

export default new FileRepository();
