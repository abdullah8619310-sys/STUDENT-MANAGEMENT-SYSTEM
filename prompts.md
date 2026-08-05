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
