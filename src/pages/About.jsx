import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Target, Eye, Award, ShieldCheck, Zap, MapPinned, ArrowRight, Users } from 'lucide-react'
import { site, img, offices } from '../config/site'
import { orgChart, timeline, values } from '../data/company'
import { PageHero, Reveal, SectionHeading } from '../components/ui'
import { CTA } from './Home'

const valueIcons = [ShieldCheck, Zap, Award, MapPinned]

function OrgNode({ node, highlight, delay = 0 }) {
  return (
    <Reveal delay={delay} y={16} className="relative">
      <div className={`rounded-2xl px-5 py-4 text-center transition duration-300 hover:-translate-y-1 ${highlight ? 'bg-forest-800 text-white shadow-lift' : 'bg-white shadow-soft ring-1 ring-line'}`}>
        <p className={`font-display text-lg ${highlight ? 'text-gold-400' : 'text-forest-900'}`}>{node.title}</p>
        <p className={`mt-0.5 text-xs ${highlight ? 'text-white/70' : 'text-muted'}`}>{node.note}</p>
      </div>
    </Reveal>
  )
}

const Connector = () => <div className="mx-auto h-10 w-px bg-gradient-to-b from-gold-500 to-gold-400/30" />

function OrgChart() {
  return (
    <section id="structure" className="scroll-mt-24 bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading center eyebrow="Company structure" title="The people behind every property" text="A clear chain of responsibility, from our shareholders to the property managers who look after your building day to day." />
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="mx-auto max-w-xs space-y-0">
            <OrgNode node={orgChart.top[0]} />
            <Connector />
            <OrgNode node={orgChart.top[1]} highlight delay={0.05} />
            <Connector />
          </div>
          <div className="relative">
            <div className="absolute top-0 right-[12.5%] left-[12.5%] hidden h-px bg-gold-400/50 md:block" />
            <div className="grid gap-4 pt-0 sm:grid-cols-2 md:grid-cols-4 md:pt-8">
              {orgChart.directors.map((n, i) => (
                <div key={n.title} className="relative">
                  <div className="absolute -top-8 left-1/2 hidden h-8 w-px bg-gold-400/50 md:block" />
                  <OrgNode node={n} highlight={n.center} delay={0.1 + i * 0.05} />
                </div>
              ))}
            </div>
          </div>
          <Connector />
          <div className="relative">
            <div className="absolute top-0 right-[16.6%] left-[16.6%] hidden h-px bg-gold-400/50 md:block" />
            <div className="grid gap-4 md:grid-cols-3 md:pt-8">
              {orgChart.management.map((n, i) => (
                <div key={n.title} className={`relative ${n.center ? 'md:order-none' : ''}`}>
                  <div className="absolute -top-8 left-1/2 hidden h-8 w-px bg-gold-400/50 md:block" />
                  <OrgNode node={n} highlight={n.center} delay={0.3 + i * 0.05} />
                </div>
              ))}
            </div>
          </div>
          <Connector />
          <div className="mx-auto max-w-sm">
            <Reveal delay={0.45}>
              <div className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 px-6 py-5 text-forest-950 shadow-lift">
                <Users className="h-6 w-6" />
                <div>
                  <p className="font-display text-lg">{orgChart.field[0].title}</p>
                  <p className="text-xs text-forest-900/80">{orgChart.field[0].note}</p>
                </div>
              </div>
            </Reveal>
          </div>
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
            <img src={img('/media/images/1600210492486-724fe5c67fb0.jpg', 1000)} alt="Warm, well-kept living room" className="h-[30rem] w-full rounded-[2rem] object-cover" loading="lazy" />
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
