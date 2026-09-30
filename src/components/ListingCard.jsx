import { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import { MapPin, BedDouble, Building2, Images } from 'lucide-react'
import { site } from '../config/site'
import { listingPrice, listingPlace } from '../data/listings'
import { lightboxSlide } from '../lib/images'
import Img from './Img'
import { waLink } from '../lib/utils'
import { WhatsAppIcon } from './ui'

function enquiry(l) {
  const details = [l.bedrooms && `${l.bedrooms} bedroom`, listingPlace(l), listingPrice(l)].filter(Boolean).join(' · ')
  return `Hello ${site.name}, I'm interested in ${l.name} (${details}). Is a unit available? I'd like to arrange a viewing.`
}

export default function ListingCard({ l, index = 0 }) {
  const [open, setOpen] = useState(-1)
  const price = listingPrice(l)
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group card flex flex-col overflow-hidden transition-shadow duration-500 hover:shadow-lift"
    >
      <button onClick={() => setOpen(0)} className="relative block aspect-[4/3] overflow-hidden text-left" aria-label={`View photos of ${l.name}`}>
        <Img src={l.photos[0]} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" alt={l.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold ${l.purpose === 'rent' ? 'bg-white text-forest-800' : 'bg-gold-400 text-forest-950'}`}>
          For {l.purpose === 'rent' ? 'Rent' : 'Sale'}
        </span>
        <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          <Images className="h-3.5 w-3.5" /> {l.photos.length}
        </span>
        <p className="absolute bottom-4 left-4 right-4 font-display text-xl text-white drop-shadow sm:text-2xl">
          {price || 'Price on request'}
        </p>
      </button>

      {l.photos.length > 1 && (
        <div className="flex gap-1.5 px-5 pt-4">
          {l.photos.slice(1, 5).map((src, i) => (
            <button key={src} onClick={() => setOpen(i + 1)} className="h-14 flex-1 overflow-hidden rounded-lg" aria-label={`Photo ${i + 2} of ${l.name}`}>
              <Img src={src} sizes="120px" alt="" className="h-full w-full object-cover transition hover:scale-110" />
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gold-600">
          <MapPin className="h-3.5 w-3.5" /> {listingPlace(l)}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-snug text-forest-900">{l.name}</h3>
        <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted">
          <span className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1"><BedDouble className="h-4 w-4 text-forest-600" />{l.bedrooms ? `${l.bedrooms} bedroom` : 'Sizes on request'}</span>
          <span className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1"><Building2 className="h-4 w-4 text-forest-600" />{l.type}</span>
        </div>
        <div className="mt-auto pt-5">
          <a href={waLink(enquiry(l))} target="_blank" rel="noreferrer" className="btn w-full bg-[#25D366] text-white hover:brightness-95">
            <WhatsAppIcon className="h-4 w-4" /> Enquire on WhatsApp
          </a>
        </div>
      </div>

      <Lightbox
        open={open >= 0}
        index={Math.max(open, 0)}
        close={() => setOpen(-1)}
        slides={l.photos.map((src) => lightboxSlide(src, l.name))}
        plugins={[Counter]}
        styles={{ container: { backgroundColor: 'rgba(6, 35, 26, .96)' } }}
      />
    </motion.article>
  )
}
