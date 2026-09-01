import { Router } from 'express';
import prisma from '../utils/prisma.js';

export const rateLimitRoutes = Router();

rateLimitRoutes.get('/', async (req, res) => {
  const configs = await prisma.rateLimitConfig.findMany();
  res.json(configs);
});

rateLimitRoutes.post('/', async (req, res) => {
  const { serviceId, apiKeyId, algorithm, limit, windowMs } = req.body;
  const config = await prisma.rateLimitConfig.create({
    data: { serviceId, apiKeyId, algorithm, limit, windowMs }
  });
  res.status(201).json(config);
});

rateLimitRoutes.delete('/:id', async (req, res) => {
  await prisma.rateLimitConfig.delete({ where: { id: req.params.id } });
  res.status(204).send();
});
