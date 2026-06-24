import { UploadsService } from './uploads.service';

describe('UploadsService', () => {
  it('should report ready status', () => {
    expect(new UploadsService().getStatus()).toEqual({
      feature: 'uploads',
      status: 'ready',
    });
  });
});
