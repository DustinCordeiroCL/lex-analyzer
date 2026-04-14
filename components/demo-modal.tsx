"use client"

import { useState } from "react"
import { X, Scale, KeyRound, FileText, Globe, Lock, Copy, Check } from "lucide-react"

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-1.5 text-blue-500 hover:text-blue-700 transition-colors"
      title="Copiar"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

export function DemoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 rounded-t-2xl bg-slate-900">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700">
              <Scale className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-white text-lg font-bold tracking-tight">LexAnalyzer</h2>
          </div>
          <p className="text-white/40 text-xs tracking-widest uppercase">Sistema de demostración</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Bienvenido/a. Esta es una demostración de un sistema de análisis inteligente
            de documentos legales impulsado por IA, desarrollado como proyecto de portafolio.
          </p>

          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            Funcionalidades
          </p>

          <ul className="space-y-2.5 mb-5">
            {[
              { icon: FileText, text: "Análisis estructurado de contratos y documentos legales" },
              { icon: Scale,    text: "Identificación de cláusulas de riesgo y alertas legales" },
              { icon: Globe,    text: "Respuestas en Español, Portugués e Inglés" },
              { icon: FileText, text: "Soporte para texto, PDF y archivos DOCX" },
              { icon: Lock,     text: "Acceso controlado mediante código de demostración" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-2.5">
                <Icon className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-600">{text}</span>
              </li>
            ))}
          </ul>

          {/* Acesso */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-3">
            <p className="text-xs font-semibold text-blue-800 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              Código de acceso
            </p>
            <p className="text-xs text-blue-700 leading-relaxed mb-2">
              Para probar el sistema, solicita un código de acceso al desarrollador:
            </p>
            <div className="font-mono text-xs bg-blue-100/60 rounded-md px-3 py-2 flex items-center gap-1">
              <span className="text-blue-600 select-none">E-mail:</span>
              <span className="font-semibold text-blue-900">cordeiro.dustin00@gmail.com</span>
              <CopyButton value="cordeiro.dustin00@gmail.com" />
            </div>
            <p className="text-xs text-blue-600 mt-2 leading-relaxed">
              Cada código permite hasta <strong>2 análisis</strong>. El sistema tiene un límite global de demostraciones disponibles.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-white text-sm font-semibold bg-blue-800 hover:bg-blue-900 transition-colors"
          >
            Entendido, quiero explorar
          </button>
        </div>
      </div>
    </div>
  )
}

export function DemoModalTrigger() {
  const [open, setOpen] = useState(true)
  if (!open) return null
  return <DemoModal onClose={() => setOpen(false)} />
}
