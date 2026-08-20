import type { RequestHandler } from 'express';
export const rateLimitStatus: RequestHandler = (_request, response) => response.json({ limit: 100, remaining: 100, windowMs: 60000 });
