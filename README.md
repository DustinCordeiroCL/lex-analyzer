# LexAnalyzer

AI-powered legal document analysis tool. Upload or paste a contract in `.txt`, `.pdf`, or `.docx` format and get a structured breakdown covering executive summary, parties involved, obligations, risk clauses, legal alerts, and recommendations.

**Live demo:** [lex-analyzer.dustincordeiro.dev](https://lex-analyzer.dustincordeiro.dev)

## Stack

| Technology | Details |
|------------|---------|
| Next.js (App Router) | Fullstack framework |
| TypeScript | Static typing |
| Tailwind CSS + shadcn/ui | UI |
| Claude API (`claude-sonnet-4-6`) | AI analysis |
| Prisma + Turso (libSQL) | Database |
| Vercel | Deployment |

## Features

- Upload `.pdf`, `.docx`, `.txt` files or paste text directly
- Structured analysis: summary, parties, obligations, risk clauses, and recommendations
- Access code system (`LX-XXXX-XXXX`) with per-code usage limits
- Configurable global cap on total analyses

## Running locally

```bash
npm install

cp .env.example .env.local
# Fill in the required variables in .env.local

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key — [console.anthropic.com](https://console.anthropic.com) |
| `APP_SECRET` | Secret that protects the `/api/admin/codes` endpoint |
| `DATABASE_URL` | SQLite locally (`file:./prisma/dev.db`) or Turso URL in production |
| `DATABASE_AUTH_TOKEN` | Turso authentication token (production only) |

See `.env.example` for reference.

## Supported formats

| Format | Notes |
|--------|-------|
| `.txt` | Plain text |
| `.pdf` | Server-side parsing via `pdf-parse` |
| `.docx` | Server-side parsing via `mammoth` |

Max file size: **5 MB**. Max pasted text: **10,000 characters**.

## Sample files

The `docs/` folder contains example contracts for testing:

- `docs/contrato-servicio.txt` — use with **"Paste text"** mode
- `docs/contrato-arriendo.txt` — use with **"Upload file"** mode

## Deploying to Vercel

1. Push the repository to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Set the environment variables in the Vercel dashboard
4. Verify the build passes locally before deploying:

```bash
npm run build
```
