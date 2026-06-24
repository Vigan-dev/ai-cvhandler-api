import { createApp } from './app';
import { config } from './config';

async function bootstrap() {
  const app = createApp();
  const server = app.listen(config.port, () => {
    console.log(`Backend API running on http://localhost:${config.port}`);
  });

  async function shutdown(signal: string) {
    console.log(`${signal} received. Shutting down...`);

    server.close(() => {
      process.exit(0);
    });
  }

  process.once('SIGINT', () => void shutdown('SIGINT'));
  process.once('SIGTERM', () => void shutdown('SIGTERM'));
}

bootstrap().catch((error) => {
  console.error('Failed to start the backend:', error);
  process.exit(1);
});
