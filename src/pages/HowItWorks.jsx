export default function HowItWorks() {
  const steps = [
    { title: 'Ingest Circular', desc: 'Upload PDF/DOCX or paste text into the tool.' },
    { title: 'AI Analysis', desc: 'The engine extracts title, regulator info, and core points.' },
    { title: 'Department Mapping', desc: 'Impacted departments are detected from your configured list.' },
    { title: 'Briefing & Internal Memo', desc: 'Receive an executive summary and an internal memo draft.' },
  ]
  return (
    <div className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold">How It Works</h1>
        <p className="text-slate-300 mt-2 max-w-2xl">A simple four-step flow designed for compliance teams.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <div className="text-sm uppercase tracking-wider text-slate-400">Step {i + 1}</div>
              <div className="mt-1 text-lg font-semibold">{s.title}</div>
              <p className="text-slate-400 text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
