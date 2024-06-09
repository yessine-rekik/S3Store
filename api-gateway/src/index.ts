import config, { checkEnvVars } from './config';
checkEnvVars();
import app from './app';
import logger from './utils/logger';

app.listen(config.PORT, () => {
  logger.info(`🚀 Api Gateway is listening on PORT: ${config.PORT}`);
});
