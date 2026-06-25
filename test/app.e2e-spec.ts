import request from 'supertest';
import { createApp } from '../src/app';

describe('Express app (e2e)', () => {
  const app = createApp();

  it('GET / returns the local architecture contract', async () => {
    const response = await request(app)
      .get('/')
      .expect('X-Content-Type-Options', 'nosniff')
      .expect(200);

    expect(readBody(response.body)).toEqual({
      name: 'cv-handler-local-server',
      architecture: 'browser-local',
      persistence: 'localStorage',
      message: 'CV processing and candidate storage run in the browser.',
    });
    expect(response.headers['x-request-id']).toBeDefined();
  });

  it('GET /api/health returns health metadata', async () => {
    const response = await request(app).get('/api/health').expect(200);
    const body = readBody(response.body);

    expect(body.status).toBe('ok');
    expect(body.service).toBe('cv-handler-local-server');
    expect(body.architecture).toBe('browser-local');
    expect(body.persistence).toBe('localStorage');
  });

  it('returns a structured 404 response', async () => {
    const response = await request(app).get('/missing').expect(404);
    const body = readBody(response.body);

    expect(body.message).toBe('Route not found');
    expect(body.path).toBe('/missing');
    expect(typeof body.requestId).toBe('string');
  });

  it('returns a structured 400 response for invalid JSON', async () => {
    const response = await request(app)
      .post('/api/health')
      .set('Content-Type', 'application/json')
      .send('{"invalid"')
      .expect(400);
    const body = readBody(response.body);

    expect(body.message).toBe('Invalid JSON request body');
    expect(typeof body.requestId).toBe('string');
  });

  it('rejects an unapproved browser origin', async () => {
    const response = await request(app)
      .get('/api/health')
      .set('Origin', 'https://unapproved.example')
      .expect(403);
    const body = readBody(response.body);

    expect(body.message).toBe('Origin is not allowed by CORS');
    expect(typeof body.requestId).toBe('string');
  });
});

function readBody(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error('Expected a JSON object response');
  }
  return value as Record<string, unknown>;
}
