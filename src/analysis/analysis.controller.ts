import { Router } from 'express';
import { AnalysisService } from './analysis.service';

export function createAnalysisRouter(analysisService = new AnalysisService()) {
  const router = Router();

  router.get('/', (_, res) => {
    res.json(analysisService.getStatus());
  });

  return router;
}
