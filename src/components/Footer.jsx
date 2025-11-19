import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800/60 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-teal-400" />
            <span className="text-white font-bold">RegCircular AI</span>
          </div>
          <p className="mt-3 text-sm text-slate-400 max-w-sm">
            This tool supports compliance teams by summarizing and routing regulatory circulars. It does not replace legal advice or human judgment.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/how-it-works" className="hover:text-white">How It Works</Link>
            <Link to="/solutions" className="hover:text-white">Solutions</Link>
            <Link to="/pricing" className="hover:text-white">Pricing</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </nav>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Trust & Security</h4>
          <p className="text-sm text-slate-400">
            We follow governance, risk, and compliance best practices. Your documents remain confidential; the AI is a support assistant and not legal advice.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-800/60 py-4 text-xs text-center text-slate-500">
        © {new Date().getFullYear()} RegCircular AI. All rights reserved.
      </div>
    </footer>
  )
}
