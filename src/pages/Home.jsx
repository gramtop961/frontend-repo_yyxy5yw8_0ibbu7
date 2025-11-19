import { Link } from 'react-router-dom'

function Benefit({ title, desc }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
      <div className="h-10 w-10 rounded-md bg-gradient-to-br from-blue-500 to-teal-400 mb-3" />
      <h4 className="text-white font-semibold">{title}</h4>
      <p className="text-slate-400 text-sm mt-1">{desc}</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Turn Regulatory Circulars into Clear Actions in Minutes.
            </h1>
            <p className="mt-4 text-slate-300 max-w-xl">
              Upload or paste a circular. The AI detects impacted departments, creates executive summaries, and drafts ready-to-send internal memos.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/demo" className="inline-flex items-center rounded-lg bg-blue-600 hover:bg-blue-500 px-5 py-3 text-sm font-semibold shadow-md shadow-blue-900/40">Try AI Demo</Link>
              <Link to="/contact" className="inline-flex items-center rounded-lg bg-teal-600 hover:bg-teal-500 px-5 py-3 text-sm font-semibold shadow-md shadow-teal-900/40">Book a Compliance Demo</Link>
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <ol className="space-y-4">
              <li>
                <div className="text-sm uppercase tracking-wider text-slate-400">Step 1</div>
                <div className="text-lg font-semibold">Ingest Circular</div>
                <p className="text-slate-400 text-sm">Upload PDF/DOCX or paste the text.</p>
              </li>
              <li>
                <div className="text-sm uppercase tracking-wider text-slate-400">Step 2</div>
                <div className="text-lg font-semibold">AI Analysis</div>
                <p className="text-slate-400 text-sm">Title, summaries, impacted departments, and memo.</p>
              </li>
              <li>
                <div className="text-sm uppercase tracking-wider text-slate-400">Step 3</div>
                <div className="text-lg font-semibold">Share & Act</div>
                <p className="text-slate-400 text-sm">Circulate internally with an audit-friendly trail.</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Benefit title="Automatic Department Mapping" desc="Detects and routes to the right teams instantly." />
          <Benefit title="Executive Summaries" desc="Clear bullets anyone can act on." />
          <Benefit title="Ready-to-Send Memos" desc="Pre-drafted internal memos for quick circulation." />
          <Benefit title="Audit-Friendly Trail" desc="A history of analyses you can revisit." />
        </div>
      </section>
    </div>
  )
}
