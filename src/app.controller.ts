import { Router } from 'express';
import { AppService } from './app.service';

export function createAppRouter(appService = new AppService()) {
  const router = Router();

  router.get('/', (_, res) => {
    res.send(appService.getHello());
  });

  router.get('/api/health', (_, res) => {
    res.json({
      status: 'ok',
    });
  });

  return router;
}
