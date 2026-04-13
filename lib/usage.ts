import { prisma } from "@/lib/db"

export type CodeValidationResult =
  | { ok: true; codeId: number }
  | { ok: false; error: string; status: number }

/** Valida o código de acesso e o cap global em uma transação. */
export async function validateAndReserve(
  code: string
): Promise<CodeValidationResult> {
  return prisma.$transaction(async (tx) => {
    // 1. Verifica cap global
    const counter = await tx.globalCounter.findUnique({ where: { id: 1 } })
    if (!counter) {
      return { ok: false, error: "Sistema não inicializado.", status: 500 }
    }
    if (counter.count >= counter.cap) {
      return {
        ok: false,
        error:
          "El límite de demostraciones disponibles ha sido alcanzado. Contacta al desarrollador para más información.",
        status: 403,
      }
    }

    // 2. Verifica o código
    const accessCode = await tx.accessCode.findUnique({ where: { code } })
    if (!accessCode) {
      return { ok: false, error: "Código de acceso inválido.", status: 401 }
    }
    if (accessCode.usageCount >= accessCode.maxUsage) {
      return {
        ok: false,
        error: "Este código ya fue utilizado el máximo de veces permitido.",
        status: 403,
      }
    }

    // 3. Incrementa ambos contadores
    await tx.accessCode.update({
      where: { id: accessCode.id },
      data: { usageCount: { increment: 1 } },
    })
    await tx.globalCounter.update({
      where: { id: 1 },
      data: { count: { increment: 1 } },
    })

    return { ok: true, codeId: accessCode.id }
  })
}

/** Retorna o status atual do cap global (para exibir na UI). */
export async function getCapStatus(): Promise<{ used: number; cap: number }> {
  const counter = await prisma.globalCounter.findUnique({ where: { id: 1 } })
  return { used: counter?.count ?? 0, cap: counter?.cap ?? 20 }
}
