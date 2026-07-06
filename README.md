# URL Shortener

This project is a full-stack URL shortener built with a Next.js frontend and an Express backend.

I built it to work through the backend and product design problems behind a link-shortening service: generating short identifiers, handling redirects efficiently, supporting custom aliases, and tracking basic analytics in a way that is still easy to reason about as a solo project.

## What it does

The application currently focuses on these workflows:

- Create shortened URLs from long links
- Support custom aliases
- Redirect users from short links to original URLs
- Track basic click analytics
- Generate QR codes for shortened links
- Manage links through a frontend dashboard

The goal was to build a practical end-to-end product, not a Bitly-scale clone.

## Tech stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Caching / performance:** Redis
- **Infrastructure:** Docker, Docker Compose, GitHub Actions

If your backend uses one specific database ORM, update this section to name it exactly instead of keeping it generic.

## Project structure

The repository is split into two main applications:

- `frontend/` – Next.js web interface
- `backend/` – Express API server
- `docs/` – setup notes and supporting documentation

## Main features

- URL shortening with custom aliases
- Link editing and management
- Redirect handling
- Basic analytics
- QR code generation
- Redis-backed caching
- Docker-based local setup

## Why I built it this way

I wanted to keep the frontend and backend separated so each side of the system stayed easier to reason about.

- **Next.js** handles the dashboard and user-facing workflows.
- **Express** keeps the API layer simple and explicit.
- **Redis** helps reduce repeated lookup cost for hot links.
- **Docker** makes local setup more repeatable and closer to deployment conditions.

## Running with Docker

Start the full stack with Docker Compose:

```bash
docker-compose up -d
```

After that:

- Frontend should be available at `http://localhost:3000`
- Backend should be available at `http://localhost:8000`

## Local development

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment and setup notes

Check the backend and frontend folders for their own package configuration and environment needs.

If you are running without Docker, make sure the required backend services are available locally before starting the app.

## Limitations

A few parts of the project are still evolving:

- Analytics are intentionally basic
- The product is not designed for large-scale multi-tenant usage
- Operational concerns like observability and deeper abuse protection can be improved further
- The README should only claim features that are actually implemented in `frontend/` and `backend/`

## What I want to improve next

Some natural next steps for this project are:

- stronger analytics breakdowns
- cleaner rate limiting and abuse protection
- better validation and error handling
- improved dashboard UX
- clearer deployment documentation for frontend and backend separately

## Live project

- **Live:** [frontend-rust-ten-44.vercel.app](https://frontend-rust-ten-44.vercel.app/)
- **Repository:** [URL-Shortener](https://github.com/AnujYadav-1915/URL-Shortener)

## Notes

This project was built to explore the practical backend tradeoffs behind URL shortening: short ID generation, redirect flow, caching, and analytics. The emphasis was on building a complete working system with a dashboard and backend API, while keeping the architecture understandable for a solo developer project.
