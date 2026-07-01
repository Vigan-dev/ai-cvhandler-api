import type { RequestHandler } from 'express';

type RateLimitOptions = {
  windowMs: number;
  maxRequests: number;
  now?: () => number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

export function createRateLimitMiddleware({
  windowMs,
  maxRequests,
  now = Date.now,
}: RateLimitOptions): RequestHandler {
  const buckets = new Map<string, RateLimitBucket>();
  let nextCleanupAt = now() + windowMs;

  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
      return;
    }

    const currentTime = now();
    if (currentTime >= nextCleanupAt) {
      cleanupExpiredBuckets(buckets, currentTime);
      nextCleanupAt = currentTime + windowMs;
    }

    const clientKey = getClientKey(req);
    const existing = buckets.get(clientKey);
    const bucket =
      existing && existing.resetAt > currentTime
        ? existing
        : { count: 0, resetAt: currentTime + windowMs };

    bucket.count += 1;
    buckets.set(clientKey, bucket);

    const remaining = Math.max(0, maxRequests - bucket.count);
    const resetSeconds = Math.ceil((bucket.resetAt - currentTime) / 1000);

    res.setHeader('RateLimit-Limit', maxRequests.toString());
    res.setHeader('RateLimit-Remaining', remaining.toString());
    res.setHeader(
      'RateLimit-Reset',
      Math.ceil(bucket.resetAt / 1000).toString(),
    );

    if (bucket.count > maxRequests) {
      res.setHeader('Retry-After', resetSeconds.toString());
      res.status(429).json({
        message: 'Too many requests. Try again later.',
        requestId: res.locals.requestId as string,
      });
      return;
    }

    next();
  };
}

function cleanupExpiredBuckets(
  buckets: Map<string, RateLimitBucket>,
  currentTime: number,
) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= currentTime) {
      buckets.delete(key);
    }
  }
}

function getClientKey(req: Parameters<RequestHandler>[0]) {
  return req.ip ?? req.socket.remoteAddress ?? 'unknown-client';
}
