import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RotateCcw, CheckCircle2, Clock3, ShieldCheck } from 'lucide-react'
import { towns, propertyTypes } from '../data/properties'
import { site } from '../config/site'
import { PageHero, Reveal, WhatsAppIcon } from '../components/ui'
import { compactKES, waLink } from '../lib/utils'

const RENT_STEPS = [10000, 20000, 50000, 100000, 300000]
const SALE_STEPS = [5000000, 10000000, 20000000, 50000000, 100000000]

const Chip = ({ active, onClick, children }) => (
  <button type="button" onClick={onClick} aria-pressed={active} className={`rounded-full px-4 py-2 text-sm font-medium transition ${active ? 'bg-forest-800 text-white' : 'bg-cream text-ink/80 hover:bg-forest-50'}`}>{children}</button>
)

function Filters({ params, set, reset }) {
  const purpose = params.get('purpose') || ''
  const steps = purpose === 'sale' ? SALE_STEPS : RENT_STEPS
  return (
    <div className="space-y-7">
      <div>
        <span className="label">Looking to</span>
        <div className="flex flex-wrap gap-2">
          {[['', 'All'], ['rent', 'Rent'], ['sale', 'Buy']].map(([v, l]) => (
            <Chip key={l} active={purpose === v} onClick={() => set({ purpose: v, max: '' })}>{l}</Chip>
          ))}
        </div>
      </div>
      <div>
        <span className="label">Town</span>
        <div className="flex flex-wrap gap-2">
          <Chip active={!params.get('town')} onClick={() => set({ town: '' })}>All</Chip>
          {towns.map((t) => <Chip key={t} active={params.get('town') === t} onClick={() => set({ town: t })}>{t}</Chip>)}
        </div>
      </div>
      <label className="block">
        <span className="label">Property type</span>
        <select className="field" value={params.get('type') || ''} onChange={(e) => set({ type: e.target.value })}>
          <option value="">Any type</option>
          {propertyTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <div>
        <span className="label">Bedrooms</span>
        <div className="flex flex-wrap gap-2">
          {['', '1', '2', '3', '4'].map((b) => (
            <Chip key={b} active={(params.get('beds') || '') === b} onClick={() => set({ beds: b })}>{b ? `${b}+` : 'Any'}</Chip>
          ))}
        </div>
      </div>
      <label className="block">
        <span className="label">Max price{purpose === 'rent' ? ' (per month)' : ''}</span>
        <select className="field" value={params.get('max') || ''} onChange={(e) => set({ max: e.target.value })}>
          <option value="">No limit</option>
          {steps.map((s) => <option key={s} value={s}>{compactKES(s)}</option>)}
        </select>
      </label>
      <button type="button" onClick={reset} className="flex items-center gap-2 text-sm font-semibold text-forest-700 hover:text-forest-900"><RotateCcw className="h-4 w-4" /> Reset filters</button>
    </div>
  )
}

// Turns the chosen filters into the WhatsApp message sent to the office.
function buildMessage(params, name, notes) {
  const purpose = params.get('purpose')
  const max = params.get('max')
  const lines = [
    `Looking to: ${purpose === 'rent' ? 'Rent' : purpose === 'sale' ? 'Buy' : 'Rent or buy'}`,
    `Town: ${params.get('town') || 'Any town'}`,
    `Property type: ${params.get('type') || 'Any type'}`,
    `Bedrooms: ${params.get('beds') ? `${params.get('beds')}+` : 'Any'}`,
    `Max price: ${max ? `${compactKES(Number(max))}${purpose === 'rent' ? ' per month' : ''}` : 'No limit'}`,
  ]
  return [
    `Hello ${site.name}, I'm looking for a property:`,
    '',
    ...lines.map((l) => `• ${l}`),
    ...(name.trim() ? ['', `Name: ${name.trim()}`] : []),
    ...(notes.trim() ? [`Notes: ${notes.trim()}`] : []),
  ].join('\n')
}

export default function Listings() {
  const [params, setParams] = useSearchParams()
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')

  // Build on the latest params so quick successive changes don't overwrite each other
  const set = (patch) =>
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)))
      return next
    }, { replace: true })
  const reset = () => setParams({}, { replace: true })

  const message = buildMessage(params, name, notes)
  const purpose = params.get('purpose')
  const heading = purpose === 'rent' ? 'Find a house to rent' : purpose === 'sale' ? 'Find a property to buy' : 'Find your next property'

  return (
    <>
      <PageHero
        title={heading}
        text="Tell us what you’re looking for. We’ll reply on WhatsApp with available houses and properties that match."
        image="/media/images/1564013799919-ab600027ffc6.jpg"
        crumbs={[{ label: 'Properties' }]}
      />
      <section className="py-12 sm:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-10">
          <Reveal className="card h-fit p-6">
            <Filters params={params} set={set} reset={reset} />
          </Reveal>

          <Reveal delay={0.1} className="card flex flex-col p-6 sm:p-8">
            <span className="eyebrow">Your request</span>
            <h2 className="mt-3 text-3xl text-forest-900">Send your details on WhatsApp</h2>
            <p className="mt-2 text-muted">Check the message below, then tap send. Our team will get back to you with options.</p>

            <div className="mt-6 rounded-3xl bg-[#e7ddd3] p-4 sm:p-6">
              <motion.div
                key={message}
                initial={{ opacity: 0.6, y: 4 }} animate={{ opacity: 1, y: 0 }}
                className="ml-auto max-w-md rounded-2xl rounded-tr-sm bg-[#d9fdd3] px-4 py-3 text-sm leading-relaxed whitespace-pre-line text-ink shadow-sm"
              >
                {message}
              </motion.div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label><span className="label">Your name (optional)</span><input className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Wanjiku" /></label>
              <label><span className="label">Anything else? (optional)</span><input className="field" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. near a school, move in by March" /></label>
            </div>

            <a
              href={waLink(message)} target="_blank" rel="noreferrer"
              className="btn mt-6 w-full bg-[#25D366] !py-4 text-base text-white hover:brightness-95"
            >
              <WhatsAppIcon className="h-5 w-5" /> Send to WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-muted">Or call us on {site.phones.map((p) => p.display).join(' / ')}</p>

            <ul className="mt-8 grid gap-4 border-t border-line pt-6 text-sm sm:grid-cols-3">
              {[[CheckCircle2, 'Verified vacant houses'], [Clock3, 'Quick reply in office hours'], [ShieldCheck, 'Free, no obligation']].map(([Icon, t]) => (
                <li key={t} className="flex items-center gap-2 text-ink/80"><Icon className="h-5 w-5 shrink-0 text-forest-600" />{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
