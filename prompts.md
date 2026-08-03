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