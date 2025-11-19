import { useState, useRef, useCallback } from 'react'
import Spline from '@splinetool/react-spline'

function Tag({ label }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-200 border border-blue-400/30">
      {label}
    </span>
  )
}

function App() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [fileName, setFileName] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileRef = useRef(null)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const analyze = async () => {
    setError('')
    setResult(null)
    const trimmed = (text || '').trim()
    if (!trimmed) {
      setError('Paste text or drag & drop a PDF/DOCX to analyze.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${backend}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed }),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(`Request failed: ${res.status} ${res.statusText} - ${msg}`)
      }
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError(e.message || 'Failed to analyze. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const analyzeFile = async (file) => {
    if (!file) return
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch(`${backend}/analyze-file`, {
        method: 'POST',
        body: form,
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(`Upload failed: ${res.status} ${res.statusText} - ${msg}`)
      }
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError(e.message || 'Failed to analyze file. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (loading) return

    let file = null
    if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      const item = e.dataTransfer.items[0]
      if (item.kind === 'file') {
        file = item.getAsFile()
      }
      e.dataTransfer.items.clear()
    } else if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      file = e.dataTransfer.files[0]
    }

    if (!file) return

    const name = file.name.toLowerCase()
    const type = file.type
    const isPDF = type === 'application/pdf' || name.endsWith('.pdf')
    const isDOCX =
      type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      name.endsWith('.docx')

    if (!isPDF && !isDOCX) {
      setError('Please drop a PDF or DOCX file.')
      return
    }

    setFileName(file.name)
    analyzeFile(file)
  }, [loading])

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging) setIsDragging(true)
  }, [isDragging])

  const onDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero with Spline */}
      <div className="relative h-[360px] w-full overflow-hidden">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/40 to-slate-950"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Regulatory Circular AI Tester</h1>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              Drag & drop a PDF/DOCX or paste the circular text to get a concise title, impacted departments, briefing bullets, and a ready-to-send internal memo.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative mx-auto max-w-6xl px-4 pb-20 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div
            className={`bg-slate-900/80 border rounded-2xl p-5 md:p-6 shadow-xl transition-colors ${
              isDragging ? 'border-blue-500/60 bg-slate-900' : 'border-slate-800'
            }`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragEnter={onDragOver}
            onDragLeave={onDragLeave}
          >
            <h2 className="text-lg font-semibold mb-3">Input</h2>

            {/* Dropzone */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center transition-colors ${
                isDragging ? 'border-blue-500 bg-blue-500/5' : 'border-slate-800/80 bg-slate-950/40'
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) {
                    setFileName(f.name)
                    analyzeFile(f)
                  }
                }}
              />
              <div className="text-slate-300 font-medium">Drag & drop your PDF or DOCX here</div>
              <div className="text-xs text-slate-400 mt-1">It will be read automatically — no need to paste.</div>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={loading}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 font-semibold border border-slate-700"
              >
                Or choose a file
              </button>
              {fileName && <div className="mt-2 text-xs text-slate-400 truncate max-w-[260px]">Selected: {fileName}</div>}
            </div>

            {/* Manual text (optional) */}
            <label className="block text-sm text-slate-300 mt-5 mb-2">Or paste regulatory circular (plain text)</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the full circular text here... (optional)"
              className="w-full h-[240px] md:h-[300px] resize-y rounded-xl bg-slate-950/60 border border-slate-800/80 focus:border-blue-500/60 outline-none p-4 text-slate-100 placeholder-slate-500"
            />

            {/* Actions */}
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={analyze}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 font-semibold shadow-md shadow-blue-900/40 transition-colors"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Analyzing…
                  </>
                ) : (
                  <>Analyze Text</>
                )}
              </button>
              <div className="text-xs text-slate-400">Backend: <span className="font-mono">{backend}</span></div>
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-800 bg-red-900/30 text-red-200 p-3 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Results Panel */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-3">Results</h2>

            {!result && (
              <div className="text-slate-400 text-sm">
                Results will appear here after analysis. Drop a PDF/DOCX or paste text to begin.
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400">Short Title</div>
                  <div className="mt-1 text-xl font-bold">{result.title}</div>
                  <div className="mt-1 text-sm text-slate-400">
                    {(result.regulator || result.reference || result.date) && (
                      <>
                        {result.regulator && <span>Regulator: {result.regulator} </span>}
                        {result.reference && <span className="ml-2">Ref: {result.reference}</span>}
                        {result.date && <span className="ml-2">Date: {result.date}</span>}
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">Detected Departments</div>
                  <div className="flex flex-wrap gap-2">
                    {result.departments.map((d, idx) => (
                      <Tag key={idx} label={d} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">Briefing Summary</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-200">
                    {result.summary_bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">Internal Memo Draft</div>
                  <pre className="whitespace-pre-wrap bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-slate-100 font-sans text-sm leading-6">
                    {result.memo}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
