# System Design: URL Shortener SaaS

## Overview
A high-performance, read-heavy URL shortener inspired by Bitly/Rebrandly. Built for scale, security, and extensibility.

## Architecture
- **Frontend:** Next.js (App Router, TypeScript, Tailwind CSS, Framer Motion, ShadCN UI)
- **Backend:** Node.js + Express (TypeScript)
- **Database:** PostgreSQL (primary), Redis (cache/rate limit)
- **DevOps:** Docker, GitHub Actions

## Key Design Decisions
- **Cache-first:** Redirects check Redis first, fallback to DB
- **Async Logging:** Analytics/events logged via queue (future: Kafka/SQS)
- **Idempotency:** Prevent duplicate short links
- **Collision Prevention:** Base62 + DB/Redis check
- **Indexing:** Short ID, user ID, analytics fields
- **Horizontal Scalability:** Stateless API, scalable containers

## Data Flow
1. **Shorten URL:**
   - Validate, encode (Base62), check collision, store in DB, cache in Redis
2. **Redirect:**
   - Lookup in Redis → fallback to DB → update analytics async
3. **Analytics:**
   - Track click, geo, device, referrer; aggregate for dashboard

## Security
- Input validation (Zod/Joi), JWT auth, RBAC, rate limiting, open redirect prevention

## Extensibility
- Modular services/controllers, easy to add features (e.g., branded domains)

---
See `/README.md` and `/docs/api.md` for more.
