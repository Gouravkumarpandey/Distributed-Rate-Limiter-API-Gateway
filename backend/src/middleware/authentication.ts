import type { RequestHandler } from 'express';

export const authentication: RequestHandler = (request, response, next) => {
  const token = request.header('authorization');
  if (!token?.startsWith('Bearer ')) {
    response.status(401).json({ error: 'Missing bearer token' });
    return;
  }
  next();
};
