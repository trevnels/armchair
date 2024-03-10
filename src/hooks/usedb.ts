import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

const prismaClientSingleton = () => {
    neonConfig.webSocketConstructor = ws
    const connectionString = `${process.env.DATABASE_URL}`

    const pool = new Pool({ connectionString: connectionString, connectionTimeoutMillis: 10000 })
    const adapter = new PrismaNeon(pool)

    const client = new PrismaClient({ adapter })
    return client
}


declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma