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