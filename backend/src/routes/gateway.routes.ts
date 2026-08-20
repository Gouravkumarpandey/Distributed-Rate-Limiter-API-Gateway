import { Router } from 'express';
import { env } from '@gateway/config';
import { authentication } from '../middleware/authentication.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const targets = { user: env.userServiceUrl, payment: env.paymentServiceUrl } as const;
export const gatewayRoutes = Router();

gatewayRoutes.use(authentication, rateLimiter);
gatewayRoutes.all('/:service/*splat', async (request, response, next) => {
  const service = request.params.service as keyof typeof targets;
  const target = targets[service];
  if (!target) { response.status(404).json({ error: 'Unknown service' }); return; }
  try {
    const upstreamPath = `/${(request.params.splat as string[]).join('/')}`;
    const upstream = await fetch(`${target}${upstreamPath}`, { method: request.method, headers: { 'content-type': request.header('content-type') ?? '', authorization: request.header('authorization') ?? '' }, body: ['GET', 'HEAD'].includes(request.method) ? undefined : JSON.stringify(request.body) });
    response.status(upstream.status);
    upstream.headers.forEach((value, name) => response.setHeader(name, value));
    response.send(Buffer.from(await upstream.arrayBuffer()));
  } catch (error) { next(error); }
});
