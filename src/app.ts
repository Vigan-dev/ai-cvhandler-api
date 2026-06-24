import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import { config } from './config';
import { createApiRouter } from './routes';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: config.corsOrigin,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use(createApiRouter());

  app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  const errorHandler: ErrorRequestHandler = (error, _, res, __) => {
    console.error(error);

    const statusCode =
      typeof error === 'object' &&
      error !== null &&
      'statusCode' in error &&
      typeof error.statusCode === 'number'
        ? error.statusCode
        : 500;

    res.status(statusCode).json({
      message:
        statusCode < 500 && error instanceof Error
          ? error.message
          : 'Internal server error',
    });
  };

  app.use(errorHandler);

  return app;
}
