// Keeps photos, fonts and site code on the visitor's device after the first visit,
// so returning visitors see images instantly. Pages themselves are always fetched
// fresh, so new deploys show up straight away.
const VERSION = 'v1'
const IMAGES = `images-${VERSION}`
const STATIC = `static-${VERSION}`
const MAX_IMAGES = 250

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => ![IMAGES, STATIC].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || request.headers.has('range')) return
  const url = new URL(request.url)

  // Hashed files never change: use the saved copy if there is one
  if (url.origin === location.origin && (url.pathname.startsWith('/media/optimized/') || url.pathname.startsWith('/assets/'))) {
    event.respondWith(cacheFirst(request, url.pathname.startsWith('/assets/') ? STATIC : IMAGES))
  } else if (url.origin === location.origin && /^\/media\/(images|properties|videos)\/.+\.(jpe?g|png|webp)$/i.test(url.pathname)) {
    // Original photos and posters may be replaced under the same name: show the saved copy, refresh it in the background
    event.respondWith(staleWhileRevalidate(request, IMAGES))
  } else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(request, STATIC))
  }
})

async function cacheFirst(request, name) {
  const cache = await caches.open(name)
  const hit = await cache.match(request)
  if (hit) return hit
  const res = await fetch(request)
  if (res.ok) { cache.put(request, res.clone()); if (name === IMAGES) trim(cache) }
  return res
}

async function staleWhileRevalidate(request, name) {
  const cache = await caches.open(name)
  const hit = await cache.match(request)
  const refresh = fetch(request)
    .then((res) => { if (res.ok) { cache.put(request, res.clone()); if (name === IMAGES) trim(cache) } return res })
    .catch(() => hit || Response.error())
  return hit || refresh
}

async function trim(cache) {
  const keys = await cache.keys()
  for (let i = 0; i < keys.length - MAX_IMAGES; i++) await cache.delete(keys[i])
}
