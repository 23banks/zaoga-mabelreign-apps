# ZAOGA FIF Mabelreign Kingdom District — Digital Platform

A church district webapp: announcements, sermons, events, prayer requests, testimonies, daily
devotions, and a media gallery for ZAOGA FIF Mabelreign Kingdom District.

## Structure

- `website/` — Next.js frontend (App Router, Tailwind CSS)
- `backend/` — Express API backed by MS SQL Server
- `setup_guides/` — original setup documentation

## Running locally

**Backend** (needs a local SQL Server instance — see `backend/db/schema.sql` and `backend/.env`):

```bash
cd backend
npm install
npm run dev
```

**Website:**

```bash
cd website
npm install
npm run dev
```

Then visit http://localhost:3000 (API at http://localhost:5000).
