import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import authRouter from './routers/auth.router';
import { logApiInfo } from './middlewares/logApiInfo';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(logApiInfo);

app.use(authRouter);

app.use(errorHandler);

export default app;
