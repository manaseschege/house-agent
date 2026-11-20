// RIRI house logo mark (vector redraw of the company's printed logo)
export const BRAND = { maroon: '#6b1d2b', orange: '#e8772e', blue: '#1f3fa6' }

export default function BrandMark({ className = 'h-8 w-8' }) {
  const { maroon, orange } = BRAND
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <polygon points="3,40 13,23 21,36" fill={maroon} />
      <polygon points="26,11 41,11 61,41 39,41" fill={maroon} />
      <g fill={maroon}>
        <rect x="20" y="30" width="3.6" height="3.6" /><rect x="24.6" y="30" width="3.6" height="3.6" />
        <rect x="20" y="34.6" width="3.6" height="3.6" /><rect x="24.6" y="34.6" width="3.6" height="3.6" />
      </g>
      <path d="M7 43 26 12" stroke={orange} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M1 49 C18 39 38 51 63 37 C46 52 22 47 1 54 Z" fill={orange} />
      <path d="M3 56 C22 50 42 58 63 43 C48 61 24 57 3 59 Z" fill={maroon} />
    </svg>
  )
}
