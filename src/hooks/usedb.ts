import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({connectionString: connectionString, connectionTimeoutMillis: 10000})
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({adapter})

export default function useDb() {
    return prisma
}