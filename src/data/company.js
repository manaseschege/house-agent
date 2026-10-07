// Company structure shown on the About page. Photos live in public/media/team.
// Add `name: '...'` to anyone to show their name above their title.
const photo = (file) => `/media/team/${file}.jpg`

export const orgChart = {
  // TODO: shareholders' photos and details to come from the owner
  shareholders: { title: 'Shareholders', note: 'Owners of the company' },
  lead: { title: 'Director General', photo: photo('director-general') },
  directors: [
    { title: 'Secretary General', photo: photo('secretary-general') },
    { title: 'Loaning Director', photo: photo('loaning-director') },
    { title: 'Loaning Director', photo: photo('loaning-director-2') },
    { title: 'Welfare Director', photo: photo('welfare-director') },
  ],
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

export const values = [
  { title: 'Honest & Transparent', text: 'Every shilling we collect is accounted for in your monthly statement.' },
  { title: 'Responsive', text: 'Tenant issues are handled quickly and reported back to you.' },
  { title: 'Results-Driven', text: 'Fewer empty units, fair rent and on-time payments.' },
  { title: 'Local Expertise', text: 'Four offices and teams who know each neighbourhood.' },
]

export const faqs = [
  { q: 'How much do you charge to manage my property?', a: 'Our fee is a small percentage of the rent we collect, agreed with you upfront. Call or WhatsApp us for a quote on your building.' },
  { q: 'How and when do I receive my rent?', a: 'We remit rent to your bank or M-Pesa account every month and send a statement showing all income and expenses.' },
  { q: 'Do you vet tenants?', a: 'Yes. We check identity, employment or income and previous landlord references before any tenant moves in.' },
  { q: 'Can I get a loan against my rental income?', a: 'Landlords whose properties we manage can apply for a loan that is repaid directly from rent we collect. Call or WhatsApp us to find out how much you could borrow.' },
  { q: 'Which areas do you cover?', a: 'We have offices in Eldoret, Nairobi, Nakuru and Kitale and manage property in and around these towns.' },
  { q: 'I’m a tenant. How do I report a problem?', a: 'Call our hotline or send us a WhatsApp message. We log every complaint, fix it, and report it to your landlord.' },
]
