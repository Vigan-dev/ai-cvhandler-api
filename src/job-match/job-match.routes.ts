import { Router } from 'express';

export function createJobMatchRouter() {
  const router = Router();

  router.get('/', (_, res) => {
    res.json({ feature: 'job-match', status: 'ready' });
  });

  return router;
}
