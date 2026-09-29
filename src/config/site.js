// ─────────────────────────────────────────────────────────────
//  Single source of truth for company details.
//  Change the name, contacts and offices here and every page updates.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'RIRI Housing Agency',
  legalName: 'RIRI Housing Agency Limited',
  shortName: 'RIRI',
  tagline: 'Property management & real estate you can trust',
  description:
    'We find tenants for vacant houses, sell and market property, collect rent and manage buildings on behalf of landlords across Eldoret, Kitale, Nairobi and Nakuru.',
  founded: 2014,

  phones: [
    { label: 'Hotline 1', display: '0741 046 061', tel: '+254741046061' },
    { label: 'Hotline 2', display: '0712 995 254', tel: '+254712995254' },
  ],
  // Number used for all WhatsApp buttons (international format, no +)
  whatsapp: '254741046061',
  // Leave empty to hide the email everywhere on the site
  email: 'companyriri@gmail.com',

  // Optional: paste a Formspree endpoint (https://formspree.io/f/xxxx) to receive
  // form submissions by email with no backend. Left empty, forms open WhatsApp/email instead.
  formEndpoint: '',

  // Add more (e.g. facebook, instagram) here and to the footer when available
  socials: {
    tiktok: 'https://www.tiktok.com/@ririhousingagency',
  },
  tiktokHandle: '@ririhousingagency',

  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 5:00 PM' },
    { days: 'Saturday', time: '8:00 AM – 1:00 PM' },
    { days: 'Sunday & Public Holidays', time: 'Closed' },
  ],
}

export const offices = [
  {
    id: 'eldoret',
    town: 'Eldoret',
    headOffice: true,
    building: 'Rieti House',
    street: 'Uganda Road',
    floor: '3rd Floor, Room 38',
    mapQuery: 'Uganda Road, Eldoret, Kenya',
    image: '/media/images/1497366216548-37526070297c.jpg',
  },
  {
    id: 'nairobi',
    town: 'Nairobi',
    building: 'Serengeti Building',
    street: 'Ngara',
    floor: '1st Floor, Room 102',
    mapQuery: 'Ngara, Nairobi, Kenya',
    image: '/media/images/1582407947304-fd86f028f716.jpg',
  },
  {
    id: 'nakuru',
    town: 'Nakuru',
    building: 'Lydia Arcade',
    street: 'Opposite Equity Bank',
    floor: '3rd Floor, Room 302',
    mapQuery: 'Equity Bank Nakuru, Kenya',
    image: '/media/images/1554469384-e58fac16e23a.jpg',
  },
  {
    id: 'kitale',
    town: 'Kitale',
    // TODO: confirm the Kitale building and room number
    building: 'Kitale Office',
    street: 'Kitale Town',
    floor: 'Call us for directions',
    mapQuery: 'Kitale, Kenya',
    image: '/media/images/1558036117-15d82a90b9b1.jpg',
  },
]

export const media = {
  heroVideo: '/media/videos/hero.mp4',
  heroPoster: '/media/videos/hero-poster.jpg',
  interiorVideo: '/media/videos/interior.mp4',
  interiorPoster: '/media/videos/interior-poster.jpg',
}

// All photos live in public/media/images, so this just returns the path.
export const img = (url) => url
