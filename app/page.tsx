"use client"

import { useState } from "react"
import { Scale } from "lucide-react"
import AnalyzerForm from "@/components/analyzer-form"
import { AnalysisResult } from "@/types/analysis"

export default function Home(): React.ReactElement {
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState("")

  function handleReset(): void {
    setResult(null)
    setError("")
  }

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-5 sm:px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700">
            <Scale className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight text-white">
              LexAnalyzer
            </h1>
            <p className="mt-0.5 text-xs text-slate-400">
              Análisis inteligente de documentos legales
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {!result ? (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-800">
                Análisis de Contrato
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Ingresa el contenido del documento legal para obtener un análisis estructurado generado por IA.
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <AnalyzerForm
              onResult={(data) => { setResult(data); setError("") }}
              onError={setError}
            />
          </>
        ) : (
          // Analysis result cards — rendered in Stage 4
          <div className="flex flex-col items-center gap-4 py-16">
            <p className="text-sm text-slate-500">Resultados listos. (Stage 4)</p>
            <button
              onClick={handleReset}
              className="text-sm font-medium text-blue-700 underline underline-offset-2 hover:text-blue-900"
            >
              Nueva consulta
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4">
        <p className="text-center text-xs text-slate-400">
          LexAnalyzer · Impulsado por{" "}
          <span className="font-medium text-slate-500">Claude AI</span>
        </p>
      </footer>
    </div>
  )
}
