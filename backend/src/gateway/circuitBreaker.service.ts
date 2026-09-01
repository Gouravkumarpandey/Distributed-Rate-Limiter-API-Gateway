export type CircuitState = 'closed' | 'open' | 'half-open';
export interface CircuitBreaker { state: CircuitState; failures: number; openedAt?: number; }
export function canRequest(circuit: CircuitBreaker, cooldownMs = 30_000) { return circuit.state !== 'open' || Date.now() - (circuit.openedAt ?? 0) >= cooldownMs; }

export function recordSuccess(circuit: CircuitBreaker) {
  circuit.failures = 0;
  circuit.state = 'closed';
  circuit.openedAt = undefined;
}

export function recordFailure(circuit: CircuitBreaker, threshold = 5) {
  circuit.failures += 1;
  if (circuit.failures >= threshold) {
    circuit.state = 'open';
    circuit.openedAt = Date.now();
  }
}
