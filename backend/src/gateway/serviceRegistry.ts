export const serviceRegistry = { user: process.env.USER_SERVICE_URL ?? 'http://localhost:3001', payment: process.env.PAYMENT_SERVICE_URL ?? 'http://localhost:3002' } as const;
