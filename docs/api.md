# API Documentation: URL Shortener SaaS

## Auth
- `POST /auth/signup` — Register
- `POST /auth/login` — Login

## URL
- `POST /shorten` — Shorten URL
- `GET /:shortId` — Redirect
- `GET /links` — List user links
- `PUT /links/:id` — Edit link
- `DELETE /links/:id` — Soft delete

## Analytics
- `GET /analytics/:id` — Link analytics

## Notes
- All endpoints use JWT (except redirect, signup, login)
- Input validation: Zod/Joi
- Rate limiting: Redis
- See `/docs/system-design.md` for architecture
