# Student Management System

A full-stack student management app built as part of the Arbisoft AI Internship 2026 (Web track, Weeks 1–3). A React SPA talks to an Express + Prisma REST API, with JWT authentication and role-based authorization (`ADMIN` / `TEACHER`).

## Structure

```
.
├── frontend/   React 19 + Vite SPA (routing, auth, student CRUD UI)
└── backend/    Express 5 + Prisma 7 REST API (PostgreSQL)
```

Each half has its own `package.json` and dependencies — run them independently. The AI-development log for all three weeks lives in the root [`prompts.md`](./prompts.md).

## Features

- JWT-based login; sessions persisted in `localStorage`
- Role-based access: any authenticated user can view students, only `ADMIN` can create/edit/delete
- Client- and server-side validation (React state + Zod schemas)
- Protected routes on the frontend, `authenticate`/`authorize` middleware on the backend
- Unit, controller, route, and one real-database integration test on the backend; component/validator tests on the frontend

## Getting Started

### Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in DATABASE_URL and JWT_SECRET
npx prisma generate
npx prisma migrate deploy   # or `migrate dev` against a fresh database
npm run dev                 # http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL, defaults to http://localhost:5000/api
npm run dev             # http://localhost:5173
```

## Scripts (run inside `frontend/` or `backend/`)

| Script | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm test` | Run the test suite (Vitest) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

The backend also has `npx vitest run src/integration.test.js`, which hits the real database configured in `.env` — run it separately from the mocked unit/route tests.

## Tech Stack

**Frontend:** React, React Router, Vite, Vitest, React Testing Library
**Backend:** Express, Prisma, PostgreSQL, Zod, JWT, bcrypt, Vitest, Supertest

## API Overview

| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| POST | `/api/auth/register` | — | Creates a `TEACHER` by default |
| POST | `/api/auth/login` | — | Returns `{ user, token }` |
| GET | `/api/students` | any authenticated user | |
| GET | `/api/students/:id` | any authenticated user | |
| POST | `/api/students` | `ADMIN` | Owning `userId` is taken from the token, not the request body |
| PUT | `/api/students/:id` | `ADMIN` | |
| DELETE | `/api/students/:id` | `ADMIN` | |
