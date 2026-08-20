import { Router } from 'express'; import { listServices } from '../controllers/service.controller.js';
export const serviceRoutes = Router(); serviceRoutes.get('/', listServices);
