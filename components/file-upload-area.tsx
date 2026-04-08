"use client"

import { useRef, useState, DragEvent, ChangeEvent } from "react"
import { UploadCloud, FileText, X } from "lucide-react"

const ACCEPTED_FORMATS = [".txt", ".pdf", ".docx"]
const ACCEPTED_MIME_TYPES = [
  "text/plain",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

interface FileUploadAreaProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
}

export default function FileUploadArea({ onFileSelect, selectedFile }: FileUploadAreaProps): React.ReactElement {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function validateFile(file: File): string | null {
    if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
      return "Formato no soportado. Use .txt, .pdf o .docx."
    }
    if (file.size > MAX_SIZE_BYTES) {
      return "El archivo supera el límite de 5 MB."
    }
    return null
  }

  function handleFile(file: File): void {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      onFileSelect(null)
      return
    }
    setError(null)
    onFileSelect(file)
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(): void {
    setIsDragging(false)
  }

  function handleDrop(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function handleClear(): void {
    setError(null)
    onFileSelect(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-2">
      {selectedFile ? (
        <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="h-5 w-5 shrink-0 text-blue-700" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-800">{selectedFile.name}</p>
              <p className="text-xs text-slate-500">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="ml-3 shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-blue-100 hover:text-slate-600"
            aria-label="Eliminar archivo"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-10 transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50"
          }`}
        >
          <UploadCloud className={`h-10 w-10 ${isDragging ? "text-blue-500" : "text-slate-400"}`} />
          <div className="text-center">
            <p className="text-sm font-medium text-slate-700">
              Arrastra tu archivo aquí o{" "}
              <span className="text-blue-700 underline underline-offset-2">haz clic para seleccionar</span>
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Formatos aceptados: {ACCEPTED_FORMATS.join(", ")} · Máximo 5 MB
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs font-medium text-red-600">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_FORMATS.join(",")}
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  )
}
