# LexAnalyzer

Análisis inteligente de documentos legales mediante IA. Procesa contratos en formato texto, PDF o DOCX y devuelve un análisis estructurado con resumen ejecutivo, partes, obligaciones, cláusulas de riesgo, alertas legales y recomendaciones.

## Requisitos

- Node.js 18+
- Cuenta en [Anthropic Console](https://console.anthropic.com) para obtener la API key

## Cómo ejecutar localmente

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local y agregar ANTHROPIC_API_KEY

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `ANTHROPIC_API_KEY` | API key de Anthropic (Claude) |

Ver `.env.example` para referencia.

## Deploy

Deploy en Vercel. Configurar la variable `ANTHROPIC_API_KEY` en el dashboard de Vercel antes de deployar.

```bash
# Verificar build local antes de deployar
npm run build
```
