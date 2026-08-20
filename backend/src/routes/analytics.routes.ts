import { Router } from 'express'; import { analytics } from '../controllers/analytics.controller.js';
export const analyticsRoutes = Router(); analyticsRoutes.get('/', analytics);
