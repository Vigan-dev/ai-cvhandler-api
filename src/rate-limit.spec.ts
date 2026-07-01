import express from 'express';
import request from 'supertest';
import { createRateLimitMiddleware } from './rate-limit';

describe('rate limit middleware', () => {
  it('sets rate limit headers and allows requests within the window', async () => {
    const app = createLimitedApp();

    const response = await request(app).get('/api/health').expect(200);

    expect(response.headers['ratelimit-limit']).toBe('2');
    expect(response.headers['ratelimit-remaining']).toBe('1');
    expect(response.headers['ratelimit-reset']).toBeDefined();
  });

  it('returns 429 after the client exceeds the configured limit', async () => {
    const app = createLimitedApp();

    await request(app).get('/api/health').expect(200);
    await request(app).get('/api/health').expect(200);
    const response = await request(app).get('/api/health').expect(429);

    expect(response.headers['retry-after']).toBe('60');
    expect(response.body).toEqual({
      message: 'Too many requests. Try again later.',
      requestId: 'test-request-id',
    });
  });

  it('opens a new request window after the reset time passes', async () => {
    let currentTime = 0;
    const app = createLimitedApp(() => currentTime);

    await request(app).get('/api/health').expect(200);
    await request(app).get('/api/health').expect(200);
    await request(app).get('/api/health').expect(429);

    currentTime = 60_000;

    await request(app).get('/api/health').expect(200);
  });
});

function createLimitedApp(now: () => number = () => 0) {
  const app = express();

  app.use((_req, res, next) => {
    res.locals.requestId = 'test-request-id';
    next();
  });
  app.use(
    createRateLimitMiddleware({
      windowMs: 60_000,
      maxRequests: 2,
      now,
    }),
  );
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  return app;
}
