import { Router } from 'express'; import { rateLimitStatus } from '../controllers/rateLimit.controller.js';
export const rateLimitRoutes = Router(); rateLimitRoutes.get('/', rateLimitStatus);
