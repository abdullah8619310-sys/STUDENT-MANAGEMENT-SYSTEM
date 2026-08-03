import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

// Create PostgreSQL adapter using Neon DATABASE_URL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// Create a single Prisma Client instance
export const prisma = new PrismaClient({ adapter });