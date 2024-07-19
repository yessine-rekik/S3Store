import 'dotenv/config';
import logger from '../utils/logger';

const requiredEnvVars = [
  'PORT',
  'MONGODB_URI',
  'ACCESS_TOKEN_SECRET',
  // 'AWS_ACCESS_KEY_ID',
  // 'AWS_SECRET_ACCESS_KEY',
  // 'AWS_REGION',
  // 'AWS_S3_BUCKET',
];

export function checkEnvVars() {
  const unsetEnvVars = requiredEnvVars.filter(
    (envVar) => !(envVar in process.env)
  );

  if (unsetEnvVars.length > 0) {
    logger.error(
      `Error: Required environment variables are not set:\n${unsetEnvVars.join(
        '\n'
      )}\nThe proccess will exit.`
    );
    process.exit(1);
  }
}

export default {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  PORT: process.env.PORT || 4002,
  MONGODB_URI: process.env.MONGODB_URI || '',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_REGION: process.env.AWS_REGION || 'us-west',
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET || 'fake-bucket',
};
