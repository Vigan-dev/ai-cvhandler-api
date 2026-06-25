export class AppService {
  getInfo() {
    return {
      name: 'cv-handler-local-server',
      architecture: 'browser-local',
      persistence: 'localStorage',
      message: 'CV processing and candidate storage run in the browser.',
    } as const;
  }

  getHealth() {
    return {
      status: 'ok',
      service: 'cv-handler-local-server',
      architecture: 'browser-local',
      persistence: 'localStorage',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    } as const;
  }
}
