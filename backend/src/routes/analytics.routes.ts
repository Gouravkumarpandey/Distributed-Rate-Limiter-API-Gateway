import { Router } from 'express';
import prisma from '../utils/prisma.js';

export const analyticsRoutes = Router();

analyticsRoutes.get('/', async (req, res) => {
  // Return the last 100 logs for the dashboard
  const logs = await prisma.analyticsLog.findMany({
    take: 100,
    orderBy: { timestamp: 'desc' }
  });
  res.json(logs);
});
