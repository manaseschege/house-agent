// Company structure shown on the About page. Photos live in public/media/team.
// Add `name: '...'` to anyone to show their name above their title.
const photo = (file) => `/media/team/${file}.jpg`

export const orgChart = {
  // TODO: shareholders' photos and details to come from the owner
  shareholders: { title: 'Shareholders', note: 'Owners of the company' },
  // All directors sit in one row, each shown simply as "Director"
  directors: ['director-general', 'secretary-general', 'loaning-director', 'loaning-director-2', 'welfare-director']
    .map((file) => ({ title: 'Director', photo: photo(file) })),
  manager: { title: 'Manager', photo: photo('manager') },
  office: [
    { title: 'Accountant', photo: photo('accountant-1') },
    { title: 'Accountant', photo: photo('accountant-2') },
    { title: 'Accountant', photo: photo('accountant-3') },
  ],
  field: [1, 2, 3, 4, 5].map((n) => ({ title: 'Property Manager', photo: photo(`property-manager-${n}`) })),
}

// TODO: replace with the real company history
export const timeline = [
  { year: 'Our start', title: 'Founded in Eldoret', text: 'We opened our first office in Rieti House, Uganda Road, helping local landlords find good tenants.' },
  { year: 'Growth', title: 'Full property management', text: 'We added rent collection, monthly landlord accounts and property inspections.' },
  { year: 'Expansion', title: 'Nairobi & Nakuru', text: 'We opened offices at Serengeti Building in Ngara and Lydia Arcade in Nakuru.' },
  { year: 'Today', title: 'Kitale & rental loans', text: 'We now serve the North Rift from Kitale and offer landlords loans against their rental income.' },
]

// Mission, vision and core values, from the company's own statement (scanned, Oct 2026)
export const mission = [
  'To provide the highest level of service and satisfaction to landlords and tenants through orderly and good management of the properties entrusted to us.',
  'To bridge the market gap in Kenya’s real estate management between landlords and tenants, and between global investors and local developers.',
]

export const vision = [
  'To make real estate management transparent and profitable for all parties through honesty, competence, trustworthiness and the detailed information that has been lacking in the market.',
  'To pioneer change in real estate management by identifying emerging opportunities not yet utilised.',
]

export const coreValues = {
  summary: 'Respecting people, promoting diversity, inclusion and professional growth in all areas.',
  items: ['Respecting people', 'Promoting diversity', 'Inclusion', 'Professional growth in all areas'],
}

export const faqs = [
  { q: 'How much do you charge to manage my property?', a: 'Our fee is a small percentage of the rent we collect, agreed with you upfront. Call or WhatsApp us for a quote on your building.' },
  { q: 'How and when do I receive my rent?', a: 'We remit rent to your bank or M-Pesa account every month and send a statement showing all income and expenses.' },
  { q: 'Do you vet tenants?', a: 'Yes. We check identity, employment or income and previous landlord references before any tenant moves in.' },
  { q: 'Can I get a loan against my rental income?', a: 'Landlords whose properties we manage can apply for a loan that is repaid directly from rent we collect. Call or WhatsApp us to find out how much you could borrow.' },
  { q: 'Which areas do you cover?', a: 'We have offices in Eldoret, Nairobi, Nakuru and Kitale and manage property in and around these towns.' },
  { q: 'I’m a tenant. How do I report a problem?', a: 'Call our hotline or send us a WhatsApp message. We log every complaint, fix it, and report it to your landlord.' },
]
