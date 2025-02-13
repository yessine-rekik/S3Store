import 'dotenv/config';
import logger from '../utils/logger';

const requiredEnvVars = [
  'PORT',
  'MONGODB_URI',
  'ACCESS_TOKEN_SECRET',
  'REFRESH_TOKEN_SECRET',
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
  PORT: process.env.PORT || 4001,
  MONGODB_URI: process.env.MONGODB_URI || '',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '',
};
