import type { RequestHandler } from 'express';
export const login: RequestHandler = (_request, response) => response.json({ token: 'demo-token', expiresIn: 3600 });
