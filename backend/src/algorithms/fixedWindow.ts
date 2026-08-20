export interface RateLimitResult { allowed: boolean; remaining: number; resetAt: number; }

interface RedisCounter {
  incr(key: string): Promise<number>;
  pexpire(key: string, milliseconds: number): Promise<unknown>;
}

export async function fixedWindow(redis: RedisCounter, key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  const now = Date.now();
  const bucket = Math.floor(now / windowMs);
  const redisKey = `rate:${key}:${bucket}`;
  const count = await redis.incr(redisKey);
  if (count === 1) await redis.pexpire(redisKey, windowMs);
  return { allowed: count <= limit, remaining: Math.max(0, limit - count), resetAt: (bucket + 1) * windowMs };
}
