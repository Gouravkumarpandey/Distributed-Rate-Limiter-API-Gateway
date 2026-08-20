export interface RequestLog { method: string; path: string; status: number; durationMs: number; timestamp: string; }
export const createRequestLog = (method: string, path: string, status: number, durationMs: number): RequestLog => ({ method, path, status, durationMs, timestamp: new Date().toISOString() });
