import { Link } from 'react-router-dom'
import Img from '../components/Img'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { services } from '../data/services'
import { waLink } from '../lib/utils'
import { PageHero, Reveal, WhatsAppIcon } from '../components/ui'
import { CTA, FAQ } from './Home'

export default function Services() {
  return (
    <>
      <PageHero
        title="Services built around landlords, tenants & buyers"
        text="One team for advertising, sales, rent collection, management, accounts, inspections and rental loans."
        image="/media/images/1613490493576-7fde63acd811.jpg"
        crumbs={[{ label: 'Services' }]}
      />

      <div className="sticky top-16 z-30 border-b border-line bg-cream/90 backdrop-blur-xl md:top-[6.5rem]">
        <div className="container-x flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink/80 ring-1 ring-line transition hover:bg-forest-800 hover:text-white">{s.title}</a>
          ))}
        </div>
      </div>

      <section className="py-16 sm:py-24">
        <div className="container-x space-y-24 sm:space-y-32">
          {services.map((s, i) => (
            <div key={s.id} id={s.id} className="grid scroll-mt-44 items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <Reveal className={`relative ${i % 2 ? 'lg:order-2' : ''}`}>
                <div className="overflow-hidden rounded-[2rem]">
                  <Img src={s.image} sizes="(min-width: 1024px) 45vw, 100vw" alt={s.title} className="h-80 w-full object-cover transition duration-1000 hover:scale-105 sm:h-[26rem]" />
                </div>
                <span className={`absolute -bottom-6 grid h-20 w-20 place-items-center rounded-3xl bg-gold-400 text-forest-950 shadow-lift ${i % 2 ? 'left-6' : 'right-6'}`}>
                  <s.icon className="h-8 w-8" />
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <span className="font-display text-6xl text-gold-400/40">0{i + 1}</span>
                <h2 className="mt-2 text-3xl text-forest-900 sm:text-4xl">{s.title}</h2>
                <p className="mt-4 text-lg text-muted">{s.short}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-ink/80"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-forest-600" />{pt}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={waLink(`Hello, I'd like to know more about: ${s.title}`)} target="_blank" rel="noreferrer" className="btn bg-[#25D366] text-white hover:brightness-95"><WhatsAppIcon className="h-4 w-4" /> Enquire</a>
                  {s.id === 'vacant-houses' || s.id === 'sales-marketing' ? (
                    <Link to={`/properties?purpose=${s.id === 'vacant-houses' ? 'rent' : 'sale'}`} className="btn-outline">Find a property <ArrowRight className="h-4 w-4" /></Link>
                  ) : (
                    <Link to="/list-property" className="btn-outline">Get started <ArrowRight className="h-4 w-4" /></Link>
                  )}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
      <FAQ />
      <CTA />
    </>
  )
}
