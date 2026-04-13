import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrisma(): PrismaClient {
  const url = process.env.DATABASE_URL ?? ""
  const isTurso =
    url.startsWith("libsql://") ||
    url.startsWith("wss://") ||
    url.startsWith("https://")

  if (isTurso) {
    // Lazy import para não quebrar o bundle client-side
    const { PrismaLibSQL } = require("@prisma/adapter-libsql")
    const { createClient } = require("@libsql/client")

    const client = createClient({
      url,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    })
    const adapter = new PrismaLibSQL(client)
    return new PrismaClient({ adapter } as never)
  }

  return new PrismaClient()
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrisma()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
