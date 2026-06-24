import { Router } from 'express';
import { UsersService } from './users.service';

export function createUsersRouter(usersService = new UsersService()) {
  const router = Router();

  router.get('/', (_, res) => {
    res.json(usersService.getStatus());
  });

  return router;
}
