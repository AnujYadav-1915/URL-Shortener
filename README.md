# Vynkify - URL Shortener

A responsive URL shortener dashboard built to demonstrate modern frontend practices using Next.js and Tailwind CSS. 

For the purposes of this demonstration and easy local setup, the backend and database layer are mocked using an in-memory store. This allows reviewers to run and test the complete application flow without configuring external databases.

## Tech Stack
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS, Framer Motion
* **Components:** Radix UI / Shadcn UI concepts
* **Charts:** Recharts
* **Storage:** In-memory local mock store (no external database required)

## Features
* **URL Management:** Create, view, and manage shortened URLs through a clean dashboard interface.
* **Mock Analytics:** Simulated tracking of clicks, device types, referrers, and geographic data.
* **Authentication Flow:** Simulated user authentication and session management.
* **Zero-Config Setup:** Runs entirely within Next.js without requiring Docker, PostgreSQL, or Redis.

## Local Setup Instructions

Since the application uses an in-memory store, getting started is extremely quick.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AnujYadav-1915/URL-Shortener.git
   cd URL-Shortener
   ```

2. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Visit `http://localhost:3000` in your browser. You can log in with any mock credentials (or use the pre-seeded demo user).

## Project Structure
* `frontend/pages/` - Next.js page routes and API routes (`/api/*`).
* `frontend/components/` - Reusable UI components.
* `frontend/lib/store.ts` - The in-memory mock database that powers the application logic.
