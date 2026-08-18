# prompts.md — Student Management System

## AI-Assisted Development Log — Phase 1 (Weeks 1–3)

This document records the AI-assisted development process for the **Student Management System**, built as part of the Arbisoft AI Internship 2026 (Web Track) — Phase 1 (Weeks 1–3). Claude (Anthropic) was used throughout as a mentor-style pair-programming assistant, guiding design decisions and generating code incrementally with review at each step. This single log covers the frontend, the backend, and the Week 3 integration between them — the project itself is split into `frontend/` and `backend/`, but the AI-development record is kept as one file so Phase 1 reads as a continuous narrative.

**Technology stack:** React 19 + Vite (frontend) · Express 5 + Prisma 7 + PostgreSQL (backend) · JWT auth · Zod validation · ESLint + Prettier · Vitest + React Testing Library + Supertest.

---

## Week 1 — Frontend Fundamentals

**Goal:** Scaffold a React + Vite SPA with routing, a shared layout, a validated form, linting/formatting, and unit tests.

### Setup, folder structure, and routing

**Prompt given to Claude:**
> "I am participating in the Arbisoft AI Internship 2026 (Web Track). For Week 1, I need to: set up a React project using Vite, build an SPA with at least 3 routes, use a shared Navbar/Layout, build one form with client-side validation, configure ESLint and Prettier, write at least 3 unit tests, and follow React best practices. Act as my senior software engineer and mentor. Teach me one step at a time."

**Outcome:**
- Scaffolded with `npm create vite@latest` (React, JavaScript template)
- Designed a folder structure up front — `components/`, `pages/`, `layouts/`, `routes/`, `services/`, `utils/`, `tests/` — with `services/` intentionally left empty in anticipation of Week 2's backend work
- Implemented routing: `BrowserRouter` in `main.jsx`, route table centralized in `routes/AppRoutes.jsx`, a shared `Layout.jsx` (`Navbar` + `<Outlet />`), and `HomePage`, `AboutPage`, `StudentsPage`, `NotFoundPage` — explained conceptually (`Outlet`, `NavLink` active-state matching) before writing code

### Student registration form and validation

**Prompt given to Claude:**
> "Create a Student Registration Form. Fields: Name, Email, Department, Age. Validation: required fields, valid email, minimum age 18. Show inline error messages. Explain controlled components, state, onChange, onSubmit, and validation logic."

**Outcome:**
- `utils/validators.js`: pure, independently-testable functions (`isRequired`, `isValidEmail`, `isMinimumAge` at the time, `validateStudentForm`)
- `StudentsPage.jsx`: single form-state object, generic `handleChange`, validating `handleSubmit`, inline field-level error rendering, in-memory student list via `useState`

*(The age field and `isMinimumAge` were later dropped when the form settled on `department`/`rollNumber` instead — see the Post-Week-3 cleanup below.)*

### Tooling and tests

**Prompt given to Claude:**
> "Help me configure ESLint and Prettier." / "Guide me through setting up Vitest and React Testing Library, then write unit tests for the validators, the Navbar, and the StudentsPage form validation."

**Outcome:**
- ESLint flat config with `eslint-config-prettier` last in the `extends` array; `.prettierrc` (semicolons, single quotes, 2-space, ES5 trailing commas); `lint`/`format` scripts added
- Fixed inconsistent page-folder casing (`Aboutpage` → `AboutPage`, etc.) surfaced by `prettier --check`, to avoid case-sensitivity breakage on Linux CI/hosting
- Vitest configured (`jsdom` environment, `setupFiles: './src/setupTests.js'`); three test files written: `validators.test.js`, `Navbar.test.jsx`, `StudentsPage.test.jsx`

**Week 1 verification:** `npm run lint` ✅ · `npx prettier --check .` ✅ · `npm run test` — 3 files / 5 tests passing.

---

## Week 2 — Backend, REST, CRUD & ORM

**Goal:** Build a CRUD REST API for the Student resource with an ORM-modeled relationship, input validation, and unit tests.

### Project setup and Prisma

**Prompt given to Claude:**
> "Guide me through setting up a Node.js + Express backend for the Student Management System, one task at a time. Use clean architecture with a `src/` folder structure (config, routes, controllers, middlewares) to prepare for Prisma + PostgreSQL integration."

**Outcome:**
- Express app + server entry point, `/api/health` check, `src/config/db.js` with a reusable Prisma Client instance (Neon PostgreSQL, `@prisma/adapter-pg`)
- `prisma/schema.prisma`: `User` and `Student` models with a `User → Student[]` relationship (`userId` foreign key)

### CRUD API and validation

**Prompt given to Claude:**
> "Guide me through building a REST CRUD API for the Student Management System backend using Express 5, Prisma 7, and PostgreSQL. Implement proper REST resource design, routing, controllers, and error handling." / "Add input validation and error handling using Zod, with a reusable validation middleware."

**Outcome:**
- `student.routes.js` + `student.controller.js`: full CRUD (`POST`/`GET`/`GET :id`/`PUT`/`DELETE`)
- `validators/student.validator.js` (Zod schemas) + `middlewares/validate.js` (generic `safeParse` middleware, HTTP 400 on failure)
- `middlewares/errorHandler.js`: maps Prisma error codes (`P2002` duplicate → 409, `P2025` not found → 404) to clean JSON responses

### Linting and testing

**Prompt given to Claude:**
> "Configure ESLint and Prettier for this Express + ES Modules backend." / "Write AI-assisted unit tests using Vitest with a mocked Prisma Client, so tests don't depend on a real database. Then add Supertest route/integration tests."

**Outcome:**
- ESLint flat config for Node/ESM; `lint`/`format` scripts
- `vitest-mock-extended` for a reusable Prisma mock (`src/config/__mocks__/db.js`); controller tests for create/get/list/update, plus `errorHandler` tests for P2002/P2025/500
- Supertest smoke test for `/api/health` and route-level integration tests for the Student endpoints

**Week 2 verification:** `npm test` ✅ — 4 files / 14 tests passing · `npm run lint` ✅.

---

## Week 3 — Auth, Authorization, Tests & Integration

**Goal:** Add JWT authentication and role-based authorization to the Week 2 API, then connect the Week 1 frontend to it end-to-end, with API and integration tests covering the full auth + CRUD path.

### Backend: JWT authentication and authorization

**Prompt given to Claude:**
> "Guide me through adding JWT-based authentication to my existing Express 5 + Prisma 7 backend. Explain authentication concepts before implementing. Add secure password hashing, registration, login, JWT generation, and authentication middleware." / "Now add role-based authorization: reusable middleware so different roles can access different operations."

**Outcome:**
- `utils/password.js` (bcrypt hash/compare), `utils/token.js` (JWT sign/verify), `controllers/auth.controller.js` (`registerUser`, `loginUser` — passwords never returned in responses)
- `middlewares/authenticate.js` (verifies `Authorization: Bearer <token>`, attaches `req.user`) and `middlewares/authorize.js` (role allow-list, 403 on mismatch)
- `Role` enum (`ADMIN` / `TEACHER`) on the `User` model; Student create/update/delete restricted to `ADMIN`, read access open to any authenticated user
- Unit tests for the controller, both middlewares, and the token/password utilities (valid, missing, invalid-token cases)

### Frontend: connecting to the real backend

**Prompt given to Claude:**
> "Guide me through connecting my existing React Student Management System frontend to the Express + Prisma backend. Keep the existing frontend structure, and wire authentication and Student CRUD to the real API. Explain each integration step before implementing it."

**Outcome:**
- `api/apiClient.js`: single `fetch` chokepoint — injects the JWT from `localStorage` as a Bearer header, unwraps JSON, throws on non-2xx
- `services/auth.service.js` and `services/student.service.js`: thin per-endpoint wrappers over `apiClient`
- `context/AuthContext.js` + `AuthContext.jsx` (split into two files specifically to satisfy the `react-refresh/only-export-components` ESLint rule — a context-only file and a component-only file) and `context/useAuth.js`: hydrate `token`/`user` from `localStorage` on load, expose `login`/`logout`/`isAuthenticated`
- `pages/LoginPage/LoginPage.jsx`: controlled login form, client-side validation, calls `auth.service`, stores the session via `login()`, navigates to `/students`
- `components/ProtectedRoute/ProtectedRoute.jsx`: redirects unauthenticated users to `/login`
- `pages/StudentsPage/StudentsPage.jsx` rewired from in-memory state to the real API (`getStudents`/`createStudent`/`updateStudent`/`deleteStudent`), with `isAdmin = user?.role === 'ADMIN'` gating the create/edit/delete UI
- `components/Navbar/Navbar.jsx`: shows the logged-in user's name/role and a Logout button

### Backend: API and integration tests

**Prompt given to Claude:**
> "Expand the backend test suite to cover JWT authentication, role-based authorization, Student CRUD routes, and error handling — mock Prisma where appropriate, and verify success and failure paths." / "Add an integration test that runs the happy path end-to-end against the real database: create a temporary admin, log in for a real JWT, and use it to create a student through the protected API."

**Outcome:**
- Auth controller tests, password/token utility tests, `authenticate`/`authorize` middleware tests, expanded Student controller and route (Supertest) tests, error-handler tests
- `src/integration.test.js`: creates a temporary `ADMIN` user against the real Neon PostgreSQL database, logs in through `/api/auth/login`, creates a student through `/api/students` with the real JWT, verifies the result, and cleans up both records in `afterAll`

**Week 3 verification:** `npm test` ✅ — 10 files / 31 tests passing · `npx vitest run src/integration.test.js` ✅ · full frontend↔backend CRUD workflow (login → list → create → edit → delete) verified manually.

---

## Post-Week-3 — Repository Consolidation & Code Review

**Purpose:** The frontend and backend had been developed as two separate repositories (`STUDENT-MANAGEMENT-SYSTEM` and `student-management-backend`). Claude Code was asked to merge them into a single monorepo, preserving both repos' git history, and to review both halves for real bugs rather than only structural cleanup.

**Prompt given to Claude Code:**
> "Consolidate this backend repo and the separate frontend repo into a single monorepo (`frontend/` + `backend/`), preserving git history, and fix the issues found during review."

### Repository structure

- Committed a pending uncommitted change to `prisma/schema.prisma` (the `Role` enum and formatting) that existed on disk but had never been committed — without this, the merge would have carried a schema out of sync with the actual controller/middleware code
- Moved all frontend files into `frontend/` via `git mv` (preserving history/blame), and imported the backend repo's full commit history into `backend/` via `git subtree add` — so Week 2 + Week 3 backend history stays intact instead of being flattened or lost
- Rewrote the root `README.md` (previously the untouched Vite template) with setup instructions, an API table, and tech stack for both halves

### Backend bugs found and fixed

- **Unwired validation:** `POST /api/auth/register` and `/login` imported `registerSchema`/`loginSchema` from `auth.validator.js` but never applied them as route middleware — both endpoints accepted completely unvalidated request bodies. Wired `validate(registerSchema)` / `validate(loginSchema)` into `auth.routes.js`. Verified with `curl`: a malformed register request (missing name/password, bad email) now correctly returns `400` with field-level errors instead of being accepted or crashing.
- **Client-controlled ownership:** `createStudent`/`updateStudent` trusted a client-supplied `userId` in the request body — any authenticated `ADMIN` could attribute a student to an arbitrary user id. Removed `userId` from the Zod schemas and changed `createStudent` to derive it from `req.user.userId` (the authenticated token) instead; `updateStudent` no longer accepts a `userId` change at all. Verified against the real database: logged in as an admin, sent `userId: 999` in the create payload, confirmed the persisted student's `userId` was the admin's real id and not the spoofed value, then cleaned up the test data.
- Documented `DATABASE_URL` and `JWT_SECRET` in `.env.example` (previously only `PORT` was listed).
- Updated `student.controller.test.js`, `student.routes.test.js`, and `integration.test.js` for the new contract.

### Frontend bugs found and fixed

- Hardcoded `http://localhost:5000/api` in `apiClient.js` → now reads `VITE_API_URL` (with a local fallback); added `frontend/.env.example`.
- No handling for an expired/invalid token — a 401 response left the app "half logged-in." `apiClient` now dispatches an `auth:unauthorized` event on 401; `AuthProvider` listens for it and logs the session out.
- `Navbar` rendered the user name and Logout button even while logged out; now shows a Login link instead.
- `ProtectedRoute` didn't remember the attempted URL, and `LoginPage` always navigated to `/students` after login regardless of where the user came from — both now round-trip the intended destination via router `state`.
- `StudentsPage` was still sending `userId` in the create/update body; removed once the backend started deriving it from the JWT.
- Removed dead code (`isMinimumAge`, left over from the Week 1 age-field draft) and unused asset files (`App.css`, `hero.png`, `react.svg`, `vite.svg`, `public/icons.svg`).
- `AboutPage` copy still described the Week 1 in-memory version of the app; updated to describe the actual JWT-authenticated, Postgres-backed architecture.
- Test fixes: `StudentsPage.test.jsx` was making a real, unmocked `fetch` and only passing by accident — now mocks `student.service.js` directly. Both component tests switched from `BrowserRouter` to `MemoryRouter` and clean up `localStorage` between tests.

**Verification:** Backend — `npm run lint` clean, 9 files / 30 unit+route tests passing, plus a manual smoke test against the real database (register → login → role-check 403 → validation 400 → admin create with spoofed `userId` ignored → cleanup). Frontend — `npm run lint` clean, 3 files / 5 tests passing, `npx vite build` succeeds.

---

## Post-Week-3 — Frontend Visual Redesign

**Prompt given to Claude Code:**
> "The UI is too plain, no color or layout — make it look professional and interactive like a real product. Write good CSS, add a color scheme, better layout, buttons, and proper elements."

**Outcome:**
- Introduced a design-token system in `index.css` (colors, an Inter/Lexend type scale, shadows, radii) and a shared `.btn`/`.badge`/`.card` utility layer reused across every page instead of one-off styles per component
- Redesigned every page: a hero + feature-grid `HomePage`, a tech-stack/roles `AboutPage`, a two-panel `LoginPage` (brand panel + form, icon-prefixed inputs, show/hide password), a `StudentsPage` with avatar initials, color-coded department badges, a live client-side search box, and proper loading/empty states, and a styled `NotFoundPage`
- Redesigned `Navbar` with a logo mark, sticky header, user avatar, and a responsive hamburger menu for mobile
- **Found and fixed a real bug while doing this:** `StudentsPage.css` styled classes (`.student-card-details`, `.detail-label`, `.detail-value`, `.edit-button`, `.delete-button`) that didn't match the actual JSX class names (`.student-card-body`, `.field-label`, `.field-value`, `.btn-edit`, `.btn-delete`) — a leftover mismatch from an earlier edit, meaning the student card body and action buttons had been rendering completely unstyled
- Verified with a Playwright-driven walkthrough of the running app (desktop and a 390px mobile viewport): home, about, login, the search filter, empty-form validation, and the mobile menu, with zero browser console errors. Caught and fixed a genuine layout bug this way — the mobile hamburger button was being squeezed to ~16px wide by the non-wrapping navbar brand text (`flex-shrink` wasn't pinned to `0`), which a static code read wouldn't have surfaced

**Verification:** `npm run lint` clean, `npm test` — 3 files / 5 tests passing, `npx vite build` succeeds.

---

## Post-Week-3 — STUDENT Role & Self-Service Registration

**Prompt given to Claude Code:**
> "Add another role for students — one that can only view students and can log in."

**Outcome:**
- Added `STUDENT` to the Prisma `Role` enum via a proper migration (`add_student_role`)
- `auth.validator.js`'s `registerSchema` now accepts an optional `role` restricted to `z.enum(["TEACHER", "STUDENT"])` — `ADMIN` is not a valid option, so it can't be self-assigned through registration; admin accounts stay provisioned directly in the database, matching how `ADMIN` already worked before this change
- `registerUser` passes the validated role through to `prisma.user.create` (previously ignored the field entirely and always fell back to the schema's `TEACHER` default)
- No authorization changes were needed: `GET /api/students` already only required `authenticate` (any role), and write operations already required `authorize("ADMIN")` — so `STUDENT` automatically got the same read-only access as `TEACHER`
- New `RegisterPage` (role-picker card, matches `LoginPage`'s two-panel layout) at `/register`, linked from `LoginPage`; registering logs the user in immediately

**Caught during verification:** a stale backend process left running from the earlier UI-testing session was still bound to port 5000 with the old code, so the first smoke test looked like the role feature was broken (`STUDENT` silently became `TEACHER`, `ADMIN` self-registration wasn't rejected). Killing the stale process and restarting against the current code showed the actual (correct) behavior — a reminder to double check *which* process is answering before trusting a live test's result.

**Verification:** Backend — 30/30 unit/route tests passing, lint clean, and a real-database smoke test (`STUDENT` register → 200 on `GET /students`, 403 on `POST /students`; `role:"ADMIN"` in the register body → 400). Frontend — lint clean, 5/5 tests passing, build succeeds, and a Playwright walkthrough of the full register-as-STUDENT flow (role card pre-selected, submits, lands on the read-only Students view with no admin controls) with zero console errors.

---

## Post-Week-3 — Courses, Per-Role Permissions, Error Handling & Visual Theme

**Prompt given to Claude Code:**
> "Give the three roles proper, distinct permissions and add a Courses feature: students can only view students and courses; teachers can register students, add/remove courses, and drop students from courses; admins can do everything including edit/delete/update. Show a proper error on the frontend whenever someone tries something they can't do, or submits an invalid entry. Also replace the purple/blue color scheme — it's irritating — with something else, and use better fonts."

**Judgment call flagged before starting:** the prompt named "drop" for teachers but never explicitly said teachers could *enroll* a student in a course. Proceeded with both enroll and drop for `ADMIN`/`TEACHER` — a course-management feature that can only remove students and never add them isn't a usable workflow — and flagged the assumption to the user up front rather than silently guessing.

**Outcome — backend:**
- New `Course` and `Enrollment` Prisma models (`Enrollment` as the many-to-many join table, `@@unique([studentId, courseId])` to prevent double-enrollment), migrated against the real database
- New `/api/courses` routes with a three-way permission split: `GET` open to any authenticated role, `POST`/`DELETE`/enroll/drop restricted to `ADMIN` + `TEACHER`, `PUT` (edit) restricted to `ADMIN` only
- `POST /api/students` changed from `ADMIN`-only to `ADMIN` + `TEACHER` (teachers can register students; edit/delete stay `ADMIN`-only)
- `enrollStudent`/`dropStudent` controllers return specific messages instead of raw Prisma errors: "already enrolled," "not enrolled," course/student not found
- `authorize` middleware now names the roles required instead of a generic "insufficient permissions" message
- New course controller unit tests (create/update/delete/enroll/drop, including not-found and already-enrolled cases)

**Outcome — frontend:**
- New `CoursesPage`, mirroring the backend's exact permission split — verified the `TEACHER` view has no course "Edit" button and the `STUDENT` view has no forms or Drop buttons at all
- New global toast notification system (`ToastProvider`/`useToast`) so every action failure (permission denied, validation, conflict) surfaces a specific, dismissible message instead of a silent failure — matches the backend's now-descriptive error text
- `apiClient` attaches the HTTP status to thrown errors and has sensible default messages per status as a fallback
- Replaced every hardcoded indigo/violet/blue value across the CSS (not just the design tokens — a few gradients and box-shadows had hardcoded rgba values that the earlier token-based redesign missed) with a teal/amber palette, and swapped the Lexend heading font for Sora
- `AboutPage` now documents all three roles and their actual permissions, including courses

**Caught during verification:** twice during this session, a curl smoke test against a freshly-added backend route returned 404/stale behavior because an old `node src/server.js` process from an earlier session was still bound to port 5000. Both times the fix was finding and killing the stale process (`Get-NetTCPConnection` / `taskkill` via PowerShell, since `lsof` wasn't reliably available in this shell) before retesting — a reminder to verify *which* process answered before trusting a "it's broken" result.

**Verification:** Backend — 40/40 unit/route tests passing, lint clean, and a full curl-driven permission matrix across all three roles and every new endpoint (student blocked from course create/enroll/update with 403, teacher blocked from course edit with 403, admin allowed everywhere, duplicate enrollment → 409, dropping a non-enrolled student → 404). Frontend — lint clean, 5/5 tests passing, build succeeds, and a three-role Playwright walkthrough (teacher creates a course and enrolls/drops a student with no Edit button visible; admin edits that same course; student sees zero management controls anywhere) with zero console errors.

---

## Post-Week-3 — Second Theme Pass: New Palette, Button System, Micro-interactions

**Prompt given to Claude Code:**
> "Change the color again, adjust the buttons properly, use the correct font, and make the UI interactive with changes in the code and logic."

**Clarified before starting** (to avoid another round of guessing on a purely aesthetic ask): a fresh, distinct palette vs. refining the existing one; whether "buttons" meant sizing/spacing or a full redesign; and what "interactive" meant concretely (hover/click animations, page transitions, or both). Answers: fresh palette, full button redesign, hover/click animations.

**Outcome:**
- Replaced the teal/amber palette from the previous pass with green/gold (every hardcoded rgba value again, not just the CSS custom properties — the same category of miss as the first color pass), and swapped the Sora heading font for Plus Jakarta Sans
- Rebuilt the shared `.btn` system in `index.css`: larger touch targets, a snappy cubic-bezier hover lift, a scale-down press state, `:focus-visible` rings for keyboard users, and a new `.btn-lg` size
- Added a `.card-interactive` utility and applied it to `CoursesPage`/`AboutPage` cards that didn't have hover feedback yet; extended the existing `HomePage`/`StudentsPage` card hovers with icon/avatar micro-animations (scale, slight rotation) and the same snappy easing as the buttons, so the whole interaction language is consistent
- Navbar logo tilts on hover, nav links lift slightly, the register page's role-picker cards now respond to hover instead of only to selection

**Verification:** lint clean, 5/5 tests passing, build succeeds, and a Playwright pass across Home, Login, Register, Students, Courses, and About — including capturing hover states — with zero console errors.

---

## Phase 1 Completion Summary

All Phase 1 (Weeks 1–3) requirements from the internship plan are satisfied:

✅ SPA with 5 routes and a shared layout (Home, Students, About, Login, 404)
✅ Client-side validated form + ESLint/Prettier clean pass
✅ 5 frontend unit tests (Vitest + RTL)
✅ CRUD REST API with an ORM-modeled relationship (`User → Student`)
✅ Input validation and correct HTTP status codes
✅ JWT authentication + role-based authorization (`ADMIN` / `TEACHER`)
✅ Frontend connected to the backend — full CRUD workflow with login
✅ 30 backend tests covering auth, CRUD, and error paths (well past the 5-test minimum)
✅ One end-to-end integration test against the real database
✅ Single consolidated `prompts.md` log across all three weeks
