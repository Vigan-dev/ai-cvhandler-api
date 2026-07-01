loadEnvironmentFile();

export const config = {
  port: parsePort(process.env.PORT),
  corsOrigins: parseOrigins(process.env.CORS_ORIGIN),
  bodyLimit: '1mb',
  rateLimit: {
    windowMs: parsePositiveInteger(
      process.env.RATE_LIMIT_WINDOW_MS,
      60_000,
      'RATE_LIMIT_WINDOW_MS',
    ),
    maxRequests: parsePositiveInteger(
      process.env.RATE_LIMIT_MAX_REQUESTS,
      120,
      'RATE_LIMIT_MAX_REQUESTS',
    ),
  },
  shutdownTimeoutMs: 10_000,
} as const;

function loadEnvironmentFile() {
  try {
    process.loadEnvFile();
  } catch (error) {
    if (!isMissingFileError(error)) throw error;
  }
}

function isMissingFileError(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'ENOENT'
  );
}

function parsePort(value: string | undefined) {
  const port = Number(value ?? 3001);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }
  return port;
}

function parseOrigins(value: string | undefined) {
  const origins = (value ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.length === 0) {
    throw new Error('CORS_ORIGIN must include at least one origin');
  }

  return origins;
}

function parsePositiveInteger(
  value: string | undefined,
  fallback: number,
  name: string,
) {
  const parsed = Number(value ?? fallback);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${name} must be a positive integer`);
  }
  return parsed;
}
