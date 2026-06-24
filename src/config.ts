try {
  process.loadEnvFile();
} catch (error) {
  const isMissingFile =
    error instanceof Error &&
    'code' in error &&
    error.code === 'ENOENT';

  if (!isMissingFile) {
    throw error;
  }
}

export const config = {
  port: Number(process.env.PORT ?? 3001),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
};
