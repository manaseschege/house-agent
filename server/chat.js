// Chat handler shared by the Vercel function (api/chat.js) and the Vite dev server.
// Calls OpenRouter with the company knowledge as the system prompt and streams
// the answer back to the browser as plain text. The API key never leaves the server.

import { systemPrompt } from '../src/lib/knowledge.js'

// Free models first; OpenRouter tries the next one if a model is busy or rate-limited.
const DEFAULT_MODELS = ['google/gemma-4-31b-it:free', 'google/gemma-4-26b-a4b-it:free', 'openrouter/free']
const MAX_TURNS = 12
const MAX_CHARS = 1500

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

function cleanMessages(raw) {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
}

export async function handleChat(request, env = process.env) {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' })
  const key = env.OPENROUTER_API_KEY
  if (!key) return json(500, { error: 'The assistant is not configured yet (missing OPENROUTER_API_KEY).' })

  let body
  try { body = await request.json() } catch { return json(400, { error: 'Invalid request' }) }
  const messages = cleanMessages(body?.messages)
  if (!messages.length || messages.at(-1).role !== 'user') return json(400, { error: 'Send a question first.' })

  const models = env.OPENROUTER_MODEL ? env.OPENROUTER_MODEL.split(',').map((s) => s.trim()) : DEFAULT_MODELS
  const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': env.SITE_URL || 'https://ririhousingagency.com',
      'X-Title': 'RIRI Housing Agency Assistant',
    },
    body: JSON.stringify({
      models,
      stream: true,
      temperature: 0.2,
      max_tokens: 1200,
      reasoning: { exclude: true },
      messages: [{ role: 'system', content: systemPrompt() }, ...messages],
    }),
  }).catch(() => null)

  if (!upstream?.ok || !upstream.body) {
    const status = upstream?.status
    const error = status === 429
      ? 'The assistant is getting a lot of questions right now. Please try again in a minute, or call/WhatsApp us.'
      : 'The assistant is unavailable right now. Please call or WhatsApp us.'
    return json(502, { error })
  }

  // Turn OpenRouter's server-sent events into a plain stream of text.
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ''
  const stream = upstream.body.pipeThrough(new TransformStream({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop()
      for (const line of lines) {
        if (!line.startsWith('data:')) continue
        const data = line.slice(5).trim()
        if (data === '[DONE]') continue
        try {
          const text = JSON.parse(data).choices?.[0]?.delta?.content
          if (text) controller.enqueue(encoder.encode(text))
        } catch { /* keep-alive or partial line */ }
      }
    },
  }))

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' },
  })
}
