import { Router } from 'express';
import prisma from '../utils/prisma.js';

export const serviceRoutes = Router();

serviceRoutes.get('/', async (req, res) => {
  const services = await prisma.service.findMany();
  res.json(services);
});

serviceRoutes.post('/', async (req, res) => {
  const { name, targetUrl } = req.body;
  const service = await prisma.service.create({ data: { name, targetUrl } });
  res.status(201).json(service);
});

serviceRoutes.delete('/:id', async (req, res) => {
  await prisma.service.delete({ where: { id: req.params.id } });
  res.status(204).send();
});
