import type { RequestHandler } from 'express';
export const listServices: RequestHandler = (_request, response) => response.json({ data: [{ name: 'user', status: 'operational' }, { name: 'payment', status: 'operational' }] });
