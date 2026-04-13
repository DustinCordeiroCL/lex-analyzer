import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Garante que o GlobalCounter existe com id=1
  await prisma.globalCounter.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, count: 0, cap: 20 },
  })

  console.log("✔ GlobalCounter inicializado (cap=20)")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
