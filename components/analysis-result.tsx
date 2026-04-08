"use client"

import {
  AlertTriangle,
  Bell,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  RefreshCw,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnalysisResult, RiskClause } from "@/types/analysis"

interface AnalysisResultProps {
  result: AnalysisResult
  onReset: () => void
}

const SEVERITY_STYLES: Record<RiskClause["severidad"], string> = {
  Alta: "bg-red-100 text-red-700 border-red-200",
  Media: "bg-amber-100 text-amber-700 border-amber-200",
  Baja: "bg-emerald-100 text-emerald-700 border-emerald-200",
}

function SectionCard({
  icon,
  title,
  accent,
  children,
}: {
  icon: React.ReactNode
  title: string
  accent: string
  children: React.ReactNode
}): React.ReactElement {
  return (
    <Card className={`border-l-4 shadow-sm ${accent}`}>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-600">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">{children}</CardContent>
    </Card>
  )
}

export default function AnalysisResultView({ result, onReset }: AnalysisResultProps): React.ReactElement {
  return (
    <div className="space-y-5">
      {/* Result header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Resultado del Análisis</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Documento analizado con IA — revise el contenido antes de tomar decisiones legales.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={onReset}
          className="w-full shrink-0 border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:w-auto"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Nueva consulta
        </Button>
      </div>

      {/* 1. Resumen Ejecutivo */}
      <SectionCard
        icon={<BookOpen className="h-4 w-4" />}
        title="Resumen Ejecutivo"
        accent="border-l-blue-700"
      >
        <p className="text-sm leading-relaxed text-slate-700">{result.resumen_ejecutivo}</p>
      </SectionCard>

      {/* 2. Partes Involucradas */}
      <SectionCard
        icon={<Users className="h-4 w-4" />}
        title="Partes Involucradas"
        accent="border-l-violet-500"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {(["parte_a", "parte_b"] as const).map((key, i) => (
            <div key={key} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Parte {i === 0 ? "A" : "B"}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800">{result.partes[key]}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 3. Obligaciones */}
      <SectionCard
        icon={<CheckCircle2 className="h-4 w-4" />}
        title="Obligaciones"
        accent="border-l-teal-500"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {(["parte_a", "parte_b"] as const).map((key, i) => (
            <div key={key}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Parte {i === 0 ? "A" : "B"}
              </p>
              <ul className="space-y-1.5">
                {result.obligaciones[key].map((item, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 4. Cláusulas de Riesgo */}
      <SectionCard
        icon={<AlertTriangle className="h-4 w-4" />}
        title="Cláusulas de Riesgo"
        accent="border-l-red-500"
      >
        {result.clausulas_de_riesgo.length === 0 ? (
          <p className="text-sm text-slate-500">No se identificaron cláusulas de riesgo.</p>
        ) : (
          <div className="space-y-3">
            {result.clausulas_de_riesgo.map((clause, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-800">{clause.clausula}</p>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${SEVERITY_STYLES[clause.severidad]}`}
                  >
                    {clause.severidad}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-slate-600">{clause.descripcion}</p>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* 5. Alertas Legales */}
      <SectionCard
        icon={<Bell className="h-4 w-4" />}
        title="Alertas Legales"
        accent="border-l-amber-500"
      >
        {result.alertas_legales.length === 0 ? (
          <p className="text-sm text-slate-500">Sin alertas legales relevantes.</p>
        ) : (
          <ul className="space-y-2">
            {result.alertas_legales.map((alert, idx) => (
              <li
                key={idx}
                className="flex gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2.5 text-sm text-amber-900"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                {alert}
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      {/* 6. Recomendaciones */}
      <SectionCard
        icon={<Lightbulb className="h-4 w-4" />}
        title="Recomendaciones"
        accent="border-l-emerald-500"
      >
        {result.recomendaciones.length === 0 ? (
          <p className="text-sm text-slate-500">Sin recomendaciones adicionales.</p>
        ) : (
          <ul className="space-y-2">
            {result.recomendaciones.map((rec, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                {rec}
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      {/* Bottom reset button */}
      <div className="flex justify-center pt-2 pb-4">
        <Button
          variant="outline"
          onClick={onReset}
          className="border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Nueva consulta
        </Button>
      </div>
    </div>
  )
}
