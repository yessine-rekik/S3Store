import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { logApiInfo } from './middlewares/logApiInfo';
import { createProxyMiddleware } from 'http-proxy-middleware';
import config from './config';

const app = express();

app.use(logApiInfo);

app.use(errorHandler);

app.use(
  '/api/auth',
  createProxyMiddleware({
    target: config.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api/auth': '', // remove base path
    },
  })
);

app.use(
  '/api/storage',
  createProxyMiddleware({
    target: config.STORAGE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api/sotrage': '',
    },
  })
);

export default app;
