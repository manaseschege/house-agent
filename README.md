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
| Available properties (photos, prices, bedrooms) | `src/data/listings.js` |
| Services | `src/data/services.js` |
| Company structure, history, values, FAQs | `src/data/company.js` |
| Page title / social preview | `index.html` |
| Brand colours & fonts | `src/index.css` (`@theme`) |
| Photos & background videos | `public/media/images`, `public/media/videos` (all stored locally) |

To receive form submissions by email, create a free form at formspree.io and paste its URL into `formEndpoint` in `src/config/site.js`.

## Fast-loading photos

Property photos go in `public/media/properties/<town>/` as plain JPG or PNG (other site photos are served as-is). Before every `npm run dev` / `npm run build` (on Vercel too), `scripts/optimize-images.mjs` makes WebP copies in 4 sizes plus a blurred preview, saved in `public/media/optimized/` and `src/generated/images.json`. Commit those files too, so Vercel can skip photos that haven't changed. In code, show photos with `<Img src="/media/…jpg" sizes="…" />`.

Caching:
- `vercel.json` tells browsers and Vercel's CDN to keep the optimized photos for a year. Their file names change whenever a photo changes, so updates are never missed.
- `public/sw.js` stores photos on the visitor's device after the first visit, so returning visitors see them instantly.
