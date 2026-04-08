# LexAnalyzer — Escopo do Projeto

## Visão Geral

SPA em Next.js 14 (App Router) para análise inteligente de contratos jurídicos via Claude API. Deploy em subdomínio `lexanalyzer.dustincordeiro.dev` no Vercel.

---

## Stack

| Tecnologia | Detalhe |
|------------|---------|
| Next.js 14 | App Router |
| Tailwind CSS | Estilização |
| Claude API | `claude-sonnet-4-20250514` |
| `pdf-parse` | Parsing de arquivos `.pdf` (server-side) |
| `mammoth` | Parsing de arquivos `.docx` |
| Vercel | Deploy |

**Variável de ambiente:** `ANTHROPIC_API_KEY`

---

## Interface — Espanhol Chileno

### Header

- **Logo/nome:** LexAnalyzer
- **Subtítulo:** Análisis inteligente de documentos legales

### Entrada do Documento

Toggle para selecionar o modo de entrada:

**[ Pegar texto ]  [ Subir archivo ]**

#### Modo "Pegar texto"
- Textarea: `"Pega aquí el contenido del contrato o documento legal"`
- Limite visível de **10.000 caracteres**

#### Modo "Subir archivo"
- Área de drag & drop + botão de seleção de arquivo
- Formatos aceitos: `.txt`, `.pdf`, `.docx`
- Limite de tamanho: **5MB**
- Exibe nome e tamanho do arquivo após selecionado
- Mensagem de erro amigável para formato não suportado

### Controles

- **Dropdown de idioma do output:**
  - 🇨🇱 Español (Chile)
  - 🇧🇷 Português (Brasil)
  - 🇺🇸 English (US)
- **Botão:** `"Analizar Documento"`
- **Loading state:** `"Analizando documento..."`
- **Botão de limpar/nova análise** após resultado

---

## Output — Cards Organizados

| Card | Conteúdo |
|------|----------|
| **Resumen Ejecutivo** | Parágrafo resumindo o documento |
| **Partes Involucradas** | Identificação das partes do contrato |
| **Obligaciones** | Lista por parte (A e B) |
| **Cláusulas de Riesgo** | Cards com badge de severidade: `Alta` / `Media` / `Baja` |
| **Alertas Legales** | Prazos, penalidades, cláusulas críticas |
| **Recomendaciones** | Sugestões gerais |

---

## System Prompt para Claude API

```
You are an expert legal analyst specializing in Chilean and Latin American law.
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

Respond entirely in the following language: {SELECTED_LANGUAGE}
```

**Substituição dinâmica de `{SELECTED_LANGUAGE}`:**

| Opção | Valor |
|-------|-------|
| 🇨🇱 | `Chilean Spanish` |
| 🇧🇷 | `Brazilian Portuguese` |
| 🇺🇸 | `American English` |

---

## Fluxo Técnico

```
Usuário (texto ou arquivo) + idioma selecionado
        ↓
POST /api/analyze (FormData ou JSON)
        ↓
Route Handler:
  - .txt → buffer.toString()
  - .pdf → pdf-parse
  - .docx → mammoth
  - textarea → texto direto
        ↓
Chamada à Claude API (system prompt + texto extraído)
        ↓
Parse do JSON retornado
        ↓
Renderização dos cards no frontend
```

---

## Detalhes Adicionais

- Tratamento de erro com mensagem amigável em espanhol
- Responsivo (mobile-friendly)
- Código 100% em inglês (variáveis, funções, comentários)
- UI em espanhol chileno
