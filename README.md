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
# Editar .env.local y completar las variables requeridas

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `ANTHROPIC_API_KEY` | API key de Anthropic (Claude) |
| `APP_SECRET` | Contraseña del servidor — protege el endpoint `/api/analyze` |
| `NEXT_PUBLIC_APP_SECRET` | Misma contraseña, expuesta al navegador — debe coincidir con `APP_SECRET` |

Ver `.env.example` para referencia.

## Formatos de documento soportados

| Formato | Notas |
|---------|-------|
| `.txt` | Texto plano |
| `.pdf` | Procesado server-side vía `pdf-parse` |
| `.docx` | Procesado server-side vía `mammoth` |

Tamaño máximo: **5 MB**. Límite de texto pegado: **10.000 caracteres**.

## Archivos de prueba

La carpeta `docs/` contiene dos contratos de ejemplo para testear la aplicación:

- `docs/contrato-servicio.txt` — úsalo en modo **"Pegar texto"** (copia y pega el contenido)
- `docs/contrato-arriendo.txt` — úsalo en modo **"Subir archivo"** (cárgalo directamente)

## Deploy en Vercel

1. Hacer push del repositorio a GitHub
2. Importar el proyecto en [vercel.com](https://vercel.com)
3. Configurar las variables de entorno en el dashboard de Vercel:
   - `ANTHROPIC_API_KEY`
   - `APP_SECRET`
   - `NEXT_PUBLIC_APP_SECRET`
4. Verificar que el build pasa localmente antes de deployar:

```bash
npm run build
```
