import { Types } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';

class UserRepository {
  async createUser(userData: Partial<IUser>) {
    return User.create(userData);
  }

  async getUserById(userId: Types.ObjectId) {
    return await User.findById(userId);
  }

  async getUser(userData: Partial<IUser>) {
    return await User.findOne(userData);
  }

  async updateUser(userId: Types.ObjectId, updateData: Partial<IUser>) {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
  }

  async deleteUser(userId: string) {
    return await User.findByIdAndDelete(userId);
  }

  async createRefreshToken(userId: string, token: string) {
    return await User.findByIdAndUpdate(
      userId,
      {
        $push: { refreshTokens: token },
      },
      { new: true }
    );
  }

  async deleteRefreshToken(userId: string, token: string) {
    return await User.findByIdAndUpdate(
      userId,
      {
        $pull: { refreshTokens: token },
      },
      { new: true }
    );
  }

  async updateRefreshToken(userId: string, oldToken: string, newToken: string) {
    return await User.findByIdAndUpdate(
      userId,
      // {
      //   $pull: { refreshTokens: oldToken },
      //   $push: { refreshTokens: newToken },
      // },
      { $set: { 'refreshTokens.$[elem]': newToken } },
      { arrayFilters: [{ elem: oldToken }], new: true }
    );
  }
}

export default new UserRepository();
