import { randomUUID } from 'node:crypto';
import cors from 'cors';
import express, {
  type ErrorRequestHandler,
  type RequestHandler,
} from 'express';
import { config } from './config';
import { getErrorResponse, HttpError } from './errors';
import { createApiRouter } from './routes';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(createRequestContext());
  app.use(createSecurityHeaders());
  app.use(
    cors({
      credentials: true,
      origin(origin, callback) {
        if (!origin || config.corsOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(new HttpError(403, 'Origin is not allowed by CORS'));
      },
    }),
  );
  app.use(express.json({ limit: config.bodyLimit }));

  app.use(createApiRouter());

  app.use((req, res) => {
    res.status(404).json({
      message: 'Route not found',
      path: req.path,
      requestId: res.locals.requestId as string,
    });
  });

  const errorHandler: ErrorRequestHandler = (
    error: unknown,
    _req,
    res,
    next,
  ) => {
    void next;
    const response = getErrorResponse(error);

    if (response.statusCode >= 500) {
      console.error(error);
    }

    res.status(response.statusCode).json({
      message: response.message,
      requestId: res.locals.requestId as string,
    });
  };

  app.use(errorHandler);

  return app;
}

function createRequestContext(): RequestHandler {
  return (_req, res, next) => {
    const requestId = randomUUID();
    res.locals.requestId = requestId;
    res.setHeader('X-Request-Id', requestId);
    next();
  };
}

function createSecurityHeaders(): RequestHandler {
  return (_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'none'; frame-ancestors 'none'",
    );
    next();
  };
}
