import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { extractTextFromFile } from "@/lib/extract-text"
import { AnalysisResult, OutputLanguage } from "@/types/analysis"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are an expert legal analyst specializing in Chilean and Latin American law.
Analyze the provided legal document and return ONLY a valid JSON object
(no markdown, no explanation) with this exact structure:

{
  "resumen_ejecutivo": "string",
  "partes": {
    "parte_a": "string",
    "parte_b": "string"
  },
  "obligaciones": {
    "parte_a": ["string"],
    "parte_b": ["string"]
  },
  "clausulas_de_riesgo": [
    {
      "clausula": "string",
      "descripcion": "string",
      "severidad": "Alta | Media | Baja"
    }
  ],
  "alertas_legales": ["string"],
  "recomendaciones": ["string"]
}

Respond entirely in the following language: {SELECTED_LANGUAGE}`

export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = request.headers.get("x-app-secret")
  if (!secret || secret !== process.env.APP_SECRET) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 })
  }

  let documentText: string
  let language: OutputLanguage = "Chilean Spanish"

  const contentType = request.headers.get("content-type") ?? ""

  try {
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData()
      const file = formData.get("file") as File | null
      const lang = formData.get("language") as OutputLanguage | null

      if (!file) {
        return NextResponse.json(
          { error: "No se recibió ningún archivo." },
          { status: 400 }
        )
      }

      documentText = await extractTextFromFile(file)
      if (lang) language = lang
    } else {
      const body = await request.json()
      if (!body.text || typeof body.text !== "string") {
        return NextResponse.json(
          { error: "El campo 'text' es requerido." },
          { status: 400 }
        )
      }
      documentText = body.text
      if (body.language) language = body.language
    }

    if (!documentText.trim()) {
      return NextResponse.json(
        { error: "El documento está vacío o no se pudo extraer texto." },
        { status: 400 }
      )
    }

    const systemPrompt = SYSTEM_PROMPT.replace("{SELECTED_LANGUAGE}", language)

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: "user", content: documentText }],
    })

    const rawContent = message.content[0]
    if (rawContent.type !== "text") {
      throw new Error("Unexpected response type from Claude API")
    }

    // Strip markdown code blocks if the model wraps the JSON
    const cleaned = rawContent.text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim()
    const result: AnalysisResult = JSON.parse(cleaned)
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Error al procesar la respuesta del análisis. Intenta nuevamente." },
        { status: 502 }
      )
    }

    console.error("[/api/analyze]", error)
    return NextResponse.json(
      { error: "Ocurrió un error inesperado. Por favor, intenta más tarde." },
      { status: 500 }
    )
  }
}
