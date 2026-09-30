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
]

export function listingPrice(l) {
  if (!l.price) return null
  const [from, to] = Array.isArray(l.price) ? l.price : [l.price, l.price]
  const range = from === to ? formatKES(from) : `${formatKES(from)} – ${to.toLocaleString('en-KE')}`
  return l.purpose === 'rent' ? `${range} / month` : range
}

export const listingPlace = (l) => (l.area ? `${l.area}, ${l.town}` : l.town)
