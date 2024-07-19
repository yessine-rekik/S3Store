import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Types } from 'mongoose';
import config from './config';
import app from './app';

export const agent = supertest.agent(app);
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  config.ACCESS_TOKEN_SECRET = 'AZERTY';
  config.MONGODB_URI = mongoServer.getUri();

  await mongoose.connect(config.MONGODB_URI);
});

beforeEach(() => {
  // Bypass the authentication middleware
  const accessToken = genereateAccessToken(new Types.ObjectId().toString());
  agent.set('authorization', `Bearer ${accessToken}`);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

function genereateAccessToken(id: string) {
  return jwt.sign({ id }, config.ACCESS_TOKEN_SECRET || '', {
    expiresIn: '5s',
  });
}
