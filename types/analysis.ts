export interface RiskClause {
  clausula: string
  descripcion: string
  severidad: "Alta" | "Media" | "Baja"
}

export interface AnalysisResult {
  resumen_ejecutivo: string
  partes: {
    parte_a: string
    parte_b: string
  }
  obligaciones: {
    parte_a: string[]
    parte_b: string[]
  }
  clausulas_de_riesgo: RiskClause[]
  alertas_legales: string[]
  recomendaciones: string[]
}

export type OutputLanguage = "Chilean Spanish" | "Brazilian Portuguese" | "American English"

export type InputMode = "text" | "file"
