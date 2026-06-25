import { AppService } from './app.service';

describe('AppService', () => {
  it('describes the browser-local architecture', () => {
    expect(new AppService().getInfo()).toEqual({
      name: 'cv-handler-local-server',
      architecture: 'browser-local',
      persistence: 'localStorage',
      message: 'CV processing and candidate storage run in the browser.',
    });
  });

  it('returns a healthy service response', () => {
    const health = new AppService().getHealth();

    expect(health.status).toBe('ok');
    expect(health.service).toBe('cv-handler-local-server');
    expect(health.architecture).toBe('browser-local');
    expect(health.persistence).toBe('localStorage');
    expect(typeof health.uptimeSeconds).toBe('number');
    expect(Number.isNaN(Date.parse(health.timestamp))).toBe(false);
  });
});
