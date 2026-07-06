# URL Shortener

A full-stack URL shortener application built with Next.js and Express.

## Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL (with Prisma/TypeORM), Redis
- **Infrastructure:** Docker, GitHub Actions

## Features
- URL shortening with custom alias support
- Link management (expiry, editing, soft delete)
- Click analytics and QR code generation
- Redis-backed caching and rate limiting
- User authentication and role-based access control

## Structure
- `/frontend` — Next.js web interface
- `/backend` — Express API server

## Setup Instructions

### Prerequisites
- Docker and Docker Compose
- Node.js (v18+)
- PostgreSQL (if running without Docker)
- Redis (if running without Docker)

### Running with Docker (Recommended)
1. Clone the repository
2. Start the services:
   ```bash
   docker-compose up -d
   ```
3. The frontend will be available at `http://localhost:3000` and backend at `http://localhost:8000`.

### Local Development Setup
1. **Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
