import type { RequestHandler } from 'express';
export const analytics: RequestHandler = (_request, response) => response.json({ requests: 0, errors: 0, rateLimited: 0 });
