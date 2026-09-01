import { Router } from 'express';
import { env } from '@gateway/config';
import { authentication } from '../middleware/authentication.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

import { CircuitBreaker, canRequest, recordSuccess, recordFailure } from '../gateway/circuitBreaker.service.js';
import { getServiceTarget } from '../gateway/serviceRegistry.js';

const circuits: Record<string, CircuitBreaker> = {};

export const gatewayRoutes = Router();

gatewayRoutes.use(authentication, rateLimiter);
gatewayRoutes.all('/:service/*splat', async (request, response, next) => {
  const service = request.params.service;
  const target = await getServiceTarget(service);
  if (!target) { response.status(404).json({ error: 'Unknown service' }); return; }
  
  if (!circuits[service]) { circuits[service] = { state: 'closed', failures: 0 }; }
  const circuit = circuits[service];
  
  if (!canRequest(circuit)) {
    response.status(503).json({ error: 'Service Unavailable (Circuit Open)' });
    return;
  }
  
  try {
    const upstreamPath = `/${(request.params.splat as string[]).join('/')}`;
    const upstream = await fetch(`${target}${upstreamPath}`, { method: request.method, headers: { 'content-type': request.header('content-type') ?? '', authorization: request.header('authorization') ?? '' }, body: ['GET', 'HEAD'].includes(request.method) ? undefined : JSON.stringify(request.body) });
    
    if (upstream.status >= 500) {
      recordFailure(circuit);
    } else {
      recordSuccess(circuit);
    }
    
    response.status(upstream.status);
    upstream.headers.forEach((value, name) => response.setHeader(name, value));
    response.send(Buffer.from(await upstream.arrayBuffer()));
  } catch (error) {
    recordFailure(circuit);
    next(error); 
  }
});
