import { app } from './app.js';
import { env } from '@gateway/config';
import { logger } from '@gateway/logger';

app.listen(env.port, () => logger.info('gateway listening', { port: env.port }));
