import express from 'express';

export const app = express();
app.use(express.json());
app.get('/health', (_request, response) => response.json({ status: 'ok', service: 'payment-service', timestamp: new Date().toISOString() }));
app.post('/payments', (request, response) => response.status(201).json({ id: `pay_${Date.now()}`, amount: request.body.amount ?? 0, status: 'authorized' }));
