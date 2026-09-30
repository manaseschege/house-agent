import { manifest, toSrcSet } from '../lib/images'

// Fast photo: serves the WebP size that fits the screen, shows a blurred preview
// while it loads, and reserves its space so the page doesn't jump.
// `src` is the original photo path under public/ (e.g. /media/properties/nakuru/x.jpg).
// `sizes` tells the browser how wide the photo is shown, so it can pick the right file.
export default function Img({ src, alt = '', sizes = '100vw', priority = false, className = '', style, ...rest }) {
  const m = manifest[src]
  const common = {
    alt,
    loading: priority ? 'eager' : 'lazy',
    fetchPriority: priority ? 'high' : undefined,
    decoding: 'async',
    className,
    ...rest,
  }
  if (!m) return <img src={src} style={style} {...common} />
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={toSrcSet(m)} sizes={sizes} />
      <img
        src={src}
        width={m.width}
        height={m.height}
        style={{ backgroundImage: `url(${m.blur})`, backgroundSize: 'cover', backgroundPosition: 'center', ...style }}
        {...common}
      />
    </picture>
  )
}
