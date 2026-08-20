export type CircuitState = 'closed' | 'open' | 'half-open';
export interface CircuitBreaker { state: CircuitState; failures: number; openedAt?: number; }
export function canRequest(circuit: CircuitBreaker, cooldownMs = 30_000) { return circuit.state !== 'open' || Date.now() - (circuit.openedAt ?? 0) >= cooldownMs; }
