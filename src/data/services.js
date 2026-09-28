import {
  Wallet, Scale, Building2, FileSpreadsheet, ClipboardCheck, MessageSquareWarning, HandCoins, Megaphone, KeyRound,
} from 'lucide-react'

const u = (id) => `/media/images/${id}.jpg`

export const services = [
  {
    id: 'vacant-houses',
    icon: KeyRound,
    title: 'Advertising Vacant Houses',
    short: 'We fill empty units fast with quality, vetted tenants.',
    image: u('1560518883-ce09059eeffa'),
    points: ['Professional photos & listings', 'Online and on-ground advertising', 'Tenant vetting & referencing', 'Viewings handled for you'],
  },
  {
    id: 'sales-marketing',
    icon: Megaphone,
    title: 'Property Sales & Marketing',
    short: 'Sell land, homes and buildings at the right price, to the right buyer.',
    image: u('1600585154340-be6161a56a0c'),
    points: ['Market positioning', 'Qualified buyer network', 'Negotiation support', 'Smooth handover'],
  },
  {
    id: 'rent-collection',
    icon: Wallet,
    title: 'Rent Collection',
    short: 'On-time rent, every month, without the awkward follow-ups.',
    image: u('1586023492125-27b2c045efd7'),
    points: ['M-Pesa & bank collection', 'Automatic reminders', 'Arrears follow-up', 'Receipts for every tenant'],
  },
  {
    id: 'market-rent',
    icon: Scale,
    title: 'Fair Market Rent Valuation',
    short: 'We set a fair rent so your units are neither empty nor underpriced.',
    image: u('1560520653-9e0e4c89eb11'),
    points: ['Area comparisons', 'Condition & amenities review', 'Yield guidance', 'Annual rent reviews'],
  },
  {
    id: 'property-management',
    icon: Building2,
    title: 'Property Management',
    short: 'Complete day-to-day care of your building, so you don’t have to.',
    image: u('1545324418-cc1a3fa10c00'),
    points: ['Caretakers & security', 'Repairs & maintenance', 'Service-charge management', 'Utility management'],
  },
  {
    id: 'landlord-accounts',
    icon: FileSpreadsheet,
    title: 'Monthly Landlord Accounts',
    short: 'A clear monthly statement for all income we receive on your behalf.',
    image: u('1497366216548-37526070297c'),
    points: ['Monthly income statements', 'Expense breakdowns', 'Remittance to your account', 'Year-end summaries'],
  },
  {
    id: 'inspections',
    icon: ClipboardCheck,
    title: 'Property Inspections',
    short: 'Regular inspections that protect the value of your investment.',
    image: u('1502672260266-1c1ef2d93688'),
    points: ['Move-in & move-out reports', 'Routine condition checks', 'Photo evidence', 'Maintenance recommendations'],
  },
  {
    id: 'tenant-complaints',
    icon: MessageSquareWarning,
    title: 'Tenant Complaints & Reporting',
    short: 'We handle tenant issues quickly and report every one back to you.',
    image: u('1560448204-e02f11c3d0e2'),
    points: ['One point of contact for tenants', 'Fast response times', 'Resolution tracking', 'Landlord reports'],
  },
  {
    id: 'rental-loans',
    icon: HandCoins,
    title: 'Loans Against Rental Income',
    short: 'Unlock cash for your next project, secured by your rental income.',
    image: u('1613490493576-7fde63acd811'),
    points: ['For landlords we manage', 'Repaid from rent collected', 'Quick approval', 'Flexible terms'],
  },
]
