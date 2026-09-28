// Company structure, taken from the handwritten brief. Confirm the titles before launch.
export const orgChart = {
  top: [{ title: 'Shareholders', note: 'Owners of the company' }, { title: 'Director General', note: 'Overall leadership' }],
  directors: [
    { title: 'Secretary General', note: 'Governance & records' },
    { title: 'Deputy Director', note: 'Operations oversight', center: true },
    { title: 'Loans Director', note: 'Loans against rental income' },
    { title: 'Welfare Director', note: 'Staff & client welfare' },
  ],
  management: [
    { title: 'Accountant 001', note: 'Landlord accounts' },
    { title: 'Manager', note: 'Day-to-day operations', center: true },
    { title: 'Accountant 002', note: 'Rent collection & remittance' },
  ],
  field: [{ title: 'Property Managers', note: 'On the ground in every branch' }],
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
