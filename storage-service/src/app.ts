import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { logApiInfo } from './middlewares/logApiInfo';
import storageRouter from './router/sotrage.router';

declare global {
  // eslint-disable-next-line
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const app = express();

app.use(express.json());

app.use(logApiInfo);

app.use(storageRouter);

app.use(errorHandler);

export default app;
