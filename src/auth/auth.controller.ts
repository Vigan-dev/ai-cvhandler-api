import { Router } from 'express';
import { AuthService } from './auth.service';

export function createAuthRouter(authService = new AuthService()) {
  const router = Router();

  router.get('/', (_, res) => {
    res.json(authService.getStatus());
  });

  return router;
}
