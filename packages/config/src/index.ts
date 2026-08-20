export const env = {
  port: Number(process.env.PORT ?? 3000),
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  userServiceUrl: process.env.USER_SERVICE_URL ?? 'http://localhost:3001',
  paymentServiceUrl: process.env.PAYMENT_SERVICE_URL ?? 'http://localhost:3002',
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000),
  rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 100)
};
