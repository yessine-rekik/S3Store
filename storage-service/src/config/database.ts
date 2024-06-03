import mongoose from 'mongoose';
import config from '.';
import logger from '../utils/logger';

const MONGODB_URI = config.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {})
  .then(() => logger.info('DB Connected'))
  .catch((err) => {
    logger.error(
      `Error connecting to the Database: ${err.message}\nProcess will exist.`
    );
    process.exit(1);
  });
