import { Router } from 'express';
import { UploadsService } from './uploads.service';

export function createUploadsRouter(uploadsService = new UploadsService()) {
  const router = Router();

  router.get('/', (_, res) => {
    res.json(uploadsService.getStatus());
  });

  return router;
}
