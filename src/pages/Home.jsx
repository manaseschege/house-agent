import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Search, MapPin, Home as HomeIcon, ArrowRight, ShieldCheck, Clock3, Wallet, Building,
  Plus, HandCoins, Phone, CheckCircle2,
} from 'lucide-react'
import { site, offices, media, img } from '../config/site'
import { towns, propertyTypes } from '../data/properties'
import { services } from '../data/services'
import { faqs } from '../data/company'
import { listings, listingPrice, listingPlace, smallPhoto } from '../data/listings'
import { Reveal, SectionHeading, Counter, WhatsAppIcon } from '../components/ui'
import { waLink } from '../lib/utils'

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const navigate = useNavigate()
  const [purpose, setPurpose] = useState('rent')
  const [town, setTown] = useState('')
  const [type, setType] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const q = new URLSearchParams({ purpose })
    if (town) q.set('town', town)
    if (type) q.set('type', type)
    navigate(`/properties?${q}`)
  }

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest-950 pb-16 sm:items-center sm:pb-0">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          src={media.heroVideo}
          poster={media.heroPoster}
          autoPlay muted loop playsInline preload="auto"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/90 via-forest-950/60 to-forest-950/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />

      <motion.div style={{ opacity: fade }} className="container-x pt-36 sm:pt-32">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur">
          <MapPin className="h-3.5 w-3.5 text-gold-400" /> Eldoret · Nairobi · Nakuru · Kitale
        </motion.span>
        <h1 className="mt-6 max-w-4xl text-[2.6rem] leading-[1.05] text-white sm:text-6xl lg:text-7xl">
          {['Find a home you love.', 'Let us look after the rest.'].map((line, i) => (
            <motion.span key={line} className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}>
              {i === 1 ? <em className="font-normal text-gold-400">{line}</em> : line}
            </motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }} className="mt-6 max-w-xl text-lg text-white/80">
          Vacant houses, property for sale and complete property management — rent collection, inspections and monthly landlord accounts under one roof.
        </motion.p>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 max-w-4xl rounded-3xl bg-white/95 p-3 shadow-lift backdrop-blur-xl"
        >
          <div className="flex gap-1 p-1" role="tablist">
            {[['rent', 'Rent'], ['sale', 'Buy']].map(([v, l]) => (
              <button type="button" role="tab" aria-selected={purpose === v} key={v} onClick={() => setPurpose(v)} className={`relative rounded-full px-5 py-2 text-sm font-semibold transition ${purpose === v ? 'text-white' : 'text-muted hover:text-forest-800'}`}>
                {purpose === v && <motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-forest-800" />}
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>
          <div className="grid gap-2 p-1 sm:grid-cols-[1fr_1fr_auto]">
            <label className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3">
              <MapPin className="h-5 w-5 text-gold-600" />
              <span className="flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Location</span>
                <select value={town} onChange={(e) => setTown(e.target.value)} className="w-full bg-transparent text-sm font-medium outline-none">
                  <option value="">All towns</option>
                  {towns.map((t) => <option key={t}>{t}</option>)}
                </select>
              </span>
            </label>
            <label className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3">
              <HomeIcon className="h-5 w-5 text-gold-600" />
              <span className="flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Property type</span>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-transparent text-sm font-medium outline-none">
                  <option value="">Any type</option>
                  {propertyTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </span>
            </label>
            <button className="btn-forest !rounded-2xl !px-8 !py-4"><Search className="h-5 w-5" /> Find a property</button>
          </div>
        </motion.form>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 hidden h-10 w-6 -translate-x-1/2 justify-center rounded-full border-2 border-white/40 pt-2 sm:flex"
      >
        <span className="h-2 w-1 rounded-full bg-white/80" />
      </motion.div>
    </section>
  )
}

function Marquee() {
  const items = ['Vacant Houses', 'Property Sales', 'Rent Collection', 'Property Management', 'Monthly Landlord Accounts', 'Property Inspections', 'Loans Against Rent', 'Fair Market Rent']
  return (
    <div className="overflow-hidden border-y border-forest-800 bg-forest-900 py-5">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-xl text-white/85 italic">
            {t}<span className="text-gold-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Intro() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="grid grid-cols-5 gap-4">
            <img src={img('/media/images/1600607687939-ce8a6c25118c.jpg', 900)} alt="Bright modern living room" className="col-span-3 h-80 w-full rounded-3xl object-cover sm:h-[28rem]" loading="lazy" />
            <div className="col-span-2 flex flex-col gap-4">
              <img src={img('/media/images/1583608205776-bfd35f0d9f83.jpg', 600)} alt="Family bungalow" className="h-40 w-full rounded-3xl object-cover sm:h-52" loading="lazy" />
              <img src={img('/media/images/1600566753086-00f18fb6b3ea.jpg', 600)} alt="Bright living room with plants" className="h-36 w-full rounded-3xl object-cover sm:h-52" loading="lazy" />
            </div>
          </div>
          <div className="absolute -bottom-8 left-6 flex items-center gap-4 rounded-2xl bg-white p-4 pr-6 shadow-lift sm:left-10">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-100 text-gold-600"><Building className="h-6 w-6" /></span>
            <div>
              <p className="font-display text-2xl text-forest-900">4 offices</p>
              <p className="text-xs text-muted">across Kenya</p>
            </div>
          </div>
        </Reveal>
        <div>
          <SectionHeading eyebrow="Who we are" title="Real estate that works as hard as you do" text={`${site.name} connects tenants and buyers with quality homes, and gives landlords peace of mind with rent collection, inspections and clear monthly accounts.`} />
          <Reveal delay={0.1} className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              [ShieldCheck, 'Vetted tenants', 'Identity, income and reference checks.'],
              [Wallet, 'Rent on time', 'Collected and sent to you every month.'],
              [Clock3, 'Fast response', 'Tenant issues handled and reported.'],
              [HandCoins, 'Rental loans', 'Borrow against your rental income.'],
            ].map(([Icon, t, d]) => (
              <div key={t} className="flex gap-4 rounded-2xl p-3 transition hover:bg-white hover:shadow-soft">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-50 text-forest-700"><Icon className="h-5 w-5" /></span>
                <div><p className="font-semibold text-forest-900">{t}</p><p className="text-sm text-muted">{d}</p></div>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <Link to="/about" className="btn-forest">Our story <ArrowRight className="h-4 w-4" /></Link>
            <a href={`tel:${site.phones[0].tel}`} className="btn-outline"><Phone className="h-4 w-4" /> {site.phones[0].display}</a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// Latest properties with full details, linking through to the Properties page
function AvailableNow() {
  const items = listings.filter((l) => l.price).slice(0, 3)
  if (!items.length) return null
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Available now" title="Vacant houses ready to move into" />
          <Link to="/properties" className="btn-outline">See all properties <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((l, i) => (
            <Reveal key={l.id} delay={i * 0.08}>
              <Link to={`/properties?town=${l.town}`} className="group card block overflow-hidden transition-shadow duration-500 hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={smallPhoto(l.photos[0])} alt={l.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 right-4 font-display text-xl text-white drop-shadow">{listingPrice(l)}</p>
                </div>
                <div className="p-5">
                  <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gold-600"><MapPin className="h-3.5 w-3.5" />{listingPlace(l)}</p>
                  <h3 className="mt-2 text-2xl text-forest-900">{l.name}</h3>
                  <p className="mt-1 text-sm text-muted">{l.bedrooms} bedroom {l.type.toLowerCase()} · for {l.purpose}</p>
                </div>
              </Link>
            </Reveal>
          ))}
          {items.length < 3 && (
            <Reveal delay={items.length * 0.08}>
              <Link to="/properties#request" className="group relative flex h-full min-h-72 flex-col justify-end overflow-hidden rounded-3xl bg-forest-800 p-7 text-white">
                <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gold-400/20 blur-3xl" />
                <Search className="h-9 w-9 text-gold-400" />
                <h3 className="mt-5 text-2xl">Looking for something else?</h3>
                <p className="mt-2 text-sm text-white/70">Tell us the town, size and budget. We’ll find you options and reply on WhatsApp.</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-400">Send a request <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="relative overflow-hidden bg-forest-950 py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute top-0 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-forest-600/20 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading light center eyebrow="What we do" title="Everything your property needs, handled by one team" text="From filling a vacant unit to sending you a clear statement each month, we take care of it all." />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.08}>
              <Link to={`/services#${s.id}`} className="group relative block h-full overflow-hidden rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 transition duration-500 hover:-translate-y-1 hover:bg-white/10">
                <img src={img(s.image, 600)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-20" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-400/15 text-gold-400 transition group-hover:bg-gold-400 group-hover:text-forest-950"><s.icon className="h-6 w-6" /></span>
                    <span className="font-display text-4xl text-white/10">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-400">Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Steps() {
  const steps = [
    ['Talk to us', 'Call, WhatsApp or visit any of our four offices. We’ll listen to what you need.'],
    ['We inspect & value', 'We inspect the property and recommend a fair market rent or asking price.'],
    ['We market & vet', 'We advertise, show the property and carefully vet every tenant or buyer.'],
    ['You get paid', 'Rent is collected and remitted monthly, with a clear statement of account.'],
  ]
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow="For landlords" title="Hand over the keys. Keep the income." text="Four simple steps from a vacant unit to rent in your account — with nothing for you to chase." />
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
            <Link to="/list-property" className="btn-gold">List your property <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/contact" className="btn-outline"><Phone className="h-4 w-4" /> Talk to us</Link>
          </Reveal>
        </div>
        <ol className="relative space-y-6 before:absolute before:top-4 before:bottom-4 before:left-7 before:w-px before:bg-line">
          {steps.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 0.08} className="relative flex gap-6 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-line/70">
              <span className="relative z-10 grid h-14 w-14 shrink-0 -ml-6 place-items-center rounded-full bg-forest-800 font-display text-xl text-gold-400 ring-8 ring-cream sm:ml-0">{i + 1}</span>
              <div>
                <h3 className="text-xl text-forest-900">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function VideoBand() {
  const facts = [
    { n: 4, s: '', l: 'Branch offices' },
    { n: services.length, s: '', l: 'Landlord services' },
    { n: 6, s: ' days', l: 'Open every week' },
    { n: 2, s: '', l: 'Customer hotlines' },
  ]
  return (
    <section className="relative isolate overflow-hidden py-28 sm:py-40">
      <video src={media.interiorVideo} poster={media.interiorPoster} className="absolute inset-0 -z-10 h-full w-full object-cover" autoPlay muted loop playsInline preload="none" />
      <div className="absolute inset-0 -z-10 bg-forest-950/75" />
      <div className="container-x text-center text-white">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-4xl sm:text-5xl">Step inside before you visit</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/75">Browse our homes online, then book a viewing at a time that suits you.</p>
        </Reveal>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
          {facts.map((f) => (
            <Reveal key={f.l} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
              <p className="font-display text-5xl text-gold-400"><Counter to={f.n} suffix={f.s} /></p>
              <p className="mt-2 text-sm text-white/70">{f.l}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const townCount = (town) => listings.filter((l) => l.town === town).length
const townPhoto = (o) => {
  const first = listings.find((l) => l.town === o.town)
  return first ? smallPhoto(first.photos[0]) : img(o.image)
}

function Towns() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Where we work" title="Browse by town" text="Local teams in every town, who know the neighbourhoods, the rents and the landlords." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((o, i) => {
            return (
              <Reveal key={o.id} delay={i * 0.08}>
                <Link to={`/properties?town=${o.town}`} className={`group relative block overflow-hidden rounded-3xl ${i % 2 ? 'h-80 lg:mt-12' : 'h-96'}`}>
                  <img src={townPhoto(o)} alt={o.town} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">{townCount(o.town) ? `${townCount(o.town)} available now` : 'Houses & property'}</p>
                    <h3 className="mt-1 text-3xl">{o.town}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-white/70 opacity-0 transition group-hover:opacity-100">Explore <ArrowRight className="h-4 w-4" /></p>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading eyebrow="FAQs" title="Questions we hear often" text="Can’t find your answer? Our team is one call or WhatsApp message away." />
          <Reveal delay={0.1} className="mt-8">
            <a href={waLink('Hello, I have a question.')} target="_blank" rel="noreferrer" className="btn bg-[#25D366] text-white hover:brightness-95"><WhatsAppIcon className="h-5 w-5" /> Ask on WhatsApp</a>
          </Reveal>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={open === i}>
                <span className="font-display text-lg text-forest-900 sm:text-xl">{f.q}</span>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition duration-300 ${open === i ? 'rotate-45 bg-forest-800 text-white' : 'text-forest-800'}`}><Plus className="h-4 w-4" /></span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="pb-6 pr-12 leading-relaxed text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTA() {
  return (
    <section className="py-20">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold-400 to-gold-600 px-6 py-14 sm:px-14">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/20 blur-2xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="max-w-2xl text-3xl text-forest-950 sm:text-4xl">Have a vacant house or a property to sell?</h2>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-forest-900">
                {['Free valuation', 'Vetted tenants', 'Monthly statements'].map((t) => <li key={t} className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" />{t}</li>)}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/list-property" className="btn-forest">List your property <ArrowRight className="h-4 w-4" /></Link>
              <a href={`tel:${site.phones[0].tel}`} className="btn border border-forest-950/20 text-forest-950 hover:bg-forest-950/10"><Phone className="h-4 w-4" /> Call us</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <AvailableNow />
      <Services />
      <Steps />
      <VideoBand />
      <Towns />
      <FAQ />
      <CTA />
    </>
  )
}
