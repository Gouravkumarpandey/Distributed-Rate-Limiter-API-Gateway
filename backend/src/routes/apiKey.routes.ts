import { Router } from 'express';
import prisma from '../utils/prisma.js';

export const apiKeyRoutes = Router();

apiKeyRoutes.get('/', async (req, res) => {
  const keys = await prisma.apiKey.findMany();
  res.json(keys);
});

apiKeyRoutes.post('/', async (req, res) => {
  const { owner } = req.body;
  const keyHash = Math.random().toString(36).substring(2, 15); // Fake hash for demo
  const key = await prisma.apiKey.create({ data: { owner, keyHash } });
  res.status(201).json(key);
});
