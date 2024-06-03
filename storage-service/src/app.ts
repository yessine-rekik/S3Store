import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import storageRouter from './routers/storage.router';
import { logApiInfo } from './middlewares/logApiInfo';

const app = express();

app.use(express.json());

app.use(logApiInfo);

app.use(storageRouter);

app.use(errorHandler);

export default app;
