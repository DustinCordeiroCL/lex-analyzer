# LexAnalyzer

Ferramenta de análise inteligente de documentos jurídicos via IA. Processa contratos em formato texto, PDF ou DOCX e retorna uma análise estruturada com resumo executivo, partes envolvidas, obrigações, cláusulas de risco, alertas legais e recomendações.

**Demo:** [lex-analyzer.dustincordeiro.dev](https://lex-analyzer.dustincordeiro.dev)

## Stack

| Tecnologia | Detalhe |
|------------|---------|
| Next.js (App Router) | Framework fullstack |
| TypeScript | Tipagem estática |
| Tailwind CSS + shadcn/ui | Interface |
| Claude API (`claude-sonnet-4-6`) | Análise por IA |
| Prisma + Turso (libSQL) | Banco de dados |
| Vercel | Deploy |

## Funcionalidades

- Upload de arquivos `.pdf`, `.docx` e `.txt` ou colagem de texto direto
- Análise estruturada: resumo, partes, obrigações, cláusulas de risco e recomendações
- Sistema de controle de acesso por códigos (`LX-XXXX-XXXX`) com limite de uso
- Cap global configurável de análises totais

## Como executar localmente

```bash
npm install

cp .env.example .env.local
# Preencha as variáveis no .env.local

npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

| Variável | Descrição |
|----------|-----------|
| `ANTHROPIC_API_KEY` | Chave da API Anthropic — [console.anthropic.com](https://console.anthropic.com) |
| `APP_SECRET` | Segredo que protege o endpoint `/api/admin/codes` |
| `DATABASE_URL` | SQLite local (`file:./prisma/dev.db`) ou URL Turso em produção |
| `DATABASE_AUTH_TOKEN` | Token de autenticação Turso (apenas produção) |

Consulte `.env.example` para referência.

## Formatos suportados

| Formato | Notas |
|---------|-------|
| `.txt` | Texto plano |
| `.pdf` | Processado server-side via `pdf-parse` |
| `.docx` | Processado server-side via `mammoth` |

Tamanho máximo: **5 MB**. Limite de texto colado: **10.000 caracteres**.

## Arquivos de exemplo

A pasta `docs/` contém contratos de exemplo para teste:

- `docs/contrato-servicio.txt` — use no modo **"Colar texto"**
- `docs/contrato-arriendo.txt` — use no modo **"Enviar arquivo"**

## Deploy no Vercel

1. Faça push do repositório para o GitHub
2. Importe o projeto em [vercel.com](https://vercel.com)
3. Configure as variáveis de ambiente no dashboard
4. Verifique o build localmente antes de publicar:

```bash
npm run build
```
