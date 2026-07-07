# URL Shortener

This is a full-stack URL shortener built with a separate frontend and backend structure.

I built it to work through the practical problems behind a link-shortening product: generating short IDs, handling redirects cleanly, supporting custom aliases, and exposing simple analytics through a dashboard instead of treating the project as just a backend API demo.

## What it does

The project currently supports these core workflows:

* Create shortened links from long URLs
* Use custom aliases for links
* Redirect short URLs to their original destination
* View basic analytics for created links
* Manage links from a frontend dashboard
* Generate QR codes for shortened URLs

The goal was to build a complete, understandable product flow from UI to API.

## Project structure

The repository is organized into a few main parts:

* `frontend/` – user-facing web app (Next.js)
* `backend/` – backend directory structure (API logic is mocked in-memory for easy local setup)
* `docs/` – supporting setup and implementation notes

This separation makes it easier to work on product flows and backend logic independently.

## Tech stack

* **Frontend:** Next.js, TypeScript, Tailwind CSS
* **Backend:** Node.js (Mocked in-memory store in `frontend/lib/store.ts` for quick demonstration without external dependencies)
* **Database:** None (In-memory store)
* **ORM:** None
* **Infrastructure / tooling:** Docker, Docker Compose, GitHub Actions

## Main features

* Short link creation
* Custom aliases
* Link redirection
* Basic analytics
* Dashboard-based link management
* QR code generation
* Docker-based local setup

## Running with Docker

You can start the full stack with Docker Compose:

```bash
docker-compose up -d
```

The app will be available at `http://localhost:3000`.

## Running locally without Docker

You can run the frontend development server directly:

```bash
cd frontend
npm install
npm run dev
```

## Limitations

A few parts of the project are intentionally simple right now:

* Analytics are basic and focused on core usage data.
* The project uses an in-memory datastore, so it is not designed for multi-tenant or very large-scale deployment.
* Some operational concerns like observability, abuse protection, and deeper validation can still be improved.

## What I want to improve next

Some natural next steps for this project are:

* Better analytics breakdowns
* Stronger rate limiting and abuse protection
* Clearer validation and error handling
* Better dashboard UX
* Integrating a persistent Database (e.g. PostgreSQL) and ORM (e.g. Prisma) instead of the mock memory store.

## Live project

[Live App URL](https://frontend-rust-ten-44.vercel.app/)

## Notes

This project was built to understand the backend tradeoffs behind URL shortening while still shipping a usable frontend. The main value for me was learning how link generation, redirects, caching, and dashboard workflows fit together in one product.
