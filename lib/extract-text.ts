import mammoth from "mammoth"

export async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())

  if (file.type === "text/plain") {
    return buffer.toString("utf-8")
  }

  if (file.type === "application/pdf") {
    // Uses internal path to bypass test-file access issue in serverless (pdf-parse v1)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require("pdf-parse/lib/pdf-parse") as (buffer: Buffer) => Promise<{ text: string }>
    const result = await pdfParse(buffer)
    return result.text
  }

  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer })
    return result.value
  }

  throw new Error("Unsupported file type")
}
