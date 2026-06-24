import { AppService } from './app.service';

describe('AppService', () => {
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(new AppService().getHello()).toBe('Hello World!');
    });
  });
});
