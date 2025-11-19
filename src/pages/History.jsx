import { useEffect, useMemo, useState } from 'react'

function StatusBadge({ status }) {
  const colors = {
    pending: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    in_progress: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    compliant: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    non_compliant: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  }
  const cls = colors[status] || 'bg-slate-500/15 text-slate-300 border-slate-500/30'
  return <span className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full border ${cls}`}>{status.replace('_',' ')}</span>
}

export default function History(){
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [detail, setDetail] = useState(null)
  const [saving, setSaving] = useState(false)

  const fetchList = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`${backend}/history`)
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (e) {
      setError('Failed to load history.')
    } finally {
      setLoading(false)
    }
  }

  const fetchDetail = async (id) => {
    if (!id) return
    try {
      setError('')
      const res = await fetch(`${backend}/history/${id}`)
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setDetail(data)
    } catch (e) {
      setError('Failed to load detail.')
    }
  }

  useEffect(() => { fetchList() }, [])
  useEffect(() => { if (selectedId) fetchDetail(selectedId); }, [selectedId])

  const onUpdateAssignment = async (assignment, patch) => {
    try {
      setSaving(true)
      const res = await fetch(`${backend}/assignments/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          circular_id: detail.id,
          department: assignment.department,
          ...patch,
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      await fetchDetail(detail.id)
    } catch (e) {
      setError('Failed to save update.')
    } finally {
      setSaving(false)
    }
  }

  const statuses = useMemo(() => ([
    'pending', 'in_progress', 'compliant', 'non_compliant'
  ]), [])

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Analysis History</h1>
          <div className="text-xs text-slate-400">Backend: <span className="font-mono">{backend}</span></div>
        </div>

        {error && <div className="mt-3 border border-rose-800 bg-rose-900/30 text-rose-200 rounded-lg p-3 text-sm">{error}</div>}

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1 bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <div className="font-semibold">Saved Circulars</div>
              <button onClick={fetchList} className="text-xs text-slate-300 hover:text-white">Refresh</button>
            </div>
            <div className="max-h-[70vh] overflow-auto divide-y divide-slate-800">
              {loading && <div className="p-4 text-slate-400 text-sm">Loading…</div>}
              {!loading && items.length === 0 && (
                <div className="p-4 text-slate-400 text-sm">No entries yet. Run an analysis to save into the register.</div>
              )}
              {items.map((it) => (
                <button
                  key={it.id}
                  onClick={() => setSelectedId(it.id)}
                  className={`w-full text-left px-4 py-3 hover:bg-slate-800/60 ${selectedId===it.id ? 'bg-slate-800/60' : ''}`}
                >
                  <div className="font-medium line-clamp-2 pr-2">{it.title}</div>
                  <div className="mt-1 text-xs text-slate-400 flex items-center gap-2">
                    <span>{new Date(it.created_at).toLocaleString()}</span>
                    <span>•</span>
                    <span>{(it.departments || []).length} dept(s)</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {!selectedId && (
              <div className="h-full min-h-[40vh] flex items-center justify-center text-slate-400">
                Select a circular on the left to view details.
              </div>
            )}

            {selectedId && !detail && (
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl text-slate-400">Loading detail…</div>
            )}

            {detail && (
              <div className="space-y-6">
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                  <div className="text-sm text-slate-400">Title</div>
                  <div className="text-xl font-bold">{detail.title}</div>
                  <div className="mt-1 text-sm text-slate-400">
                    {detail.regulator && <span className="mr-3">Regulator: {detail.regulator}</span>}
                    {detail.reference && <span className="mr-3">Ref: {detail.reference}</span>}
                    {detail.date && <span className="mr-3">Date: {detail.date}</span>}
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Department Tracking</div>
                    {saving && <div className="text-xs text-slate-400">Saving…</div>}
                  </div>
                  <div className="mt-3 divide-y divide-slate-800 rounded-lg border border-slate-800 overflow-hidden">
                    {(detail.assignments || []).map((a) => (
                      <div key={a.id} className="px-3 py-3 bg-slate-950/40 flex flex-col md:flex-row md:items-center gap-3">
                        <div className="flex-1">
                          <div className="font-medium">{a.department}</div>
                          <div className="text-xs text-slate-400 mt-0.5">Binding and compliance status</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={!!a.is_binding}
                              onChange={(e)=> onUpdateAssignment(a, { is_binding: e.target.checked })}
                            />
                            <span>Binding</span>
                          </label>
                          <select
                            value={a.status}
                            onChange={(e)=> onUpdateAssignment(a, { status: e.target.value })}
                            className="bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-sm"
                          >
                            {statuses.map(s => <option key={s} value={s}>{s.replace('_',' ')}</option>)}
                          </select>
                          <StatusBadge status={a.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                    <div className="text-sm font-semibold mb-2">Briefing Summary</div>
                    <ul className="list-disc list-inside space-y-1 text-slate-200 text-sm">
                      {(detail.summary_bullets || []).map((b,i)=> <li key={i}>{b}</li>)}
                    </ul>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                    <div className="text-sm font-semibold mb-2">Internal Memo</div>
                    <pre className="whitespace-pre-wrap text-slate-200 text-sm">{detail.memo}</pre>
                  </div>
                </div>

                <details className="bg-slate-900/60 border border-slate-800 rounded-xl">
                  <summary className="px-5 py-3 cursor-pointer select-none">Original Text</summary>
                  <div className="px-5 pb-5 text-slate-200 text-sm whitespace-pre-wrap">{detail.raw_text}</div>
                </details>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
