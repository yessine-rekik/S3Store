import config, { checkEnvVars } from './config';
checkEnvVars();
import app from './app';
import logger from './utils/logger';
import { getDatabaseSatus } from './config/database';

app.get('/healthz', (req, res) => {
  res.sendStatus(200);
});

app.get('/readyz', (req, res) => {
  if (getDatabaseSatus()) return res.sendStatus(200);
  res.sendStatus(500);
});

app.listen(config.PORT, () => {
  logger.info(`🚀 Server is listening on PORT : ${config.PORT}!!!!`);
});
