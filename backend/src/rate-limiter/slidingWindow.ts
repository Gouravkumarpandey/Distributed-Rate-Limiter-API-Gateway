export function slidingWindow(timestamps: number[], now: number, windowMs: number, limit: number) {
  const active = timestamps.filter((timestamp) => timestamp > now - windowMs);
  return { allowed: active.length < limit, remaining: Math.max(0, limit - active.length - 1), timestamps: [...active, now] };
}
