# URL Shortener SaaS

A modern, scalable, production-ready URL Shortener SaaS inspired by Bitly/Rebrandly.

## Tech Stack
- **Frontend:** Next.js (App Router, TypeScript, Tailwind CSS, Framer Motion, ShadCN UI)
- **Backend:** Node.js + Express (TypeScript)
- **Database:** PostgreSQL, Redis
- **DevOps:** Docker, GitHub Actions

## Features
- URL shortening (Base62), custom alias
- Link expiry (date/click), editing, soft delete, recovery
- QR code for each link
- Analytics: clicks, geo, device, referrer
- Redis caching, rate limiting
- JWT auth, RBAC
- Async logging, idempotency, collision prevention

## Structure
- `/frontend` — Next.js app
- `/backend` — Express API
- `/services`, `/controllers`, `/models`, `/routes`, `/middlewares` — Clean backend architecture

## Setup
See full documentation in `/README.md` and `/docs/`.
