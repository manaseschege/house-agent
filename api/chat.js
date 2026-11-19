// Vercel serverless function: POST /api/chat
// Set OPENROUTER_API_KEY in Vercel → Project → Settings → Environment Variables.
import { handleChat } from '../server/chat.js'

export const config = { maxDuration: 60 }

export function POST(request) {
  return handleChat(request, process.env)
}
