import { createApp } from './app';
import { config } from './config';

function bootstrap() {
  const app = createApp();
  const server = app.listen(config.port, () => {
    console.log(`Local server running on http://localhost:${config.port}`);
  });

  server.on('error', (error) => {
    console.error('Failed to start the local server:', error);
    process.exitCode = 1;
  });

  let shuttingDown = false;

  function shutdown(signal: string) {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`${signal} received. Shutting down...`);

    const forceExitTimer = setTimeout(() => {
      console.error('Forced shutdown after timeout');
      process.exit(1);
    }, config.shutdownTimeoutMs);
    forceExitTimer.unref();

    server.close((error) => {
      clearTimeout(forceExitTimer);
      if (error) {
        console.error('Server shutdown failed:', error);
        process.exit(1);
      }
      process.exit(0);
    });
  }

  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap();
