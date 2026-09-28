import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'
import { img } from '../config/site'

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80vh] place-items-center overflow-hidden bg-forest-950 px-4 pt-32 pb-20 text-center text-white">
      <img src={img('/media/images/1600566753190-17f0baa2a6c3.jpg', 1600)} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20" />
      <div>
        <p className="font-display text-8xl text-gold-400 sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">This door doesn’t lead anywhere</h1>
        <p className="mx-auto mt-3 max-w-md text-white/70">The page you’re looking for may have moved, or the property is no longer available.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-gold"><Home className="h-4 w-4" /> Back home</Link>
          <Link to="/properties" className="btn-ghost"><Search className="h-4 w-4" /> Find a property</Link>
        </div>
      </div>
    </section>
  )
}
