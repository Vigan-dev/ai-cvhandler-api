import { Router } from 'express';
import { createAppRouter } from './app.controller';
import { createAiRouter } from './ai/ai.controller';
import { createAnalysisRouter } from './analysis/analysis.controller';
import { createAuthRouter } from './auth/auth.controller';
import { createJobMatchRouter } from './job-match/job-match.routes';
import { createUploadsRouter } from './uploads/uploads.controller';
import { createUsersRouter } from './users/users.routes';

export function createApiRouter() {
  const router = Router();

  router.use('/', createAppRouter());
  router.use('/api/auth', createAuthRouter());
  router.use('/api/users', createUsersRouter());
  router.use('/api/uploads', createUploadsRouter());
  router.use('/api/analysis', createAnalysisRouter());
  router.use('/api/ai', createAiRouter());
  router.use('/api/job-match', createJobMatchRouter());

  return router;
}
