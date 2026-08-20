# Distributed API Gateway

A TypeScript monorepo demonstrating an API gateway with authentication, Redis-backed fixed-window rate limiting, request logging, and service proxying.

## Run locally

```bash
npm install
npm run dev:user
npm run dev:payment
npm run dev:gateway
```

The gateway listens on `http://localhost:3000`. Check `GET /health`, or call `GET /api/user/users/123` with an `Authorization: Bearer demo` header. Redis is optional for local development; the gateway falls back to an in-memory limiter when it is unavailable.

For the full stack, run `docker compose up --build`. Use `node load-testing/rate-limit-test.js 120` to exercise the gateway.
