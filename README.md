# Property agency website

Static React site (Vite + React 19 + Tailwind 4 + Framer Motion). There's no backend: forms send to WhatsApp, or to email if you add a Formspree endpoint.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static files in dist/
```

Deploy `dist/` to Netlify, Vercel, Cloudflare Pages or any static host. `public/_redirects` and `vercel.json` already send every route to `index.html`.

## Where to edit

| What | File |
|---|---|
| Company name, phones, email, WhatsApp, socials, hours, offices, videos | `src/config/site.js` |
| Property listings (photos, prices, features) | `src/data/properties.js` |
| Services | `src/data/services.js` |
| Company structure, history, values, FAQs | `src/data/company.js` |
| Page title / social preview | `index.html` |
| Brand colours & fonts | `src/index.css` (`@theme`) |
| Photos & background videos | `public/media/images`, `public/media/videos` (all stored locally) |

To receive form submissions by email, create a free form at formspree.io and paste its URL into `formEndpoint` in `src/config/site.js`.
