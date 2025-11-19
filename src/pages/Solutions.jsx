export default function Solutions() {
  const sectors = [
    {
      title: 'Banks & Financial Institutions',
      desc: 'Accelerate compliance reviews, route circulars to relevant risk, operations, and business teams, and keep an audit-ready trail.'
    },
    {
      title: 'Fintech / PSP / EMIs',
      desc: 'Handle frequent regulatory updates across payments and e-money with quick department mapping and concise summaries.'
    },
    {
      title: 'Insurance & Brokerage',
      desc: 'Clarify obligations for underwriting, claims, and distribution teams with tailored memos and briefings.'
    },
    {
      title: 'DNFBPs',
      desc: 'Support AML/CFT obligations for designated non-financial businesses and professions with structured, shareable outputs.'
    },
  ]
  return (
    <div className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold">Solutions</h1>
        <p className="text-slate-300 mt-2 max-w-2xl">RegCircular AI is designed for highly regulated teams that need clarity fast.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {sectors.map((s, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <div className="text-lg font-semibold">{s.title}</div>
              <p className="text-slate-400 text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
