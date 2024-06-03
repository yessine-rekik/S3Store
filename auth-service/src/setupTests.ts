import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import config from './config';
import bcrypt from 'bcryptjs';
import userRepository from './repositories/user.repository';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  config.ACCESS_TOKEN_SECRET = 'azerty';
  config.REFRESH_TOKEN_SECRET = 'qwerty';
  config.MONGODB_URI = mongoServer.getUri();

  await mongoose.connect(config.MONGODB_URI);

  await userRepository.createUser({
    username: 'some_username',
    password: await bcrypt.hash('some_password', 10),
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
