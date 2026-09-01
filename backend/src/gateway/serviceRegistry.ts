import prisma from '../utils/prisma.js';
import { env } from '@gateway/config';

let cache: Record<string, string> = {};
let lastFetch = 0;

export async function getServiceTarget(serviceName: string): Promise<string | null> {
  const now = Date.now();
  if (now - lastFetch > 60_000) {
    try {
      const services = await prisma.service.findMany({ where: { active: true } });
      const newCache: Record<string, string> = {};
      
      // Fallbacks from env if not in DB
      newCache['user'] = env.userServiceUrl;
      newCache['payment'] = env.paymentServiceUrl;
      
      for (const svc of services) {
        newCache[svc.name] = svc.targetUrl;
      }
      cache = newCache;
      lastFetch = now;
    } catch (error) {
      console.error('Failed to fetch services', error);
      // Keep old cache on error
    }
  }
  return cache[serviceName] ?? null;
}
