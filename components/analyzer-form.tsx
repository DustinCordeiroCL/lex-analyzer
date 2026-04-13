"use client"

import { useState } from "react"
import { Loader2, Scale, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FileUploadArea from "@/components/file-upload-area"
import { AnalysisResult, InputMode, OutputLanguage } from "@/types/analysis"

const MAX_CHARS = 10000

const LANGUAGE_OPTIONS: { label: string; value: OutputLanguage }[] = [
  { label: "🇨🇱 Español (Chile)", value: "Chilean Spanish" },
  { label: "🇧🇷 Português (Brasil)", value: "Brazilian Portuguese" },
  { label: "🇺🇸 English (US)", value: "American English" },
]

interface AnalyzerFormProps {
  onResult: (result: AnalysisResult) => void
  onError: (message: string) => void
}

export default function AnalyzerForm({ onResult, onError }: AnalyzerFormProps): React.ReactElement {
  const [inputMode, setInputMode] = useState<InputMode>("text")
  const [textContent, setTextContent] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [language, setLanguage] = useState<OutputLanguage>("Chilean Spanish")
  const [isLoading, setIsLoading] = useState(false)
  const [accessCode, setAccessCode] = useState("")

  const isSubmitDisabled =
    isLoading ||
    accessCode.trim().length === 0 ||
    (inputMode === "text" && textContent.trim().length === 0) ||
    (inputMode === "file" && selectedFile === null)

  async function handleSubmit(): Promise<void> {
    setIsLoading(true)
    onError("")

    try {
      let response: Response

      if (inputMode === "file" && selectedFile) {
        const formData = new FormData()
        formData.append("file", selectedFile)
        formData.append("language", language)

        response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "x-access-code": accessCode.trim() },
          body: formData,
        })
      } else {
        response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-code": accessCode.trim(),
          },
          body: JSON.stringify({ text: textContent, language }),
        })
      }

      const data = await response.json()

      if (!response.ok) {
        onError(data.error ?? "Ocurrió un error inesperado.")
        return
      }

      onResult(data as AnalysisResult)
    } catch {
      onError("No se pudo conectar con el servidor. Verifica tu conexión.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Código de acceso */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 bg-slate-50 rounded-t-xl">
        <KeyRound className="h-4 w-4 text-slate-400 shrink-0" />
        <Input
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
          placeholder="Código de acceso — ej: LX-A3F9-K2B1"
          className="h-9 border-slate-200 bg-white font-mono text-sm tracking-wider placeholder:font-sans placeholder:tracking-normal"
          disabled={isLoading}
          maxLength={12}
        />
      </div>

      {/* Mode toggle */}
      <div className="flex border-b border-slate-200">
        {(["text", "file"] as InputMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setInputMode(mode)}
            className={`flex-1 py-3.5 text-sm font-medium transition-colors first:rounded-tl-xl last:rounded-tr-xl ${
              inputMode === mode
                ? "border-b-2 border-blue-700 bg-white text-blue-700"
                : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            }`}
          >
            {mode === "text" ? "Pegar texto" : "Subir archivo"}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="p-5">
        {inputMode === "text" ? (
          <div className="relative">
            <Textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value.slice(0, MAX_CHARS))}
              placeholder="Pega aquí el contenido del contrato o documento legal..."
              className="min-h-52 resize-none border-slate-200 bg-white text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus-visible:ring-blue-700"
              disabled={isLoading}
            />
            <span
              className={`absolute bottom-3 right-3 text-xs tabular-nums ${
                textContent.length >= MAX_CHARS ? "text-red-500" : "text-slate-400"
              }`}
            >
              {textContent.length.toLocaleString()}/{MAX_CHARS.toLocaleString()}
            </span>
          </div>
        ) : (
          <FileUploadArea
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
          />
        )}
      </div>

      {/* Footer: language + submit */}
      <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between rounded-b-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Idioma del análisis</span>
          <Select
            value={language}
            onValueChange={(val) => setLanguage(val as OutputLanguage)}
            disabled={isLoading}
          >
            <SelectTrigger className="h-9 w-full border-slate-200 bg-white text-sm sm:w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="h-10 w-full bg-blue-800 px-6 text-sm font-semibold hover:bg-blue-900 disabled:opacity-50 sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analizando documento...
            </>
          ) : (
            <>
              <Scale className="mr-2 h-4 w-4" />
              Analizar Documento
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
