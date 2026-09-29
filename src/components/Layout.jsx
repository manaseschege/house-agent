import { Suspense, useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Phone, Mail, Clock, ChevronDown, ArrowUp, MapPin, Send } from 'lucide-react'
import { site, offices } from '../config/site'
import { services } from '../data/services'
import { useOpenStatus, waLink } from '../lib/utils'
import { WhatsAppIcon, TikTokIcon } from './ui'

const nav = [
  { to: '/', label: 'Home' },
  {
    to: '/about', label: 'About',
    children: [
      { to: '/about', label: 'Our Story' },
      { to: '/about#structure', label: 'Company Structure' },
      { to: '/contact#offices', label: 'Our Offices' },
    ],
  },
  {
    to: '/properties', label: 'Properties',
    children: [
      { to: '/properties?purpose=rent', label: 'Vacant Houses to Rent' },
      { to: '/properties?purpose=sale', label: 'Properties for Sale' },
    ],
  },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export function Logo({ light }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-soft">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-forest-950" fill="currentColor"><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-xl font-semibold ${light ? 'text-white' : 'text-forest-900'}`}>{site.shortName}</span>
        <span className={`block text-[10px] font-semibold uppercase tracking-[0.25em] ${light ? 'text-gold-400' : 'text-gold-600'}`}>Housing Agency</span>
      </span>
    </Link>
  )
}

function OpenDot() {
  const s = useOpenStatus()
  return (
    <span className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        {s.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${s.open ? 'bg-emerald-400' : 'bg-rose-400'}`} />
      </span>
      {s.text}
    </span>
  )
}

function TopBar() {
  return (
    <div className="hidden bg-forest-950 text-[13px] text-white/75 md:block">
      <div className="container-x flex h-10 items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-gold-400" />Mon–Fri 8–5 · Sat 8–1</span>
          <OpenDot />
        </div>
        <div className="flex items-center gap-6">
          {site.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-2 hover:text-gold-400"><Phone className="h-3.5 w-3.5 text-gold-400" />{p.display}</a>
          ))}
          {site.email && <a href={`mailto:${site.email}`} className="hidden items-center gap-2 hover:text-gold-400 lg:flex"><Mail className="h-3.5 w-3.5 text-gold-400" />{site.email}</a>}
        </div>
      </div>
    </div>
  )
}

function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(null)
  // Pages with a dark hero start with a transparent header
  const overHero = !scrolled && !open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setOpen(false); setExpanded(null) }, [pathname])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <TopBar />
      <div className={`transition-all duration-500 ${overHero ? 'bg-transparent' : 'bg-white/90 shadow-soft backdrop-blur-xl'}`}>
        <div className={`container-x flex items-center justify-between transition-all duration-500 ${overHero ? 'h-20' : 'h-16'}`}>
          <Logo light={overHero} />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <div key={item.label} className="group relative">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                      overHero
                        ? isActive ? 'text-gold-400' : 'text-white/90 hover:text-white'
                        : isActive ? 'text-forest-800 bg-forest-50' : 'text-ink/80 hover:text-forest-800'
                    }`
                  }
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />}
                </NavLink>
                {item.children && (
                  <div className="invisible absolute top-full left-0 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="w-60 translate-y-2 rounded-2xl bg-white p-2 shadow-lift ring-1 ring-line transition group-hover:translate-y-0">
                      {item.children.map((c) => (
                        <Link key={c.label} to={c.to} className="block rounded-xl px-4 py-2.5 text-sm text-ink/80 hover:bg-forest-50 hover:text-forest-800">{c.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/list-property" className="btn-gold hidden !py-2.5 sm:inline-flex">List your property</Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${overHero ? 'text-white' : 'text-forest-900'}`}
              aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto bg-white px-4 pb-10 lg:hidden"
          >
            <nav className="divide-y divide-line" aria-label="Mobile">
              {nav.map((item) => (
                <div key={item.label} className="py-1">
                  <div className="flex items-center justify-between">
                    <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => `block py-3 font-display text-2xl ${isActive ? 'text-forest-700' : 'text-forest-900'}`}>{item.label}</NavLink>
                    {item.children && (
                      <button onClick={() => setExpanded(expanded === item.label ? null : item.label)} className="p-3" aria-label={`Show ${item.label} links`}>
                        <ChevronDown className={`h-5 w-5 transition ${expanded === item.label ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {expanded === item.label && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        {item.children.map((c) => (
                          <Link key={c.label} to={c.to} className="block py-2 pl-4 text-muted">{c.label}</Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
            <div className="mt-6 grid gap-3">
              <Link to="/list-property" className="btn-gold">List your property</Link>
              {site.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="btn-outline"><Phone className="h-4 w-4" />{p.display}</a>
              ))}
            </div>
            <div className="mt-6 text-sm text-muted"><OpenDot /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Footer() {
  const socials = [
    [site.socials.tiktok, TikTokIcon, 'TikTok'],
    [`https://wa.me/${site.whatsapp}`, WhatsAppIcon, 'WhatsApp'],
  ]
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-white/70">
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="container-x relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{site.description}</p>
          <div className="mt-6 flex gap-2">
            {socials.map(([href, Icon, label]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition hover:bg-gold-400 hover:text-forest-950">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-white">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[['About us', '/about'], ['Vacant houses', '/properties?purpose=rent'], ['For sale', '/properties?purpose=sale'], ['List your property', '/list-property'], ['Contact', '/contact']].map(([l, to]) => (
              <li key={l}><Link to={to} className="hover:text-gold-400">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-white">Services</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.id}><Link to={`/services#${s.id}`} className="hover:text-gold-400">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-white">Our offices</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {offices.map((o) => (
              <li key={o.id} className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /><span><span className="text-white">{o.town}</span> — {o.building}, {o.street}</span></li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 text-sm">
            {site.phones.map((p) => <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-2 hover:text-gold-400"><Phone className="h-4 w-4 text-gold-400" />{p.display}</a>)}
            <a href={site.socials.tiktok} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold-400"><TikTokIcon className="h-4 w-4 text-gold-400" />{site.tiktokHandle}</a>
            {site.email && <a href={`mailto:${site.email}`} className="flex items-center gap-2 break-all hover:text-gold-400"><Mail className="h-4 w-4 shrink-0 text-gold-400" />{site.email}</a>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p>Mon–Fri 8:00–5:00 · Sat 8:00–1:00 · Closed Sundays & public holidays</p>
        </div>
      </div>
    </footer>
  )
}

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const topics = ['I’m looking for a house to rent', 'I want to buy a property', 'I’m a landlord — manage my property', 'Loan against rental income', 'Report a tenant issue']
  const send = (text) => window.open(waLink(text), '_blank', 'noopener')
  return (
    <div className="fixed right-4 bottom-4 z-[60] sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute right-0 bottom-20 w-[min(22rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-line"
          >
            <div className="bg-gradient-to-br from-forest-800 to-forest-950 p-5 text-white">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366]"><WhatsAppIcon className="h-6 w-6" /></span>
                <div>
                  <p className="font-semibold">{site.name}</p>
                  <p className="text-xs text-white/70"><OpenDot /></p>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/85">Hi there 👋 How can we help you today? Choose a topic and we’ll reply on WhatsApp.</p>
            </div>
            <div className="space-y-2 p-4">
              {topics.map((t) => (
                <button key={t} onClick={() => send(t)} className="w-full rounded-xl border border-line px-4 py-2.5 text-left text-sm text-ink/80 transition hover:border-forest-600 hover:bg-forest-50">{t}</button>
              ))}
              <form onSubmit={(e) => { e.preventDefault(); if (msg.trim()) send(msg) }} className="flex gap-2 pt-2">
                <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Or type a message…" className="field !py-2.5" aria-label="Message" />
                <button className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#25D366] text-white" aria-label="Send on WhatsApp"><Send className="h-4 w-4" /></button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Chat with us on WhatsApp'}
        className="relative grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-105"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />}
        {open ? <X className="h-7 w-7" /> : <WhatsAppIcon className="h-8 w-8" />}
      </button>
    </div>
  )
}

function BackToTop() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [show, setShow] = useState(false)
  useEffect(() => scrollYProgress.on('change', (v) => setShow(v > 0.15)), [scrollYProgress])
  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gold-400" />
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-5 z-[55] grid h-12 w-12 place-items-center rounded-full bg-white text-forest-800 shadow-lift ring-1 ring-line sm:right-8 sm:bottom-28"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function Layout() {
  const location = useLocation()
  const outlet = useOutlet()
  return (
    <>
      <ScrollManager />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={<div className="min-h-screen bg-forest-950" />}>{outlet}</Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BackToTop />
      <ChatWidget />
    </>
  )
}
