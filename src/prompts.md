# prompts.md

## AI-Assisted Development Log — Student Management System

This document records the AI-assisted development process for the **Student Management System**, built as part of the Arbisoft AI Internship 2026 (Web Track) — Week 1 deliverable. Claude (Anthropic) was used as a mentor-style pair-programming assistant throughout development, guiding design decisions, explaining core concepts, and generating code incrementally with review at each step.

---

## 1. Project Overview

**Project Name:** Student Management System

**Technology Stack:**
- React + Vite
- React Router (`react-router-dom`)
- JavaScript (no TypeScript)
- CSS (plain, component-scoped)
- Vitest + React Testing Library
- ESLint + Prettier

**Purpose:**
The Student Management System is a small Single Page Application (SPA) for managing student registrations. It allows a user to view a list of currently registered students and register new students through a form with client-side validation (required fields, valid email format, minimum age of 18). Data is stored in-memory using React state only — no backend or database is connected yet, as this is the Week 1 milestone. The project is architected so that a backend/API layer can be integrated cleanly in Week 2 without restructuring existing code (via dedicated `services/` and `hooks/` folders reserved for that purpose).

---

## 2. Development Prompt Log

### Step 1 — Initial React + Vite Project Setup
**Purpose:** Scaffold a new React project using Vite as the build tool, following the internship's Week 1 requirement to use modern tooling.

**Prompt given to Claude:**
> "I am participating in the Arbisoft AI Internship 2026 (Web Track). For Week 1, I need to complete the following tasks: Set up a React project using Vite, build a Single Page Application (SPA), create at least 3 routes, use a shared Navbar/Layout, build one form with client-side validation, configure ESLint and Prettier, write at least 3 unit tests, maintain good folder structure, and follow React best practices. Act as my senior software engineer and mentor. Teach me one step at a time... Help me build a Student Management System."

**Outcome:** Claude explained why Vite was chosen over Create React App, then provided the `npm create vite@latest` scaffolding command using the React (JavaScript) template. The dev server was verified running locally before proceeding.

---

### Step 2 — Creating a Professional Folder Structure
**Purpose:** Design a scalable, industry-standard folder structure before writing any application code, so that Week 2 (backend integration) would not require reorganizing the project.

**Prompt given to Claude:**
> "Before writing any code, design the complete folder structure. Explain every folder... and whether it will be useful in future internship weeks."

**Outcome:** Claude proposed and explained a structure with `components/`, `pages/`, `layouts/`, `routes/`, `hooks/`, `services/`, `utils/`, `styles/`, and `tests/` — each justified individually, including which folders (`services/`, `hooks/`) were intentionally created empty in anticipation of Week 2's backend work.

---

### Step 3 — Setting Up React Router and SPA Routing
**Purpose:** Install and understand React Router's core building blocks before implementing routing, to satisfy the "SPA with at least 3 routes" requirement.

**Prompt given to Claude:**
> "Help me implement React Router. Requirements: Home, Students, About, 404 Page, Shared Navbar, Shared Layout. Explain: BrowserRouter, Routes, Route, Outlet, Link, NavLink, useNavigate. Don't continue until I understand routing."

**Outcome:** Claude explained each React Router primitive conceptually (including the role of `Outlet` in enabling shared layouts) before any code was written, and confirmed understanding via a comprehension check before proceeding to implementation.

---

### Step 4 — Creating the Shared Layout Component
**Purpose:** Build a single wrapper component that renders the Navbar once and injects the active page via `Outlet`, avoiding duplicated navigation markup across pages.

**Prompt given to Claude:**
> (Continuation of routing setup) "Create a reusable Navbar component. Explain: Why components exist, why reusability matters, how React renders components, best practices for organizing components."

**Outcome:** `src/layouts/Layout.jsx` was created, using `<Outlet />` inside a semantic `<main>` element, with `<Navbar />` rendered once above it.

---

### Step 5 — Creating the Shared Navbar Component
**Purpose:** Build the site-wide navigation bar with active-link highlighting, reusable across every page via the Layout.

**Prompt given to Claude:**
> "Create a reusable Navbar component... Explain component reusability, how React renders components, and best practices for organizing components."

**Outcome:** `src/components/Navbar/Navbar.jsx` and `Navbar.css` were created using `NavLink` (with the `end` prop on the Home link to prevent incorrect active-state matching), following a folder-per-component convention.

---

### Step 6 — Creating Home, Students, About, and NotFound Pages
**Purpose:** Build the individual page components that will be rendered into the Layout's `Outlet`, satisfying the "at least 3 routes" requirement plus a 404 fallback.

**Prompt given to Claude:**
> "Help me implement React Router... Home, Students, About, 404 Page..." (continued from Step 3's routing prompt, page components requested as part of the same routing implementation).

**Outcome:** `HomePage.jsx`, `AboutPage.jsx`, `NotFoundPage.jsx`, and a placeholder `StudentsPage.jsx` were created, each in its own folder under `src/pages/`, using semantic HTML and a catch-all `path="*"` route for 404 handling.

---

### Step 7 — Wiring Up Routes in App.jsx and main.jsx
**Purpose:** Centralize route configuration in a dedicated file and correctly place `BrowserRouter` at the application's true entry point.

**Prompt given to Claude:** *(continuation of Step 3's routing request — implementation phase)*

**Outcome:** `src/routes/AppRoutes.jsx` was created with nested routes (`Layout` as parent, `HomePage`/`StudentsPage`/`AboutPage`/`NotFoundPage` as children using an `index` route for Home). `main.jsx` was updated to wrap `<App />` in `<BrowserRouter>`, and `App.jsx` was simplified to only render `<AppRoutes />`.

---

### Step 8 — Creating the Student Registration Form
**Purpose:** Build the form required by the internship task, using controlled components as per React best practices.

**Prompt given to Claude:**
> "Create a Student Registration Form. Fields: Name, Email, Department, Age. Validation: Required fields, Valid email, Minimum age 18. Show inline error messages. Explain: Controlled Components, State, onChange, onSubmit, Validation logic, How React updates the UI."

**Outcome:** Claude explained controlled components and the single-object form-state pattern with a generic `onChange` handler, before implementation.

---

### Step 9 — Creating Reusable Validation Functions
**Purpose:** Extract validation logic into pure, testable utility functions rather than embedding it directly inside the form component.

**Prompt given to Claude:** *(continuation of Step 8's form-building request)* "Continue with validators.js."

**Outcome:** `src/utils/validators.js` was created with `isRequired`, `isValidEmail`, `isMinimumAge`, and a combined `validateStudentForm` function returning a field-keyed errors object — designed specifically to be unit-testable in isolation.

---

### Step 10 — Adding Client-Side Form Validation to StudentsPage
**Purpose:** Wire the validation utilities into the actual `StudentsPage` component with controlled inputs, inline error display, and in-memory student list state.

**Prompt given to Claude:** *(continuation of Step 8)* "next"

**Outcome:** `src/pages/StudentsPage/StudentsPage.jsx` and `StudentsPage.css` were completed — replacing the earlier placeholder — with `useState` for `students`, `formData`, and `errors`; a generic `handleChange`; a validating `handleSubmit`; and conditional inline error rendering (`{errors.field && <span>...}`) plus a responsive CSS Grid layout for the list/form panels.

---

### Step 11 — Configuring ESLint
**Purpose:** Set up automated code-quality linting to satisfy the "configure ESLint and Prettier" requirement.

**Prompt given to Claude:**
> "Help me configure ESLint and Prettier." *(as part of the original Week 1 requirements list)*

**Outcome:** Claude reviewed Vite's default-generated `eslint.config.js` (flat config format) and verified `eslint-config-prettier` was correctly included last in the `extends` array to prevent rule conflicts with Prettier.

---

### Step 12 — Configuring Prettier
**Purpose:** Set up consistent code formatting across the project, separate from ESLint's correctness checks.

**Prompt given to Claude:** *(same requirement, continued)*

**Outcome:** `.prettierrc` was reviewed (semicolons on, single quotes, 2-space tabs, ES5 trailing commas) and a `format` script (`prettier --write .`) was added to `package.json` alongside the existing `lint` script.

---

### Step 13 — Fixing File Naming/Casing Issues
**Purpose:** Resolve inconsistent folder/file casing (`Aboutpage` vs `AboutPage`, `studentspage.jsx` vs `StudentsPage.jsx`) discovered via `prettier --check`, which could break imports on case-sensitive deployment environments (e.g., Linux CI/hosting).

**Prompt given to Claude:** *(raised proactively during Prettier configuration review, based on `prettier --check .` output)*

**Outcome:** All page folders/files were renamed to consistent PascalCase (`HomePage`, `AboutPage`, `StudentsPage`) using `git mv` in two steps to work around Windows' case-insensitive filesystem, and corresponding imports were verified.

---

### Step 14 — Setting Up Vitest and React Testing Library
**Purpose:** Install and configure a test runner and component-testing utilities compatible with the existing Vite setup, to satisfy the "at least 3 unit tests" requirement.

**Prompt given to Claude:** *(part of original Week 1 requirements; testing setup requested directly)*

**Outcome:** Installed `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, and `@testing-library/user-event`. Added a `test` block to `vite.config.js` (`environment: 'jsdom'`, `setupFiles: './src/setupTests.js'`), and created `src/setupTests.js` importing `@testing-library/jest-dom/vitest` to register custom DOM matchers for Vitest.

---

### Step 15 — Creating Unit Tests for validators.js
**Purpose:** Test the pure validation functions in isolation with both valid and invalid inputs.

**Prompt given to Claude:** *(part of the testing setup task)*

**Outcome:** `src/tests/validators.test.js` was created, testing `isRequired`, `isValidEmail`, and `isMinimumAge` with true/false case pairs (e.g., a valid email string vs. a malformed one; age 20 vs. age 15).

---

### Step 16 — Creating Unit Tests for the Navbar Component
**Purpose:** Verify the Navbar renders all expected navigation links, using React Testing Library's user-facing query approach.

**Prompt given to Claude:** *(part of the testing setup task)*

**Outcome:** `src/tests/Navbar.test.jsx` was created, rendering `<Navbar />` wrapped in a router context (`BrowserRouter`, later reviewed and recommended to be `MemoryRouter` for proper test isolation) and asserting the "Home", "Students", and "About" links are present via `getByText`.

---

### Step 17 — Creating Unit Tests for StudentsPage Form Validation
**Purpose:** Verify that submitting the registration form empty triggers all four required-field validation error messages.

**Prompt given to Claude:** *(part of the testing setup task)*

**Outcome:** `src/tests/StudentsPage.test.jsx` was created, rendering `<StudentsPage />`, simulating a click on the "Register Student" button via `fireEvent`, and asserting all four inline error messages ("Name is required.", "Email is required.", "Department is required.", "Age is required.") appear in the document.

---

### Step 18 — Running Lint and Test Commands (Verification Pass)
**Purpose:** Confirm the full project passes linting, formatting, and all unit tests before considering Week 1 complete.

**Prompt given to Claude:**
> "Prettier check passed. Lint passed. Application routes tested successfully. Ready for Step 11 Unit Testing." / "npm run test is passing: 3 test files passed, 5 tests passed."

**Outcome:** Claude reviewed the actual test file contents and configuration line-by-line (rather than accepting the confirmation at face value), confirming correct router-context handling in `Navbar.test.jsx`, correct pure-function test design in `validators.test.js`, and correct interaction simulation in `StudentsPage.test.jsx`.

---

### Step 19 — Preparing the Project for GitHub Submission
**Purpose:** Produce a final Week 1 checklist against all nine original requirements, identify any remaining polish items, and document the AI-assisted development process for mentor review.

**Prompt given to Claude:**
> "I need you to create a complete prompts.md file for my Student Management System project. The prompts.md file should document my AI-assisted development process using Claude... suitable for showing to an internship mentor."

**Outcome:** Claude produced a final requirements checklist (all 9 Week 1 requirements confirmed satisfied), flagged minor optional polish items (`MemoryRouter` swap, `.gitkeep` for empty folders, note on `Date.now()` IDs being temporary), and generated this `prompts.md` file.

---

## 3. Development Summary

**What was built:**
A fully functional Single Page Application for managing student registrations, consisting of four routes (Home, Students, About, and a 404 fallback) rendered through a shared Layout with persistent navigation. The centerpiece is the Students page, which displays an in-memory list of registered students and a validated registration form for adding new ones.

**Main features implemented:**
- Client-side routing with React Router (`BrowserRouter`, nested `Routes`/`Route`, `Outlet`-based shared layout)
- Reusable, active-state-aware Navbar using `NavLink`
- Student registration form using controlled components and a single form-state object
- Client-side validation (required fields, email format, minimum age 18) via pure, reusable utility functions
- Inline, field-specific error messaging
- In-memory student list stored and updated via React state (`useState`), with immutable update patterns
- Responsive layout using CSS Flexbox and Grid with media queries

**Tools used:**
- **Vite** — build tool and dev server
- **React Router (`react-router-dom`)** — client-side routing
- **ESLint** (flat config, `eslint-config-prettier`) — code-quality linting
- **Prettier** — automated code formatting
- **Vitest** — test runner, integrated natively with Vite
- **React Testing Library** (`@testing-library/react`, `@testing-library/jest-dom`) — component testing with user-facing queries

**Testing completed:**
Five unit tests across three test files:
1. `validators.test.js` — pure-function tests for required-field, email-format, and minimum-age validation logic
2. `Navbar.test.jsx` — verifies all navigation links render correctly within router context
3. `StudentsPage.test.jsx` — verifies all four validation error messages appear when the registration form is submitted empty

All tests pass (`npm run test`), and the project passes both `npm run lint` and `npx prettier --check .` with no errors.

**Code quality practices followed:**
- Functional components only, no class components
- Folder-per-component convention (co-located `.jsx` and `.css` files)
- Clear separation of concerns: presentational components (`components/`), route-level components (`pages/`), structural wrappers (`layouts/`), route configuration (`routes/`), and pure logic (`utils/`)
- Pure, side-effect-free validation functions, written to be independently testable
- Controlled form inputs with a single generic `onChange` handler
- Immutable state updates (`setState` with spread syntax, functional updater form)
- Semantic HTML (`<main>`, `<nav>`, `<section>`) for accessibility
- Consistent PascalCase file/folder naming to avoid case-sensitivity bugs across operating systems
- Empty `services/` and `hooks/` folders reserved intentionally for Week 2 backend integration, avoiding future restructuring
