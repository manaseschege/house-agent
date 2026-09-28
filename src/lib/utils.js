import { useEffect, useState } from 'react'
import { site } from '../config/site'

export const formatKES = (n) => 'KES ' + Math.round(n).toLocaleString('en-KE')

export const compactKES = (n) => {
  if (n >= 1_000_000) return `KES ${(n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0)}M`
  if (n >= 1_000) return `KES ${(n / 1_000).toFixed(0)}K`
  return formatKES(n)
}

export const waLink = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`

export const mapEmbed = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`
export const mapLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

// ── Opening hours, evaluated in Kenyan time ─────────────────────
// Fixed-date Kenyan public holidays plus 2026–2027 Easter dates.
const HOLIDAYS = ['01-01', '05-01', '06-01', '10-10', '10-20', '12-12', '12-25', '12-26']
const MOVABLE = ['2026-04-03', '2026-04-06', '2027-03-26', '2027-03-29']

function nairobiNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Nairobi', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', weekday: 'short', hour12: false,
  }).formatToParts(new Date())
  const get = (t) => parts.find((p) => p.type === t)?.value
  return {
    ymd: `${get('year')}-${get('month')}-${get('day')}`,
    md: `${get('month')}-${get('day')}`,
    day: get('weekday'),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

export function openStatus() {
  const { ymd, md, day, minutes } = nairobiNow()
  if (HOLIDAYS.includes(md) || MOVABLE.includes(ymd)) return { open: false, text: 'Closed today · public holiday' }
  if (day === 'Sun') return { open: false, text: 'Closed · opens Monday 8:00 AM' }
  const close = day === 'Sat' ? 13 * 60 : 17 * 60
  if (minutes < 8 * 60) return { open: false, text: 'Opens today at 8:00 AM' }
  if (minutes >= close) return { open: false, text: day === 'Sat' ? 'Closed · opens Monday 8:00 AM' : 'Closed · opens 8:00 AM' }
  return { open: true, text: `Open now · until ${day === 'Sat' ? '1:00 PM' : '5:00 PM'}` }
}

export function useOpenStatus() {
  const [s, setS] = useState(openStatus)
  useEffect(() => {
    const t = setInterval(() => setS(openStatus()), 60_000)
    return () => clearInterval(t)
  }, [])
  return s
}

// Sends a form to the configured endpoint, or falls back to WhatsApp.
export async function submitForm(subject, fields) {
  const lines = Object.entries(fields).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)
  if (site.formEndpoint) {
    const res = await fetch(site.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, ...fields }),
    })
    if (!res.ok) throw new Error('Could not send')
    return 'sent'
  }
  window.open(waLink(`*${subject}*\n${lines.join('\n')}`), '_blank', 'noopener')
  return 'whatsapp'
}
