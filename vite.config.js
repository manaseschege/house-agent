import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import { Readable } from 'node:stream'

// Serves POST /api/chat during `npm run dev` / `npm run preview`, the same way
// Vercel serves api/chat.js in production.
function chatApi(env) {
  const middleware = (load) => async (req, res, next) => {
    if (!req.url?.startsWith('/api/chat')) return next()
    try {
      const { handleChat } = await load()
      const chunks = []
      for await (const c of req) chunks.push(c)
      const request = new Request(`http://localhost${req.url}`, {
        method: req.method,
        headers: { 'Content-Type': 'application/json' },
        body: req.method === 'POST' ? Buffer.concat(chunks) : undefined,
      })
      const response = await handleChat(request, { ...process.env, ...env })
      res.statusCode = response.status
      response.headers.forEach((v, k) => res.setHeader(k, v))
      if (response.body) Readable.fromWeb(response.body).pipe(res)
      else res.end()
    } catch (e) {
      console.error('[api/chat]', e)
      res.statusCode = 500
      res.end(JSON.stringify({ error: 'Server error' }))
    }
  }
  return {
    name: 'chat-api',
    configureServer(server) {
      server.middlewares.use(middleware(() => server.ssrLoadModule('/server/chat.js')))
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware(() => import('./server/chat.js')))
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), chatApi(loadEnv(mode, process.cwd(), ''))],
  build: { chunkSizeWarningLimit: 700 },
  server: { allowedHosts: ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.app'] },
  preview: { allowedHosts: ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.app'] },
}))
