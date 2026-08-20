import { Redis } from 'ioredis';
import { env } from '@gateway/config';

export const redis = new Redis(env.redisUrl, { lazyConnect: true, enableOfflineQueue: false });
