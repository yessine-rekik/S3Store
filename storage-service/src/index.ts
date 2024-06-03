import config, { checkEnvVars } from './config';
checkEnvVars();
import app from './app';
import logger from './utils/logger';
import('./config/database');

app.listen(config.PORT, () => {
  logger.info(`🚀 Server is listening on PORT : ${config.PORT}`);
});
