import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, KeyRound, Tag, Building2, User } from 'lucide-react'
import { propertyTypes, towns } from '../data/properties'
import { services } from '../data/services'
import { site } from '../config/site'
import { submitForm } from '../lib/utils'
import { PageHero, Reveal } from '../components/ui'

const GOALS = [
  { id: 'Find tenants', icon: KeyRound, text: 'I have a vacant house to let' },
  { id: 'Sell', icon: Tag, text: 'I want to sell my property' },
  { id: 'Full management', icon: Building2, text: 'Manage my property for me' },
]

export default function ListProperty() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [data, setData] = useState({ goal: '', type: 'Apartment', town: 'Eldoret', area: '', units: '1', beds: '2', price: '', extras: [], name: '', phone: '', email: '', notes: '' })
  const [state, setState] = useState('idle')
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }))
  const go = (n) => { setDir(n > step ? 1 : -1); setStep(n) }
  const steps = ['Your goal', 'The property', 'Services', 'Your details']
  const canNext = [data.goal, data.area, true, data.name && data.phone][step]

  const submit = async (e) => {
    e.preventDefault()
    if (!canNext) return
    try {
      setState('sending')
      setState(await submitForm(`New property listing: ${data.goal}`, {
        Goal: data.goal, Type: data.type, Location: `${data.area}, ${data.town}`, Units: data.units, Bedrooms: data.beds,
        'Expected rent/price (KES)': data.price, 'Services wanted': data.extras.join(', '),
        Name: data.name, Phone: data.phone, Email: data.email, Notes: data.notes,
      }))
    } catch { setState('error') }
  }

  const done = state === 'sent' || state === 'whatsapp'
  return (
    <>
      <PageHero title="List your property with us" text="Tell us about your property in under a minute. We’ll call you to arrange a free inspection and valuation." image="/media/images/1628744448840-55bdb2497bd4.jpg" crumbs={[{ label: 'List your property' }]} />
      <section className="py-16 sm:py-24">
        <div className="container-x max-w-3xl">
          <Reveal className="card overflow-hidden">
            <div className="border-b border-line p-6 sm:px-10">
              <ol className="flex items-center gap-2">
                {steps.map((s, i) => (
                  <li key={s} className="flex flex-1 items-center gap-2">
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition ${i < step || done ? 'bg-forest-700 text-white' : i === step ? 'bg-gold-400 text-forest-950' : 'bg-cream text-muted'}`}>
                      {i < step || done ? <Check className="h-4 w-4" /> : i + 1}
                    </span>
                    <span className={`hidden text-sm font-medium sm:block ${i === step ? 'text-forest-900' : 'text-muted'}`}>{s}</span>
                    {i < steps.length - 1 && <span className="h-px flex-1 bg-line" />}
                  </li>
                ))}
              </ol>
            </div>

            {done ? (
              <div className="p-10 text-center sm:p-16">
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-forest-800 text-gold-400"><Check className="h-10 w-10" /></motion.span>
                <h2 className="mt-6 text-3xl text-forest-900">{state === 'sent' ? 'Thank you, we’ve got it!' : 'Almost there!'}</h2>
                <p className="mx-auto mt-3 max-w-md text-muted">{state === 'sent' ? `Our team will call you on ${data.phone} within one working day.` : 'We’ve opened WhatsApp with your details — just press send and we’ll call you back.'}</p>
              </div>
            ) : (
              <form onSubmit={step === 3 ? submit : (e) => { e.preventDefault(); if (canNext) go(step + 1) }} className="p-6 sm:p-10">
                <div className="relative min-h-[20rem]">
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={step} custom={dir}
                      initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step === 0 && (
                        <div>
                          <h2 className="text-2xl text-forest-900">What would you like us to do?</h2>
                          <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            {GOALS.map((g) => (
                              <button type="button" key={g.id} onClick={() => set('goal', g.id)} className={`rounded-2xl p-5 text-left ring-2 transition ${data.goal === g.id ? 'bg-forest-50 ring-forest-700' : 'ring-line hover:ring-forest-600/40'}`}>
                                <g.icon className="h-7 w-7 text-gold-600" />
                                <p className="mt-4 font-semibold text-forest-900">{g.id}</p>
                                <p className="mt-1 text-sm text-muted">{g.text}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {step === 1 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <h2 className="text-2xl text-forest-900 sm:col-span-2">Tell us about the property</h2>
                          <label><span className="label">Type</span><select className="field" value={data.type} onChange={(e) => set('type', e.target.value)}>{propertyTypes.map((t) => <option key={t}>{t}</option>)}</select></label>
                          <label><span className="label">Town</span><select className="field" value={data.town} onChange={(e) => set('town', e.target.value)}>{towns.map((t) => <option key={t}>{t}</option>)}<option>Other</option></select></label>
                          <label className="sm:col-span-2"><span className="label">Estate / area *</span><input required className="field" value={data.area} onChange={(e) => set('area', e.target.value)} placeholder="e.g. Elgon View" /></label>
                          <label><span className="label">Number of units</span><input type="number" min="1" className="field" value={data.units} onChange={(e) => set('units', e.target.value)} /></label>
                          <label><span className="label">Bedrooms per unit</span><select className="field" value={data.beds} onChange={(e) => set('beds', e.target.value)}>{['Bedsitter', '1', '2', '3', '4', '5+', 'N/A'].map((b) => <option key={b}>{b}</option>)}</select></label>
                          <label className="sm:col-span-2"><span className="label">Expected {data.goal === 'Sell' ? 'price' : 'monthly rent'} (KES, optional)</span><input inputMode="numeric" className="field" value={data.price} onChange={(e) => set('price', e.target.value)} placeholder="Not sure? We’ll advise" /></label>
                        </div>
                      )}
                      {step === 2 && (
                        <div>
                          <h2 className="text-2xl text-forest-900">Which services interest you?</h2>
                          <p className="mt-1 text-sm text-muted">Pick any — we’ll explain each one when we call.</p>
                          <div className="mt-6 grid gap-2 sm:grid-cols-2">
                            {services.map((s) => {
                              const on = data.extras.includes(s.title)
                              return (
                                <button type="button" key={s.id} aria-pressed={on} onClick={() => set('extras', on ? data.extras.filter((x) => x !== s.title) : [...data.extras, s.title])}
                                  className={`flex items-center gap-3 rounded-xl p-3 text-left text-sm ring-1 transition ${on ? 'bg-forest-50 ring-forest-700' : 'ring-line hover:bg-cream'}`}>
                                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ${on ? 'bg-forest-700 text-white' : 'bg-cream'}`}>{on && <Check className="h-4 w-4" />}</span>
                                  {s.title}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                      {step === 3 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <h2 className="flex items-center gap-2 text-2xl text-forest-900 sm:col-span-2"><User className="h-6 w-6 text-gold-600" /> How can we reach you?</h2>
                          <label><span className="label">Full name *</span><input required className="field" value={data.name} onChange={(e) => set('name', e.target.value)} /></label>
                          <label><span className="label">Phone *</span><input required type="tel" className="field" value={data.phone} onChange={(e) => set('phone', e.target.value)} placeholder="07xx xxx xxx" /></label>
                          <label className="sm:col-span-2"><span className="label">Email</span><input type="email" className="field" value={data.email} onChange={(e) => set('email', e.target.value)} /></label>
                          <label className="sm:col-span-2"><span className="label">Anything else?</span><textarea rows={3} className="field resize-none" value={data.notes} onChange={(e) => set('notes', e.target.value)} /></label>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
                  <button type="button" onClick={() => go(step - 1)} className={`btn text-forest-800 hover:bg-cream ${step === 0 ? 'invisible' : ''}`}><ArrowLeft className="h-4 w-4" /> Back</button>
                  <button disabled={!canNext || state === 'sending'} className="btn-forest disabled:cursor-not-allowed disabled:opacity-40">
                    {step === 3 ? (state === 'sending' ? 'Sending…' : site.formEndpoint ? 'Submit' : 'Submit via WhatsApp') : 'Continue'} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {state === 'error' && <p className="mt-3 text-sm text-rose-600">Something went wrong. Please call {site.phones[0].display}.</p>}
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
