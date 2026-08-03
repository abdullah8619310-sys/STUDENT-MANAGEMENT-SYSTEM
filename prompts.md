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

## Week 2 - Task 2: Prisma ORM & Initial Database Migration

**Prompt used:**
"Guide me through setting up Prisma ORM with PostgreSQL for the Student Management System. Explain ORM concepts, configure Prisma, define User and Student models with a one-to-many relationship, and create the initial migration."

**AI-assisted output reviewed and verified:**
- Installed Prisma CLI and Prisma Client
- Connected Prisma to Neon PostgreSQL
- Defined User and Student models
- Added one-to-many User → Student relationship
- Created and applied the initial Prisma migration
- Generated Prisma Client successfully