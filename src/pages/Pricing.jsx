import { Link } from 'react-router-dom'

function Plan({ name, audience, features }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col">
      <div>
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-slate-400 text-sm">{audience}</p>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-400" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link to="/contact" className="inline-flex items-center rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold">Request Quote</Link>
      </div>
    </div>
  )
}

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      audience: 'For small institutions and pilot teams',
      features: ['Up to 25 circulars / month', 'AI summaries & memos', 'Multi-department support', 'Basic history & export']
    },
    {
      name: 'Professional',
      audience: 'For mid-size compliance teams',
      features: ['Up to 100 circulars / month', 'Advanced summaries', 'Department configuration', 'Full history & export']
    },
    {
      name: 'Enterprise',
      audience: 'For large and regulated organizations',
      features: ['Custom volume', 'SAML/SSO & RBAC', 'Custom integrations', 'Dedicated support']
    }
  ]
  return (
    <div className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold">Pricing</h1>
        <p className="text-slate-300 mt-2">Informational pricing. Contact us for a tailored quote.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <Plan key={p.name} {...p} />
          ))}
        </div>
      </div>
    </div>
  )
}
