# AI Prompts Log

## Week 2 - Task 1: Backend Project Setup

**Prompt used:**

"Guide me through setting up a Node.js + Express backend project for the Student Management System, one task at a time. Explain the concept, why it's needed, and where it fits before generating code. Use clean architecture with a src/ folder structure (config, routes, controllers, middlewares) to prepare for Prisma + PostgreSQL integration in later tasks."

**AI-assisted output reviewed and verified:**

- Initialized Node.js backend project
- Installed Express, dotenv, cors, and nodemon
- Created clean src folder structure
- Configured ES Modules
- Created Express app and server entry point
- Added health-check endpoint (/api/health)
- Tested API response successfully

#c

### Task 2 Progress Update

**Additional AI-assisted steps completed:**

- Verified Prisma 7 migration workflow
- Confirmed successful connection with Neon PostgreSQL
- Created database tables through Prisma migration
- Generated Prisma Client successfully
- Reviewed Prisma 7 changes compared to older Prisma versions

### Task 2 Completion Update

**Additional AI-assisted output reviewed and verified:**

- Installed Prisma 7 PostgreSQL driver adapter (`@prisma/adapter-pg`)
- Configured reusable Prisma Client instance in `src/config/db.js`
- Verified database connection with Neon PostgreSQL
- Tested Prisma queries successfully
- Confirmed Prisma 7 runtime setup works with the Express backend

## Week 2 - Task 3: Student CRUD REST API Implementation

**Prompt used:**
"Guide me through building a REST CRUD API for the Student Management System backend using Express 5, Prisma 7, and PostgreSQL. Implement proper REST resource design, routing, controllers, database operations, status codes, and error handling."

**AI-assisted output reviewed and verified:**

- Designed REST resources for Student entity
- Created Express Router for student endpoints
- Implemented POST /api/students endpoint
- Implemented GET /api/students and GET /api/students/:id endpoints
- Implemented PUT and DELETE student endpoints
- Connected controllers with Prisma Client
- Added Prisma error handling middleware
- Tested CRUD operations with PostgreSQL database
- Verified API responses and status codes

---

## Week 2 - Input Validation with Zod

**Prompt used:**
"Guide me through adding input validation and error handling to my Express 5 backend using Zod. Implement reusable validation schemas, middleware-based validation, and proper HTTP 400 responses for invalid requests."

**AI-assisted output reviewed and verified:**

- Installed and configured Zod validation library
- Created Student validation schema using Zod
- Implemented reusable validation middleware using `safeParse`
- Added structured validation error responses with HTTP 400 status
- Connected validation middleware with Student POST and PUT routes
- Tested invalid requests with missing fields and incorrect data types
- Tested valid requests after adding validation
- Verified that invalid data is rejected before reaching Prisma/database

---

## Week 2 - ESLint and Prettier Configuration

**Prompt used:**
"Guide me through configuring ESLint and Prettier for my Express 5 + Node.js backend project using ES Modules. Set up a modern ESLint flat configuration, ignore generated Prisma files, and ensure the project passes linting successfully."

**AI-assisted output reviewed and verified:**

- Installed ESLint, Prettier, and required configuration packages
- Created `eslint.config.js` using the modern ESLint flat config approach
- Configured ESLint for Node.js and ES Modules environment
- Added ignore rules for generated Prisma files and node_modules
- Fixed linting issues in backend files
- Added `lint` and `format` scripts in `package.json`
- Ran `npm run lint` successfully with zero errors
- Ran `npm run format` successfully to format project files

---

## Week 2 - Backend Unit Testing with Vitest

**Prompt used:**
"Guide me through writing AI-assisted unit tests for my Express 5 + Prisma 7 backend. Use Vitest with mocked Prisma Client so tests verify controller logic without depending on the real database."

**AI-assisted output reviewed and verified:**

- Installed testing dependencies:
  - Vitest
  - vitest-mock-extended
  - Supertest

- Configured Vitest testing environment for the Express backend

- Added test scripts in `package.json`:
  - `npm test` for running tests once
  - `npm run test:watch` for watch mode

- Created Prisma Client mock using `vitest-mock-extended`

- Added reusable Prisma mock file:
  - `src/config/__mocks__/db.js`

- Mocked Prisma Client to avoid using the real PostgreSQL/Neon database during unit tests

- Created the first unit test file:
  - `src/controllers/student.controller.test.js`

- Implemented and tested `createStudent` controller success case

- Verified controller behavior using mocked Prisma responses

- Confirmed unit tests run successfully with:
  - `npm test`

- Verified tests pass without database dependency

---

## Week 2 - Backend Unit Testing with Vitest (Controller Tests)

**Prompt used:**
"Guide me through writing AI-assisted unit tests for my Express 5 + Prisma 7 backend. Use Vitest with mocked Prisma Client so tests verify controller logic without depending on the real database."

**AI-assisted output reviewed and verified:**

- Installed and configured Vitest testing framework
- Added Vitest scripts for running tests
- Configured Prisma Client mocking using `vitest-mock-extended`
- Created reusable Prisma mock inside `src/config/__mocks__/db.js`
- Created unit test for `createStudent` controller success scenario
- Verified Prisma `create` method is called with correct data
- Verified HTTP 201 response and returned student object
- Improved test isolation by replacing `vi.clearAllMocks()` with `mockReset(prisma)`
- Created unit test for `getStudentById` controller not-found scenario
- Verified controller returns HTTP 404 when student does not exist
- Confirmed tests run successfully without database dependency

---

## Week 2 - Backend Unit Testing with Vitest (Controller Test Coverage Expansion)

**Prompt used:**
"Guide me through expanding AI-assisted unit tests for my Express 5 + Prisma 7 backend using Vitest. Continue testing controller logic with mocked Prisma Client. Focus on testing different controller branches and verify responses without depending on the real database."

**AI-assisted output reviewed and verified:**

- Reviewed existing `student.controller.test.js` structure
- Improved Prisma mock reset handling using `mockReset(prisma)` from `vitest-mock-extended`
- Verified Prisma mocking works correctly with `vi.mock("../config/db.js")`
- Added `getStudentById` controller test cases:
  - Verified 404 response when student is not found
  - Verified 200 response when student exists
  - Verified correct Prisma `findUnique` query parameters
- Added `getAllStudents` controller test cases:
  - Verified successful response with student list
  - Verified successful response with empty student array
  - Verified `findMany()` is called correctly
- Confirmed all unit tests pass successfully using `npm test`
- Ensured controller logic is tested independently without database dependency

---

## Week 2 - Backend Unit Testing with Vitest (Controller & Error Handler Tests)

**Prompt used:**
"Guide me through writing AI-assisted unit tests for my Express 5 + Prisma 7 backend. Use Vitest with mocked Prisma Client so tests verify controller logic without depending on the real database. Also test error handling middleware separately."

**AI-assisted output reviewed and verified:**

- Installed and configured Vitest testing framework
- Added test scripts for running backend tests
- Configured Prisma Client mocking using `vitest-mock-extended`
- Created reusable Prisma mock in `src/config/__mocks__/db.js`
- Implemented controller unit tests using mocked Prisma responses
- Tested `createStudent` controller success scenario
- Tested `getStudentById` success and not-found scenarios
- Tested `getAllStudents` response with existing students and empty results
- Tested `updateStudent` success scenario
- Created `errorHandler.test.js` for middleware error handling
- Verified Prisma P2002 duplicate error response (409)
- Verified Prisma P2025 not-found error response (404)
- Verified unknown error response (500)
- Confirmed all tests run successfully without database dependency

**Test verification:**

## Week 2 - Backend Testing Progress Update

Completed:

- Added Prisma mock setup using vitest-mock-extended
- Created reusable mock Prisma client:
  - src/config/**mocks**/db.js

Controller Unit Tests:

- createStudent success test
- getStudentById success and not-found tests
- getAllStudents success and empty-array tests
- updateStudent success test

Error Handling Tests:

- Added errorHandler middleware unit tests
- Tested Prisma P2002 duplicate error
- Tested Prisma P2025 not-found error
- Tested unknown server errors

Supertest Setup:

- Verified Express app testing without starting server
- Added GET /api/health API smoke test
- Confirmed routing and middleware pipeline works

Current Verification:

- npm test ✅
- 10 tests passing

## Supertest Integration Testing

**AI-assisted output reviewed and verified:**

- Verified Express app structure for Supertest compatibility
- Confirmed `app.js` exports Express app without starting the server
- Created Supertest smoke test for:
  - GET /api/health

- Created route-level integration tests for Student APIs
- Used mocked Prisma Client to avoid real database dependency

### Tested API Flows:

#### POST /api/students

- Tested successful student creation
- Verified:
  - Express routing
  - Validation middleware
  - Controller execution
  - Mocked Prisma response
  - HTTP 201 response

- Tested duplicate email scenario:
  - Prisma P2002 error simulation
  - Verified Express error forwarding
  - Verified errorHandler returns HTTP 409 response

#### GET /api/students

- Tested successful student list retrieval
- Verified:
  - Route configuration
  - Controller execution
  - Prisma findMany mock response
  - HTTP 200 response

#### PUT /api/students/:id

- Tested updating a non-existent student
- Simulated Prisma P2025 error
- Verified:
  - Controller error forwarding
  - Express 5 async error handling
  - errorHandler returns HTTP 404 response

## Final Testing Verification

Testing stack:

- Vitest
- Supertest
- vitest-mock-extended
- Mocked Prisma Client

Final Test Result:

Test Files: 4 passed  
Tests: 14 passed ✅

All Week 2 backend testing tasks have been completed successfully.

---

# Week 2 Final Completion Summary

Completed Week 2 backend requirements:

✅ Express 5 backend setup  
✅ Prisma 7 ORM integration with PostgreSQL  
✅ Student CRUD REST API  
✅ User-Student relationship  
✅ Zod input validation  
✅ Centralized error handling  
✅ ESLint + Prettier configuration  
✅ Vitest unit testing  
✅ Supertest API integration testing  
✅ AI-assisted tests reviewed and verified

Final Verification:

- npm test ✅
- npm run lint ✅

Testing Result:

Test Files: 4 passed
Tests: 14 passed


---

# Week 3 - Authentication, Authorization, Integration & Testing

## Week 3 - JWT Authentication

**Prompt used:**

"Guide me through adding JWT-based authentication to my existing Express 5 + Prisma 7 Student Management System backend. Explain authentication concepts before implementing them. Add secure password hashing, user registration, login, JWT generation, and authentication middleware. Keep the implementation consistent with the existing project structure."

**AI-assisted output reviewed and verified:**

- Added user authentication using JWT
- Added password hashing with bcrypt
- Implemented user registration endpoint
- Implemented user login endpoint
- Added JWT token generation utility
- Added JWT authentication middleware
- Added protected API routes
- Ensured passwords are not returned in login responses
- Verified invalid credentials return HTTP 401
- Tested authentication middleware with valid, missing, and invalid tokens

---

## Week 3 - Role-Based Authorization

**Prompt used:**

"Guide me through adding role-based authorization to my existing JWT authentication system. Implement reusable authorization middleware so different user roles can access different backend operations. Explain how authentication and authorization work together before generating the code."

**AI-assisted output reviewed and verified:**

- Added reusable `authorize` middleware
- Used user role information from the verified JWT
- Added role-based protection for Student API operations
- Restricted create, update, and delete operations to ADMIN users
- Verified unauthorized users receive HTTP 403
- Verified unauthenticated requests receive HTTP 401
- Added unit tests for authorization middleware
- Confirmed authorization works together with JWT authentication

---

## Week 3 - Frontend and Backend Integration

**Prompt used:**

"Guide me through connecting my existing React Student Management System frontend to the Express + Prisma backend. Keep the existing frontend structure and connect authentication and Student CRUD operations to the real backend API. Explain each integration step before implementing it."

**AI-assisted output reviewed and verified:**

- Connected React frontend to the Express backend
- Connected login functionality to the backend authentication API
- Stored and used JWT authentication information on the frontend
- Added authenticated API requests
- Connected Student list retrieval to the backend
- Connected student creation to the backend
- Connected student update to the backend
- Connected student deletion to the backend
- Added role-based UI behavior for admin users
- Verified the complete Student CRUD workflow through the frontend
- Confirmed frontend data is persisted through the backend and PostgreSQL database

---

## Week 3 - Authentication and CRUD API Tests

**Prompt used:**

"Guide me through expanding the backend test suite for JWT authentication, role-based authorization, Student CRUD routes, and error handling. Use Vitest and Supertest. Mock Prisma where appropriate for unit and route tests, and verify successful and failure scenarios."

**AI-assisted output reviewed and verified:**

- Added authentication controller tests
- Added password utility tests
- Added JWT token utility tests
- Added authentication middleware tests
- Added authorization middleware tests
- Expanded Student controller tests
- Added Student route tests using Supertest
- Added error handler tests
- Tested successful authentication
- Tested invalid authentication scenarios
- Tested role-based authorization
- Tested successful Student creation
- Tested duplicate email error handling
- Tested Student retrieval
- Tested non-existent Student update
- Tested Prisma P2002 duplicate error
- Tested Prisma P2025 not-found error
- Tested unexpected server errors

---

## Week 3 - End-to-End Integration Test

**Prompt used:**

"Guide me through creating an integration test for the Student Management System that tests the happy path end-to-end using the real PostgreSQL database. The test should create a temporary admin user, authenticate through the login endpoint, receive a real JWT, and use that JWT to create a student through the protected Student API."

**AI-assisted output reviewed and verified:**

- Created `src/integration.test.js`
- Used the real PostgreSQL database for the integration test
- Created a temporary ADMIN user during the test
- Hashed the test user's password using bcrypt
- Logged in through the real `/api/auth/login` endpoint
- Received and verified a real JWT
- Used the JWT in the Authorization header
- Created a student through the protected `/api/students` endpoint
- Verified the created student's data
- Cleaned up the temporary student and user after the test
- Confirmed the complete authentication-to-CRUD happy path works

### Integration Test Result

- Integration test passed successfully
- Test Files: 1 passed
- Tests: 1 passed
- Real PostgreSQL database connection verified

---

## Week 3 - Final Test Verification

Testing stack:

- Vitest
- Supertest
- vitest-mock-extended
- Prisma 7
- PostgreSQL / Neon
- bcrypt
- JSON Web Tokens

Final Verification:

- `npm test` ✅
- `npx vitest run src/integration.test.js` ✅

Final Test Result:

- Test Files: 10 passed
- Tests: 31 passed
- Failed Tests: 0

The Week 3 authentication, authorization, frontend/backend integration, API testing, and end-to-end integration requirements were successfully completed and verified.

---

# Week 3 Final Completion Summary

Completed Week 3 requirements:

✅ JWT authentication  
✅ Password hashing with bcrypt  
✅ User registration and login  
✅ JWT authentication middleware  
✅ Role-based authorization  
✅ Admin-only Student CRUD operations  
✅ React frontend connected to backend  
✅ Full Student CRUD workflow through frontend  
✅ Authentication and CRUD API tests  
✅ Error-path testing  
✅ End-to-end integration test  
✅ Real PostgreSQL integration verification  
✅ Updated AI prompts log  

Final Verification:

- `npm test` ✅
- Test Files: 10 passed
- Tests: 31 passed
- Failed Tests: 0

---

# Post-Week-3 — Repository Consolidation & Code Review

**Prompt used:**

"Consolidate this backend repo and the separate frontend repo into a single monorepo (`frontend/` + `backend/`), preserving git history, and fix the issues found during review."

**AI-assisted output reviewed and verified:**

- Committed a pending uncommitted change to `prisma/schema.prisma` (the `Role` enum and formatting) that existed on disk but had never been committed — without this, the subtree merge would have carried a schema out of sync with the actual controller/middleware code
- Imported this repo's full commit history into `STUDENT-MANAGEMENT-SYSTEM/backend/` via `git subtree`, so Week 2 + Week 3 history stays intact in the merged repo instead of being flattened
- **Found and fixed:** `POST /api/auth/register` and `POST /api/auth/login` imported `registerSchema`/`loginSchema` from `auth.validator.js` but never wired them into the routes — the endpoints accepted completely unvalidated request bodies. Added `validate(registerSchema)` / `validate(loginSchema)` to `auth.routes.js`. Verified with `curl`: a malformed register request (missing name/password, invalid email) now correctly returns `400` with field-level Zod errors instead of being accepted or crashing
- **Found and fixed a data-integrity gap:** `createStudent`/`updateStudent` trusted a client-supplied `userId` in the request body, so any authenticated `ADMIN` could attribute a student to an arbitrary user id. Removed `userId` from `student.validator.js`'s schemas and changed `createStudent` to take it from `req.user.userId` (the authenticated token) instead; `updateStudent` no longer accepts a `userId` change at all. Verified against the real database: logged in as an admin, sent `userId: 999` in the create payload, and confirmed the persisted student's `userId` was the admin's real id (13), not the spoofed value — then cleaned up the test user/student
- Documented `DATABASE_URL` and `JWT_SECRET` in `.env.example` (previously only `PORT` was listed, so a fresh clone had no indication these were required)
- Updated `student.controller.test.js`, `student.routes.test.js`, and `integration.test.js` for the new contract (no client-supplied `userId`)

**Verification:**

- `npm run lint` ✅ (clean)
- `npx vitest run --exclude "**/integration.test.js"` — 9 files / 30 tests passing
- Manual smoke test against the real Neon Postgres database (register → login → role-check 403 → validation 400 → admin create with spoofed `userId` ignored → cleanup)