// Generates fast-loading versions of every property photo in public/media/properties:
//   • WebP copies in several widths, so each device downloads only the size it needs
//   • a tiny blurred preview shown instantly while the real photo loads
// Output file names include a hash of the source photo, so browsers and Vercel's CDN
// can cache them "forever" — replacing a photo produces a new name automatically.
//
// Runs before `npm run dev` and `npm run build`. Unchanged photos are skipped.

import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = join(ROOT, 'public')
const MEDIA = join(PUBLIC, 'media')
const OUT = join(MEDIA, 'optimized')
const MANIFEST = join(ROOT, 'src', 'generated', 'images.json')
const WIDTHS = [480, 800, 1200, 1600]

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    if (p === OUT) return []
    return statSync(p).isDirectory() ? walk(p) : /\.(jpe?g|png)$/i.test(name) ? [p] : []
  })

const previous = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {}
const manifest = {}
const keep = new Set()
let made = 0

for (const file of walk(join(MEDIA, 'properties'))) {
  const url = '/' + relative(PUBLIC, file).split(sep).join('/')
  const hash = createHash('sha1').update(readFileSync(file)).digest('hex').slice(0, 8)
  const base = relative(MEDIA, file).split(sep).join('/').replace(/\.[^.]+$/, '')
  const old = previous[url]

  if (old?.hash === hash && old.srcset.every((s) => existsSync(join(PUBLIC, s.src)))) {
    manifest[url] = old
  } else {
    const image = sharp(file).rotate()
    const { width, height } = await image.metadata()
    const widths = WIDTHS.filter((w) => w < width).concat(Math.min(width, WIDTHS.at(-1)))
    const srcset = []
    for (const w of [...new Set(widths)]) {
      const src = `/media/optimized/${base}-${hash}-${w}.webp`
      mkdirSync(dirname(join(PUBLIC, src)), { recursive: true })
      await sharp(file).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(join(PUBLIC, src))
      srcset.push({ src, width: w })
    }
    const blur = await sharp(file).rotate().resize(24).webp({ quality: 40 }).toBuffer()
    manifest[url] = { hash, width, height, srcset, blur: `data:image/webp;base64,${blur.toString('base64')}` }
    made++
  }
  manifest[url].srcset.forEach((s) => keep.add(join(PUBLIC, s.src)))
}

// Remove generated files whose source photo was deleted or replaced
if (existsSync(OUT)) {
  for (const name of readdirSync(OUT, { recursive: true })) {
    const f = join(OUT, name)
    if (f.endsWith('.webp') && !keep.has(f)) rmSync(f)
  }
}

mkdirSync(dirname(MANIFEST), { recursive: true })
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1))
console.log(`images: ${Object.keys(manifest).length} photos, ${made} newly optimized`)
