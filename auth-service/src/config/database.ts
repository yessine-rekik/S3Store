import mongoose from 'mongoose';
import config from '.';
import logger from '../utils/logger';

const MONGODB_URI = config.MONGODB_URI;
let isDatabaseConnected = false;

mongoose
  .connect(MONGODB_URI, { dbName: 'auth' })
  .then(() => {
    logger.info('DB Connected');
    isDatabaseConnected = true;
  })
  .catch((err) => {
    logger.error(
      `Error connecting to the Database: ${err.message}\nProcess will exist.`
    );
    process.exit(1);
  });

mongoose.connection.on('disconnected', () => {
  logger.error('DB Disconnected');
  isDatabaseConnected = false;
});

mongoose.connection.on('reconnected', () => {
  logger.info('DB Reconnected');
  isDatabaseConnected = true;
});

export const getDatabaseSatus = () => {
  return isDatabaseConnected;
};
