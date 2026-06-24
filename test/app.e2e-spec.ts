import request from 'supertest';
import { createApp } from '../src/app';

describe('Express app (e2e)', () => {
  it('/ (GET)', () => {
    return request(createApp()).get('/').expect(200).expect('Hello World!');
  });
});
