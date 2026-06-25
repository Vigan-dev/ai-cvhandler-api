import { Router } from 'express';
import { AppService } from './app.service';

export function createAppRouter(appService = new AppService()) {
  const router = Router();

  router.get('/', (_, res) => {
    res.json(appService.getInfo());
  });

  router.get('/api/health', (_, res) => {
    res.json(appService.getHealth());
  });

  return router;
}
