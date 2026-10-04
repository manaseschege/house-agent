// ─────────────────────────────────────────────────────────────
//  Available properties shown on the Properties page.
//
//  To add a property:
//   1. Put its photos in public/media/properties/<town>/ as <name>-1.jpg,
//      <name>-2.jpg… (smaller WebP copies are made automatically at build)
//   2. Copy one of the entries below and change the details.
//
//  Leave a field as null when it isn't known yet; the site then shows
//  "Details on request" and the property still appears in searches.
//
//  A building with more than one kind of unit lists them under `units`
//  instead of `bedrooms` + `price` (bedrooms: 0 means a bedsitter).
// ─────────────────────────────────────────────────────────────

import { formatKES } from '../lib/utils'

const photos = (town, name, count) =>
  Array.from({ length: count }, (_, i) => `/media/properties/${town}/${name}-${i + 1}.jpg`)

export const listings = [
  {
    id: 'royal-park-apartments',
    name: 'Royal Park Apartments',
    town: 'Nakuru',
    area: 'Naka Centre',
    purpose: 'rent', // 'rent' or 'sale'
    type: 'Apartment',
    bedrooms: 2,
    price: [26000, 28000], // KES per month for rent; one number or [from, to]
    photos: photos('nakuru', 'royal-park', 3),
  },
  {
    id: 'pm-flats',
    name: 'PM Flats',
    town: 'Nakuru',
    area: 'Naka Centre',
    purpose: 'rent',
    type: 'Apartment',
    bedrooms: 2,
    price: [21000, 26000],
    photos: photos('nakuru', 'pm-flats', 3),
  },
  {
    // TODO: name, area, bedrooms and price still to come from the owner
    id: 'nakuru-pink-block',
    name: 'Apartments in Nakuru',
    town: 'Nakuru',
    area: null,
    purpose: 'rent',
    type: 'Apartment',
    bedrooms: null,
    price: null,
    photos: photos('nakuru', 'pink-block', 2),
  },
  {
    // TODO: name, area, bedrooms and price still to come from the owner
    id: 'nakuru-cream-block',
    name: 'Apartments in Nakuru',
    town: 'Nakuru',
    area: null,
    purpose: 'rent',
    type: 'Apartment',
    bedrooms: null,
    price: null,
    photos: photos('nakuru', 'cream-block', 3),
  },

  // ── Eldoret ────────────────────────────────────────────────
  {
    id: 'eldoret-pioneer-1br',
    name: '1-Bedroom Apartments, Pioneer',
    town: 'Eldoret',
    area: 'Pioneer',
    purpose: 'rent',
    type: 'Apartment',
    bedrooms: 1,
    price: 20000,
    photos: photos('eldoret', 'pioneer-1br', 3),
  },
  {
    id: 'eldoret-pioneer-2br',
    name: '2-Bedroom Apartments, Pioneer',
    town: 'Eldoret',
    area: 'Pioneer',
    purpose: 'rent',
    type: 'Apartment',
    bedrooms: 2,
    price: 27500,
    photos: photos('eldoret', 'pioneer-2br', 3),
  },
  {
    id: 'eldoret-uganda-road-2br',
    name: '2-Bedroom Apartments, Uganda Road',
    town: 'Eldoret',
    area: 'Along Uganda Road',
    purpose: 'rent',
    type: 'Apartment',
    bedrooms: 2,
    price: 25000,
    photos: photos('eldoret', 'uganda-road-2br', 2),
  },
  {
    id: 'eldoret-uganda-road-units',
    name: 'Bedsitters & 1-Bedrooms, Uganda Road',
    town: 'Eldoret',
    area: 'Along Uganda Road',
    purpose: 'rent',
    type: 'Apartment',
    units: [
      { bedrooms: 0, price: 15000 },
      { bedrooms: 1, price: 25000 },
    ],
    photos: photos('eldoret', 'uganda-road-units', 4),
  },
  {
    id: 'eldoret-visa-house',
    name: 'Visa House',
    town: 'Eldoret',
    area: 'Town Centre',
    purpose: 'rent',
    type: 'Apartment',
    bedrooms: 2,
    price: 27500,
    photos: photos('eldoret', 'visa-house', 2),
  },
]

// Every listing as a list of unit types, whether it was written with `units` or `bedrooms` + `price`
export const unitsOf = (l) => l.units ?? [{ bedrooms: l.bedrooms ?? null, price: l.price ?? null }]

export const unitLabel = (u) => (u.bedrooms == null ? null : u.bedrooms === 0 ? 'Bedsitter' : `${u.bedrooms} bedroom`)

// Lowest price of a unit, whether its price is one number or a [from, to] range
export const unitFrom = (u) => (Array.isArray(u.price) ? u.price[0] : u.price)

const fmt = (n) => formatKES(n)

export const unitPrice = (u) => {
  if (u.price == null) return null
  const [from, to] = Array.isArray(u.price) ? u.price : [u.price, u.price]
  return from === to ? fmt(from) : `${fmt(from)} – ${to.toLocaleString('en-KE')}`
}

// "1 bedroom", or "Bedsitter & 1 bedroom" for a building with several unit types
export const listingSizes = (l) => unitsOf(l).map(unitLabel).filter(Boolean).join(' & ') || null

// Price across all of a listing's units, e.g. "KES 15,000 – 25,000 / month"
export function listingPrice(l) {
  const all = unitsOf(l).flatMap((u) => (u.price == null ? [] : [].concat(u.price)))
  if (!all.length) return null
  const from = Math.min(...all), to = Math.max(...all)
  const range = from === to ? fmt(from) : `${fmt(from)} – ${to.toLocaleString('en-KE')}`
  return l.purpose === 'rent' ? `${range} / month` : range
}

export const listingPlace = (l) => (l.area ? `${l.area}, ${l.town}` : l.town)
