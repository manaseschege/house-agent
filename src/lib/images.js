// Lookups into the image manifest made by scripts/optimize-images.mjs
import manifest from '../generated/images.json'

export { manifest }

export const toSrcSet = (m) => m.srcset.map((s) => `${s.src} ${s.width}w`).join(', ')

// Largest WebP version of a photo (for video posters and the like); falls back to the original.
export const optimized = (src) => manifest[src]?.srcset.at(-1).src ?? src

// Slides for the full-screen photo viewer, with every size available.
export const lightboxSlide = (src, alt) => {
  const m = manifest[src]
  if (!m) return { src, alt }
  return { src, alt, width: m.width, height: m.height, srcSet: m.srcset.map((s) => ({ src: s.src, width: s.width, height: Math.round((m.height * s.width) / m.width) })) }
}
