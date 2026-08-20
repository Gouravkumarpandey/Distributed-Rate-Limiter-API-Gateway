export type ServiceName = 'user' | 'payment';

export interface GatewayRequest {
  service: ServiceName;
  path: string;
}

export interface HealthResponse {
  status: 'ok';
  service: string;
  timestamp: string;
}
