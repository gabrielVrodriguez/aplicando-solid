import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'
import { Pool } from 'pg'
import { env } from "../src/env/index";

const connectionString = `${env.DATABASE_URL}`

const pool = new Pool({ connectionString })

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export { prisma }