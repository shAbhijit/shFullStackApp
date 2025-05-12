import { PrismaClient } from '@prisma/client'
import { clearDB } from './utils/clear-db'

process.env.DATABASE_URL = `postgres://username:password@localhost:5433/postgres`
const oneMinute = 60 * 1000

const prismaClient = new PrismaClient({
  log: ['info', 'warn', 'error' /*, query*/],
})
jest.setTimeout(oneMinute)

// Clear the database before each test (wait up to 60 seconds for the operation to complete)
beforeEach(async () => await clearDB(prismaClient), oneMinute)
afterAll(async () => await prismaClient.$disconnect(), oneMinute)