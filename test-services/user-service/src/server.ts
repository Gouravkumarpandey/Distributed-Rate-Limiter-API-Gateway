import { app } from './app.js';
import { logger } from '@gateway/logger';
app.listen(3001, () => logger.info('user service listening', { port: 3001 }));
