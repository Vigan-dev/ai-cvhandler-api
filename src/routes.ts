import { Router } from 'express';
import { createAppRouter } from './app.controller';

export function createApiRouter() {
  const router = Router();

  router.use('/', createAppRouter());

  return router;
}
