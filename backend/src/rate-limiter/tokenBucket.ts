export interface TokenBucket { tokens: number; lastRefill: number; }
export function consumeToken(bucket: TokenBucket, now: number, capacity: number, refillPerSecond: number) {
  const elapsed = Math.max(0, now - bucket.lastRefill) / 1000;
  const tokens = Math.min(capacity, bucket.tokens + elapsed * refillPerSecond);
  return tokens >= 1 ? { allowed: true, bucket: { tokens: tokens - 1, lastRefill: now } } : { allowed: false, bucket: { tokens, lastRefill: now } };
}
