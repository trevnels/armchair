import {PrismaClient} from "@prisma/client"

export default function useDb() {
    return new PrismaClient()
}