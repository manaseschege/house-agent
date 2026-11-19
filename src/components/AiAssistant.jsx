import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, X, ArrowUp, RotateCcw, Phone, ShieldCheck } from 'lucide-react'
import { site } from '../config/site'
import { waLink } from '../lib/utils'

const STORAGE_KEY = 'riri-ai-chat'
const SUGGESTIONS = [
  'What houses are available in Eldoret?',
  'Cheapest 2 bedroom in Nairobi?',
  'How does property management work?',
  'Where are your offices?',
  'Can I get a loan against my rent?',
]
const GREETING = {
  role: 'assistant',
  content: `Hi 👋 I'm the **RIRI Assistant**. Ask me about our available houses, prices, services, offices or how we can manage your property.`,
}

const load = () => {
  try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
}
const save = (msgs) => {
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs)) } catch { /* private mode */ }
}

// ── Tiny, safe markdown: **bold**, [links](/path), bare URLs, bullet & numbered lists ──
const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|https?:\/\/[^\s)]+)/g

function Inline({ text, onNavigate }) {
  return text.split(INLINE).map((part, i) => {
    if (!part) return null
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-semibold text-forest-900">{part.slice(2, -2)}</strong>
    const md = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
    const [label, href] = md ? [md[1], md[2]] : part.startsWith('http') ? [part, part] : []
    if (href?.startsWith('/')) return <Link key={i} to={href} onClick={onNavigate} className="font-medium text-forest-700 underline decoration-gold-400 decoration-2 underline-offset-2 hover:text-forest-900">{label}</Link>
    if (href && /^(https?:|tel:|mailto:)/.test(href)) return <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-forest-700 underline decoration-gold-400 decoration-2 underline-offset-2 break-words hover:text-forest-900">{label}</a>
    return <Fragment key={i}>{part}</Fragment>
  })
}

function Markdown({ text, onNavigate }) {
  const blocks = []
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    const bullet = line.match(/^[-*•]\s+(.*)/)
    const numbered = line.match(/^\d+[.)]\s+(.*)/)
    const kind = bullet ? 'ul' : numbered ? 'ol' : line ? 'p' : null
    const content = (bullet || numbered)?.[1] ?? line.replace(/^#+\s*/, '')
    if (!kind) { blocks.push(null); continue }
    const last = blocks.at(-1)
    if (kind !== 'p' && last?.kind === kind) last.items.push(content)
    else blocks.push({ kind, items: [content] })
  }
  return blocks.filter(Boolean).map((b, i) => {
    if (b.kind === 'p') return <p key={i}><Inline text={b.items[0]} onNavigate={onNavigate} /></p>
    const List = b.kind
    return (
      <List key={i} className={`space-y-1 pl-5 ${b.kind === 'ul' ? 'list-disc marker:text-gold-500' : 'list-decimal marker:text-forest-600'}`}>
        {b.items.map((it, j) => <li key={j}><Inline text={it} onNavigate={onNavigate} /></li>)}
      </List>
    )
  })
}

function Avatar({ size = 'h-8 w-8' }) {
  return (
    <span className={`grid ${size} shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-forest-950 shadow-soft`}>
      <Sparkles className="h-4 w-4" />
    </span>
  )
}

function Typing() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="h-2 w-2 rounded-full bg-forest-600/60"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </span>
  )
}

export default function AiAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(load)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const scroller = useRef(null)
  const inputRef = useRef(null)
  const abortRef = useRef(null)

  useEffect(() => { save(messages) }, [messages])
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' }) }, [messages, busy, open])
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 250) }, [open])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  async function ask(text) {
    const question = text.trim()
    if (!question || busy) return
    setError('')
    setInput('')
    const history = [...messages, { role: 'user', content: question }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setBusy(true)
    const controller = new AbortController()
    abortRef.current = controller
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      })
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'The assistant is unavailable right now.')
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let answer = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        answer += decoder.decode(value, { stream: true })
        setMessages([...history, { role: 'assistant', content: answer }])
      }
      if (!answer.trim()) throw new Error('No answer came back. Please try again.')
    } catch (e) {
      if (e.name !== 'AbortError') {
        setError(e.message)
        setMessages(history)
      }
    } finally {
      setBusy(false)
      abortRef.current = null
    }
  }

  function reset() {
    abortRef.current?.abort()
    setMessages([])
    setError('')
    setBusy(false)
  }

  const shown = [GREETING, ...messages]
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content

  return (
    <div className="fixed bottom-4 left-4 z-[60] sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog" aria-label={`${site.shortName} AI assistant`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="absolute bottom-20 left-0 flex h-[min(38rem,calc(100dvh-7rem))] w-[min(25rem,calc(100vw-2rem))] origin-bottom-left flex-col overflow-hidden rounded-3xl bg-cream shadow-lift ring-1 ring-line"
          >
            {/* Header */}
            <header className="relative overflow-hidden bg-gradient-to-br from-forest-800 via-forest-900 to-forest-950 px-5 pt-5 pb-4 text-white">
              <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-gold-400/20 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <Avatar size="h-11 w-11" />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg leading-tight">RIRI Assistant</p>
                  <p className="flex items-center gap-1.5 text-xs text-white/70">
                    <span className="relative flex h-2 w-2"><span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative h-2 w-2 rounded-full bg-emerald-400" /></span>
                    Online · replies instantly
                  </p>
                </div>
                {messages.length > 0 && (
                  <button onClick={reset} className="grid h-9 w-9 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white" aria-label="Start a new chat" title="New chat">
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white" aria-label="Close assistant">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="relative mt-3 flex items-center gap-1.5 text-[11px] text-white/55">
                <ShieldCheck className="h-3.5 w-3.5 text-gold-400" /> Answers only from {site.name}’s own information
              </p>
            </header>

            {/* Messages */}
            <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5" aria-live="polite">
              {shown.map((m, i) => (
                m.role === 'user' ? (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-forest-800 px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap text-white shadow-soft">{m.content}</p>
                  </motion.div>
                ) : (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2">
                    <Avatar />
                    <div className="max-w-[85%] space-y-2 rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm leading-relaxed text-ink/85 shadow-soft ring-1 ring-line/70">
                      {m.content ? <Markdown text={m.content} onNavigate={() => setOpen(false)} /> : <Typing />}
                    </div>
                  </motion.div>
                )
              ))}

              {messages.length === 0 && (
                <div className="pl-10">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">Try asking</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} onClick={() => ask(s)} className="rounded-full border border-forest-800/15 bg-white px-3 py-1.5 text-left text-xs text-forest-800 transition hover:-translate-y-0.5 hover:border-forest-600 hover:bg-forest-50 hover:shadow-soft">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  <p>{error}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lastUser && <button onClick={() => { setMessages((m) => m.slice(0, -1)); ask(lastUser) }} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-red-800 ring-1 ring-red-200 hover:bg-red-100">Try again</button>}
                    <a href={waLink(lastUser || 'Hello RIRI')} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-3 py-1 text-xs font-semibold text-white">Ask on WhatsApp</a>
                    <a href={`tel:${site.phones[0].tel}`} className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-forest-800 ring-1 ring-line"><Phone className="h-3 w-3" />{site.phones[0].display}</a>
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form onSubmit={(e) => { e.preventDefault(); ask(input) }} className="border-t border-line bg-white p-3">
              <div className="flex items-end gap-2 rounded-2xl border border-line bg-cream/60 p-1.5 pl-4 transition focus-within:border-forest-600 focus-within:ring-4 focus-within:ring-forest-600/10">
                <textarea
                  ref={inputRef} rows={1} value={input} maxLength={1500}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(input) } }}
                  placeholder="Ask about houses, prices, services…"
                  aria-label="Your question"
                  className="max-h-28 min-h-[2.5rem] flex-1 resize-none bg-transparent py-2 text-sm outline-none placeholder:text-muted/70"
                />
                <button type="submit" disabled={!input.trim() || busy} aria-label="Send"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-800 text-white transition hover:bg-forest-700 disabled:cursor-not-allowed disabled:bg-forest-800/30">
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted">AI can make mistakes. Confirm prices & availability on {site.phones[0].display}.</p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        aria-label={open ? 'Close AI assistant' : 'Ask the RIRI AI assistant'} aria-expanded={open}
        className="group relative flex h-16 items-center gap-2.5 rounded-full bg-gradient-to-br from-forest-800 to-forest-950 pr-2 pl-2 text-white shadow-lift ring-2 ring-gold-400/60 sm:pr-5"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-gold-400 opacity-20" />}
        <span className="relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-forest-950">
          {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
        </span>
        <span className="relative hidden text-left sm:block">
          <span className="block text-sm font-semibold leading-tight">{open ? 'Close' : 'Ask RIRI AI'}</span>
          {!open && <span className="block text-[11px] text-white/60">Houses, prices & services</span>}
        </span>
      </motion.button>
    </div>
  )
}
