import { Router } from 'express'; import { listApiKeys } from '../controllers/apiKey.controller.js';
export const apiKeyRoutes = Router(); apiKeyRoutes.get('/', listApiKeys);
