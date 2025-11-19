import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', role: '', country: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-slate-950 text-white">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <h1 className="text-3xl font-bold">Thanks! Well be in touch.</h1>
          <p className="text-slate-300 mt-2">Your request has been recorded. Well reach out to schedule a compliance demo.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold">Contact / Book a Demo</h1>
        <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-300">Name</label>
            <input name="name" value={form.name} onChange={onChange} required className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-300">Company</label>
            <input name="company" value={form.company} onChange={onChange} required className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-300">Role</label>
            <input name="role" value={form.role} onChange={onChange} className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-300">Country</label>
            <input name="country" value={form.country} onChange={onChange} className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300">Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange} required className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300">Message</label>
            <textarea name="message" value={form.message} onChange={onChange} rows={5} className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <button className="inline-flex items-center rounded-lg bg-teal-600 hover:bg-teal-500 px-5 py-3 text-sm font-semibold">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
