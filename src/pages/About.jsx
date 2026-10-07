import { Link } from 'react-router-dom'
import Img from '../components/Img'
import { motion } from 'framer-motion'
import { Target, Eye, Award, ShieldCheck, Zap, MapPinned, ArrowRight } from 'lucide-react'
import { site, offices } from '../config/site'
import { orgChart, timeline, values } from '../data/company'
import { PageHero, Reveal, SectionHeading } from '../components/ui'
import { CTA } from './Home'

const valueIcons = [ShieldCheck, Zap, Award, MapPinned]

function Person({ person, large, delay = 0 }) {
  return (
    <Reveal delay={delay} y={16} className={large ? 'w-44 sm:w-52' : 'w-36 sm:w-40'}>
      <figure className="group text-center">
        <div className={`overflow-hidden rounded-3xl bg-forest-50 shadow-soft transition duration-500 group-hover:-translate-y-1 group-hover:shadow-lift ${large ? 'ring-4 ring-gold-400' : 'ring-1 ring-line'}`}>
          <img
            src={person.photo}
            alt={person.name ? `${person.name}, ${person.title}` : person.title}
            width="640" height="800" loading="lazy" decoding="async"
            className="aspect-[4/5] w-full object-cover object-top transition duration-700 group-hover:scale-105"
          />
        </div>
        <figcaption className="mt-3">
          {person.name && <p className="font-display text-lg leading-tight text-forest-900">{person.name}</p>}
          <p className={person.name ? 'text-xs font-semibold uppercase tracking-wider text-gold-600' : `font-display leading-tight text-forest-900 ${large ? 'text-xl' : 'text-base'}`}>{person.title}</p>
        </figcaption>
      </figure>
    </Reveal>
  )
}

const Connector = () => <div className="mx-auto my-5 h-10 w-px bg-gradient-to-b from-gold-500 to-gold-400/30" />

function Level({ label, people, delay = 0 }) {
  return (
    <div>
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{label}</p>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-7 sm:gap-x-8">
        {people.map((p, i) => <Person key={p.photo} person={p} delay={delay + i * 0.05} />)}
      </div>
    </div>
  )
}

function OrgChart() {
  return (
    <section id="structure" className="scroll-mt-24 bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading center eyebrow="Company structure" title="The people behind every property" text="A clear chain of responsibility, from our shareholders to the property managers who look after your building day to day." />
        <div className="mx-auto mt-16 max-w-5xl">
          <Reveal className="mx-auto max-w-xs rounded-2xl bg-forest-800 px-5 py-4 text-center text-white shadow-lift">
            <p className="font-display text-lg text-gold-400">{orgChart.shareholders.title}</p>
            <p className="mt-0.5 text-xs text-white/70">{orgChart.shareholders.note}</p>
          </Reveal>
          <Connector />
          <div className="flex justify-center"><Person person={orgChart.lead} large /></div>
          <Connector />
          <Level label="Directors" people={orgChart.directors} />
          <Connector />
          <div className="flex justify-center"><Person person={orgChart.manager} /></div>
          <Connector />
          <Level label="Accountants" people={orgChart.office} />
          <Connector />
          <Level label="Property managers" people={orgChart.field} />
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <PageHero
        title={`About ${site.name}`}
        text="Trusted by landlords, tenants and buyers across Kenya — built on honesty, local knowledge and results."
        image="/media/images/1600566753190-17f0baa2a6c3.jpg"
        crumbs={[{ label: 'About' }]}
      />

      <section id="story" className="py-24 sm:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our story" title="Making property simple for landlords and tenants" />
            <Reveal delay={0.1} className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>We started in Eldoret with one idea: owning property should bring income and peace of mind, not stress. Landlords were chasing rent, fixing problems at midnight and guessing what to charge. Tenants struggled to find good, fairly priced homes.</p>
              <p>Today our team runs four offices — Eldoret, Nairobi, Nakuru and Kitale — finding tenants, selling property, collecting rent, inspecting buildings and sending landlords a clear account every month. For landlords who want to grow, we also lend against rental income.</p>
            </Reveal>
          </div>
          <Reveal className="relative">
            <Img src={'/media/images/1600210492486-724fe5c67fb0.jpg'} sizes="(min-width: 1024px) 45vw, 100vw" alt="Warm, well-kept living room" className="h-[30rem] w-full rounded-[2rem] object-cover" />
          </Reveal>
        </div>

        <div className="container-x mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = valueIcons[i]
            return (
              <Reveal key={v.title} delay={i * 0.08} className="card group p-7 transition duration-500 hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest-50 text-forest-700 transition group-hover:bg-forest-800 group-hover:text-gold-400"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-5 text-xl text-forest-900">{v.title}</h3>
                <p className="mt-2 text-sm text-muted">{v.text}</p>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-950 py-24 text-white sm:py-32">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[
            [Target, 'Our mission', 'To give every landlord reliable income and every tenant a home they are proud of, through honest, professional property services.'],
            [Eye, 'Our vision', 'To be the most trusted property management and real estate partner in Kenya, known for transparency and results.'],
          ].map(([Icon, t, d], i) => (
            <Reveal key={t} delay={i * 0.1} className="rounded-3xl bg-white/5 p-10 ring-1 ring-white/10">
              <Icon className="h-10 w-10 text-gold-400" />
              <h3 className="mt-6 text-3xl">{t}</h3>
              <p className="mt-4 text-lg leading-relaxed text-white/70">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading center eyebrow="Our journey" title="How we got here" />
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute top-0 bottom-0 left-5 w-px bg-line md:left-1/2" />
            {timeline.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.05} className={`relative mb-10 pl-16 md:w-1/2 md:pl-0 ${i % 2 ? 'md:ml-auto md:pl-14' : 'md:pr-14 md:text-right'}`}>
                <motion.span
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                  className={`absolute top-1 left-5 h-4 w-4 -translate-x-1/2 rounded-full bg-gold-400 ring-8 ring-cream ${i % 2 ? 'md:left-0' : 'md:left-full'}`}
                />
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">{t.year}</span>
                <h3 className="mt-1 text-2xl text-forest-900">{t.title}</h3>
                <p className="mt-2 text-muted">{t.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <OrgChart />

      <section className="py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Visit us" title="Four offices, one team" />
            <Link to="/contact#offices" className="btn-outline">Directions & maps <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((o, i) => (
              <Reveal key={o.id} delay={i * 0.06} className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">{o.headOffice ? 'Head office' : 'Branch'}</p>
                <h3 className="mt-2 text-2xl text-forest-900">{o.town}</h3>
                <p className="mt-2 text-sm text-muted">{o.building}, {o.street}<br />{o.floor}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
