import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCapStatus } from "@/lib/usage"
import { randomBytes } from "crypto"

function generateCode(): string {
  // Formato: LX-XXXX-XXXX (letras maiúsculas + dígitos)
  const part = () => randomBytes(2).toString("hex").toUpperCase()
  return `LX-${part()}-${part()}`
}

/** POST /api/admin/codes — gera um novo código de acesso (requer APP_SECRET) */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.headers.get("x-app-secret")
  if (!secret || secret !== process.env.APP_SECRET) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 })
  }

  const code = generateCode()
  const created = await prisma.accessCode.create({
    data: { code },
  })

  return NextResponse.json({ code: created.code, maxUsage: created.maxUsage })
}

/** GET /api/admin/codes — lista todos os códigos e status do cap (requer APP_SECRET) */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const secret = req.headers.get("x-app-secret")
  if (!secret || secret !== process.env.APP_SECRET) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 })
  }

  const [codes, cap] = await Promise.all([
    prisma.accessCode.findMany({ orderBy: { createdAt: "desc" } }),
    getCapStatus(),
  ])

  return NextResponse.json({ cap, codes })
}
