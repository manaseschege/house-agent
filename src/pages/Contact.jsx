import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, Mail, Clock, MapPin, Navigation, Check, Building2 } from 'lucide-react'
import { site, offices } from '../config/site'
import { mapEmbed, mapLink, submitForm, useOpenStatus, waLink } from '../lib/utils'
import { PageHero, Reveal, WhatsAppIcon } from '../components/ui'

export function ContactForm({ subject = 'Website enquiry', topics }) {
  const [state, setState] = useState('idle')
  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = Object.fromEntries(new FormData(form))
    try {
      setState('sending')
      setState(await submitForm(subject, { Name: f.name, Phone: f.phone, Email: f.email, Topic: f.topic, Office: f.office, Message: f.message }))
      form.reset()
    } catch { setState('error') }
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <label><span className="label">Full name</span><input name="name" required className="field" placeholder="Jane Wanjiku" /></label>
      <label><span className="label">Phone</span><input name="phone" type="tel" required className="field" placeholder="07xx xxx xxx" /></label>
      <label className="sm:col-span-2"><span className="label">Email (optional)</span><input name="email" type="email" className="field" placeholder="you@example.com" /></label>
      <label><span className="label">I’m enquiring about</span>
        <select name="topic" className="field">
          {(topics || ['Renting a house', 'Buying property', 'Property management', 'Selling my property', 'Loan against rental income', 'Tenant complaint', 'Other']).map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label><span className="label">Nearest office</span>
        <select name="office" className="field">{offices.map((o) => <option key={o.id}>{o.town}</option>)}</select>
      </label>
      <label className="sm:col-span-2"><span className="label">Message</span><textarea name="message" rows={5} required className="field resize-none" placeholder="How can we help?" /></label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button disabled={state === 'sending'} className="btn-forest">{state === 'sending' ? 'Sending…' : site.formEndpoint ? 'Send message' : <><WhatsAppIcon className="h-4 w-4" /> Send via WhatsApp</>}</button>
        <AnimatePresence>
          {(state === 'sent' || state === 'whatsapp') && (
            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm font-medium text-forest-700">
              <Check className="h-4 w-4" /> {state === 'sent' ? 'Thank you — we’ll be in touch shortly.' : 'Opened WhatsApp — just press send.'}
            </motion.p>
          )}
          {state === 'error' && <p className="text-sm text-rose-600">Could not send. Please call us instead.</p>}
        </AnimatePresence>
      </div>
    </form>
  )
}

export default function Contact() {
  const [active, setActive] = useState(offices[0].id)
  const office = offices.find((o) => o.id === active)
  const status = useOpenStatus()
  const cards = [
    { icon: Phone, t: 'Call our hotline', lines: site.phones.map((p) => <a key={p.tel} href={`tel:${p.tel}`} className="block hover:text-forest-700">{p.display}</a>) },
    { icon: WhatsAppIcon, t: 'WhatsApp us', lines: [<a key="w" href={waLink('Hello!')} target="_blank" rel="noreferrer" className="hover:text-forest-700">Chat instantly, 24/7</a>] },
    { icon: Mail, t: 'Email', lines: [<a key="e" href={`mailto:${site.email}`} className="break-all hover:text-forest-700">{site.email}</a>] },
    { icon: Clock, t: 'Opening hours', lines: site.hours.map((h) => <span key={h.days} className="block">{h.days}: {h.time}</span>) },
  ]
  return (
    <>
      <PageHero title="Let’s talk property" text="Call, WhatsApp, email or visit one of our four offices. We’re here six days a week." image="/media/images/1554469384-e58fac16e23a.jpg" crumbs={[{ label: 'Contact' }]} />

      <section className="relative z-10 -mt-12">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.06} className="card p-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-forest-800 text-gold-400"><c.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 font-sans text-base font-semibold text-forest-900">{c.t}</h3>
              <div className="mt-2 space-y-1 text-sm text-muted">{c.lines}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="card p-6 sm:p-10">
            <span className="eyebrow">Send a message</span>
            <h2 className="mt-3 text-3xl text-forest-900 sm:text-4xl">We usually reply within the hour</h2>
            <p className="mt-2 mb-8 text-muted">During office hours. <span className={status.open ? 'text-forest-700' : 'text-rose-600'}>{status.text}.</span></p>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1} className="relative overflow-hidden rounded-[2rem] bg-forest-900 p-8 text-white sm:p-10">
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-gold-400/15 blur-3xl" />
            <h2 className="text-3xl">Customer hotline</h2>
            <p className="mt-2 text-white/70">Talk to a real person about renting, buying or managing property.</p>
            <div className="mt-8 space-y-3">
              {site.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center justify-between rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:bg-white/10">
                  <span><span className="block text-xs uppercase tracking-widest text-gold-400">{p.label}</span><span className="font-display text-2xl">{p.display}</span></span>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-400 text-forest-950"><Phone className="h-5 w-5" /></span>
                </a>
              ))}
            </div>
            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-gold-400">Opening hours</h3>
              <dl className="mt-4 space-y-2 text-sm">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4"><dt className="text-white/70">{h.days}</dt><dd className="font-medium">{h.time}</dd></div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="offices" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Our offices</span>
            <h2 className="mt-3 text-3xl text-forest-900 sm:text-4xl">Visit us in person</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
            <div className="space-y-3">
              {offices.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setActive(o.id)}
                  className={`relative w-full rounded-2xl p-5 text-left transition ${active === o.id ? 'text-white' : 'bg-cream hover:bg-forest-50'}`}
                  aria-pressed={active === o.id}
                >
                  {active === o.id && <motion.span layoutId="office" className="absolute inset-0 rounded-2xl bg-forest-800" />}
                  <span className="relative flex items-start gap-4">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${active === o.id ? 'bg-gold-400 text-forest-950' : 'bg-white text-forest-700'}`}><Building2 className="h-5 w-5" /></span>
                    <span>
                      <span className="flex items-center gap-2 font-display text-xl">{o.town}{o.headOffice && <span className={`rounded-full px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider ${active === o.id ? 'bg-white/15' : 'bg-gold-100 text-gold-600'}`}>Head office</span>}</span>
                      <span className={`mt-1 block text-sm ${active === o.id ? 'text-white/75' : 'text-muted'}`}>{o.building}, {o.street}<br />{o.floor}</span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div className="relative min-h-[26rem] overflow-hidden rounded-[2rem] ring-1 ring-line">
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={office.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  title={`Map of our ${office.town} office`}
                  src={mapEmbed(office.mapQuery)}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </AnimatePresence>
              <div className="absolute right-4 bottom-4 left-4 flex flex-col gap-3 rounded-2xl bg-white/95 p-4 shadow-lift backdrop-blur sm:right-auto sm:max-w-sm">
                <p className="flex items-start gap-2 text-sm"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" /><span><strong className="text-forest-900">{office.building}</strong>, {office.street}, {office.town} · {office.floor}</span></p>
                <a href={mapLink(office.mapQuery)} target="_blank" rel="noreferrer" className="btn-forest !py-2.5"><Navigation className="h-4 w-4" /> Get directions</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
