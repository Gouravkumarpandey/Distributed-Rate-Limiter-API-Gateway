import type { ErrorRequestHandler } from 'express';
import { logger } from '@gateway/logger';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  logger.error('unhandled request error', { error: error instanceof Error ? error.message : String(error) });
  response.status(500).json({ error: 'Internal server error' });
};
