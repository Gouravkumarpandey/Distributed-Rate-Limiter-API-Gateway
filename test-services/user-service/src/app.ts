import express from 'express';

export const app = express();
app.use(express.json());
app.get('/health', (_request, response) => response.json({ status: 'ok', service: 'user-service', timestamp: new Date().toISOString() }));
app.get('/users/:id', (request, response) => response.json({ id: request.params.id, name: 'Demo User', role: 'customer' }));
