import express, { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';

import { ENV } from '#src/config/env.js';
import { logger, morganMiddleware } from '#src/middlewares/logger.js';
import { AppError, errorHandler } from '#src/middlewares/error-handler.js';

import mongoose from 'mongoose';
import router from './modules/index.router.js';
import cookieParser from 'cookie-parser';

export const createApp = (): Express => {
  const app = express();

  app.use(helmet());
  app.use(hpp());

  app.use(
    cors({
      origin: ENV.CORS_ORIGIN,
      credentials: true,
    }),
  );
  app.use(cookieParser());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());

  app.use(morganMiddleware);

  mongoose
    .connect(ENV.CONNECTION_STRING)
    .then(() => logger.info('connected to mongodb'))
    .catch(() => logger.error('could not connect'));

  app.use('/api', router);

  app.use((_req, _res, next) => {
    next(new AppError('Route not found', 404));
  });

  app.use(errorHandler);

  return app;
};
