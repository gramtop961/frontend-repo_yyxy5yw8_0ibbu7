import { Link, NavLink } from 'react-router-dom'

const navLinkBase = 'text-slate-200 hover:text-white px-3 py-2 text-sm font-medium'
const activeClass = 'text-white'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-teal-400" />
            <span className="text-white font-bold">RegCircular AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={({isActive}) => `${navLinkBase} ${isActive?activeClass:''}`}>Home</NavLink>
            <NavLink to="/how-it-works" className={({isActive}) => `${navLinkBase} ${isActive?activeClass:''}`}>How It Works</NavLink>
            <NavLink to="/solutions" className={({isActive}) => `${navLinkBase} ${isActive?activeClass:''}`}>Solutions</NavLink>
            <NavLink to="/pricing" className={({isActive}) => `${navLinkBase} ${isActive?activeClass:''}`}>Pricing</NavLink>
            <NavLink to="/about" className={({isActive}) => `${navLinkBase} ${isActive?activeClass:''}`}>About</NavLink>
            <NavLink to="/contact" className={({isActive}) => `${navLinkBase} ${isActive?activeClass:''}`}>Contact</NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/demo" className="inline-flex items-center rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/40">Try AI Demo</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
