import { UsersService } from './users.service';

describe('UsersService', () => {
  it('should report ready status', () => {
    expect(new UsersService().getStatus()).toEqual({
      feature: 'users',
      status: 'ready',
    });
  });
});
