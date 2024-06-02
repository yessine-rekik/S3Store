import config, { checkEnvVars } from './config';
checkEnvVars();
import app from './app';
import('./config/database');

app.listen(config.PORT, () => {
  console.log(`🚀 Server listening on PORT: ${config.PORT}`);
});
