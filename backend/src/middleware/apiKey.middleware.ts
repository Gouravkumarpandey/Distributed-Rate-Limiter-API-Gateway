import type { RequestHandler } from 'express';
export const apiKeyMiddleware: RequestHandler = (request, response, next) => { if (!request.header('x-api-key')) { response.status(401).json({ error: 'Missing API key' }); return; } next(); };
