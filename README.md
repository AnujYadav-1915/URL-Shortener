# URL Shortener

This is a full-stack URL shortener built with a separate frontend and backend.

I built it to work through the practical problems behind a link-shortening product: generating short IDs, handling redirects cleanly, supporting custom aliases, and exposing simple analytics through a dashboard instead of treating the project as just a backend API demo.

## What it does

The project currently supports these core workflows:

- Create shortened links from long URLs
- Use custom aliases for links
- Redirect short URLs to their original destination
- View basic analytics for created links
- Manage links from a frontend dashboard
- Generate QR codes for shortened URLs

The goal was to build a complete, understandable product flow from UI to API, not to imitate Bitly at production scale.

## Project structure

The repository is organized into a few main parts:

- `frontend/` – user-facing web app
- `backend/` – API server and redirect logic
- `docs/` – supporting setup and implementation notes

This separation made it easier to work on product flows and backend logic independently.

## Tech stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Caching / performance layer:** Redis
- **Infrastructure / tooling:** Docker, Docker Compose, GitHub Actions

If you later want this README to be even more exact, you should replace any stack item here with the exact package or ORM used in the backend once you verify it from `backend/package.json`.

## Main features

- Short link creation
- Custom aliases
- Link redirection
- Basic analytics
- Dashboard-based link management
- QR code generation
- Docker-based local setup

## Why I built it this way

I wanted the frontend and backend to stay separate so the project would be easier to reason about and extend.

- The **frontend** handles the dashboard and link management experience.
- The **backend** is responsible for redirects, link operations, and analytics-related logic.
- **Redis** is used to reduce repeated lookups for frequently accessed links.
- **Docker** makes the local environment easier to run consistently.

## Running with Docker

You can start the full stack with Docker Compose:

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

Check the `frontend/` and `backend/` folders for their own environment variables and package configuration.

If you are running the project without Docker, make sure any required backend services are available locally before starting the app.

## Limitations

A few parts of the project are intentionally simple right now:

- Analytics are basic and focused on core usage data
- The project is not designed for multi-tenant or very large-scale deployment
- Some operational concerns like observability, abuse protection, and deeper validation can still be improved
- The README is intentionally limited to features that are visible in the current codebase and repo structure

## What I want to improve next

Some natural next steps for this project are:

- Better analytics breakdowns
- Stronger rate limiting and abuse protection
- Clearer validation and error handling
- Better dashboard UX
- More detailed deployment documentation for frontend and backend separately

## Live project

- **Live:** [frontend-rust-ten-44.vercel.app](https://frontend-rust-ten-44.vercel.app/)
- **Repository:** [URL-Shortener](https://github.com/AnujYadav-1915/URL-Shortener)

## Notes

This project was built to understand the backend tradeoffs behind URL shortening while still shipping a usable frontend. The main value for me was learning how link generation, redirects, caching, and dashboard workflows fit together in one product.
