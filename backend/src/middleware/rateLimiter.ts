import type { RequestHandler } from 'express';
import { env } from '@gateway/config';
import { fixedWindow } from '../algorithms/fixedWindow.js';
import { redis } from '../config/redis.js';

const localBuckets = new Map<string, { count: number; resetAt: number }>();

export const rateLimiter: RequestHandler = async (request, response, next) => {
  const key = request.ip || 'unknown';
  try {
    if (redis.status === 'wait') await redis.connect();
    const result = await fixedWindow(redis, key, env.rateLimitMaxRequests, env.rateLimitWindowMs);
    response.set({ 'X-RateLimit-Remaining': String(result.remaining), 'X-RateLimit-Reset': String(result.resetAt) });
    if (!result.allowed) { response.status(429).json({ error: 'Rate limit exceeded', retryAfter: result.resetAt - Date.now() }); return; }
  } catch {
    const now = Date.now();
    const bucket = localBuckets.get(key);
    const current = !bucket || bucket.resetAt <= now ? { count: 0, resetAt: now + env.rateLimitWindowMs } : bucket;
    current.count += 1;
    localBuckets.set(key, current);
    response.set({ 'X-RateLimit-Remaining': String(Math.max(0, env.rateLimitMaxRequests - current.count)) });
    if (current.count > env.rateLimitMaxRequests) { response.status(429).json({ error: 'Rate limit exceeded' }); return; }
  }
  next();
};
