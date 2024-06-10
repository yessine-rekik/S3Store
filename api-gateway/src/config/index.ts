import 'dotenv/config';
import logger from '../utils/logger';

const requiredEnvVars = ['PORT', 'AUTH_SERVICE_URL', 'STORAGE_SERVICE_URL'];

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
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  STORAGE_SERVICE_URL: process.env.STORAGE_SERVICE_URL,
};
