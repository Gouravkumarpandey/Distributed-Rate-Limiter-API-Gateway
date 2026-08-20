import { app } from './app.js';
import { logger } from '@gateway/logger';
app.listen(3002, () => logger.info('payment service listening', { port: 3002 }));
