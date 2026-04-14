import { PrismaClient } from "@prisma/client"
import { PrismaLibSQL } from "@prisma/adapter-libsql"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrisma(): PrismaClient {
  const url = process.env.DATABASE_URL ?? ""
  const isTurso =
    url.startsWith("libsql://") ||
    url.startsWith("wss://") ||
    url.startsWith("https://")

  if (isTurso) {
    const adapter = new PrismaLibSQL({
      url,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    })
    return new PrismaClient({ adapter } as never)
  }

  return new PrismaClient()
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrisma()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
