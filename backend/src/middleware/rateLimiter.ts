import type { RequestHandler } from 'express';
import { env } from '@gateway/config';
import { fixedWindow } from '../algorithms/fixedWindow.js';
import { slidingWindow } from '../rate-limiter/slidingWindow.js';
import { consumeToken, TokenBucket } from '../rate-limiter/tokenBucket.js';
import { redis } from '../config/redis.js';
import prisma from '../utils/prisma.js';

const localBuckets = new Map<string, { count: number; resetAt: number }>();
const slidingWindowCache = new Map<string, number[]>();
const tokenBuckets = new Map<string, TokenBucket>();

let configCache: Record<string, { algorithm: string; limit: number; windowMs: number }> = {};
let lastFetch = 0;

export const rateLimiter: RequestHandler = async (request, response, next) => {
  const key = request.ip || 'unknown';
  
  // Refresh config cache
  if (Date.now() - lastFetch > 60_000) {
    try {
      const configs = await prisma.rateLimitConfig.findMany();
      const newCache: Record<string, any> = {};
      for (const cfg of configs) {
         // Assuming apiKeyId is used for the key for now, or serviceId
         const cacheKey = cfg.apiKeyId || 'default';
         newCache[cacheKey] = cfg;
      }
      configCache = newCache;
      lastFetch = Date.now();
    } catch (e) {
      console.error('Failed to fetch rate limit configs', e);
    }
  }

  // Determine limits
  // In a real app we'd map the incoming API key to the config, defaulting to env vars
  const config = configCache['default'] || { algorithm: 'fixedWindow', limit: env.rateLimitMaxRequests, windowMs: env.rateLimitWindowMs };
  
  if (config.algorithm === 'slidingWindow') {
    const timestamps = slidingWindowCache.get(key) || [];
    const result = slidingWindow(timestamps, Date.now(), config.windowMs, config.limit);
    slidingWindowCache.set(key, result.timestamps);
    if (!result.allowed) { response.status(429).json({ error: 'Rate limit exceeded' }); return; }
  } else if (config.algorithm === 'tokenBucket') {
    const bucket = tokenBuckets.get(key) || { tokens: config.limit, lastRefill: Date.now() };
    const refillRate = config.limit / (config.windowMs / 1000);
    const result = consumeToken(bucket, Date.now(), config.limit, refillRate);
    tokenBuckets.set(key, result.bucket);
    if (!result.allowed) { response.status(429).json({ error: 'Rate limit exceeded' }); return; }
  } else {
    // Default to Fixed Window (Redis-backed)
    try {
      if (redis.status === 'wait') await redis.connect();
      const result = await fixedWindow(redis, key, config.limit, config.windowMs);
      response.set({ 'X-RateLimit-Remaining': String(result.remaining), 'X-RateLimit-Reset': String(result.resetAt) });
      if (!result.allowed) { response.status(429).json({ error: 'Rate limit exceeded', retryAfter: result.resetAt - Date.now() }); return; }
    } catch {
      // In-memory fallback
      const now = Date.now();
      const bucket = localBuckets.get(key);
      const current = !bucket || bucket.resetAt <= now ? { count: 0, resetAt: now + config.windowMs } : bucket;
      current.count += 1;
      localBuckets.set(key, current);
      response.set({ 'X-RateLimit-Remaining': String(Math.max(0, config.limit - current.count)) });
      if (current.count > config.limit) { response.status(429).json({ error: 'Rate limit exceeded' }); return; }
    }
  }
  next();
};
