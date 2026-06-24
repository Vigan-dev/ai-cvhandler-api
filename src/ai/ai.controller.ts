import { Router } from 'express';
import { AiService } from './ai.service';

export function createAiRouter(aiService = new AiService()) {
  const router = Router();

  router.get('/test', async (_, res, next) => {
    try {
      const response = await aiService.testOllama();
      res.json({ response });
    } catch (error) {
      next(error);
    }
  });

  return router;
}
