import type { RequestHandler } from 'express';
import { logger } from '@gateway/logger';

export const requestLogger: RequestHandler = (request, response, next) => {
  const started = Date.now();
  response.on('finish', () => logger.info('request completed', { method: request.method, path: request.originalUrl, status: response.statusCode, durationMs: Date.now() - started }));
  next();
};
