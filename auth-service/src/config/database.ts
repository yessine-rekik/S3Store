import mongoose from 'mongoose';
import config from '.';

const MONGODB_URI = config.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log('DB Connected'))
  .catch((err) => {
    console.error(
      `Error connecting to the Database: ${err.message}\nProcess will exist.`
    );
    process.exit(1);
  });
