import { useEffect, useState } from 'react'

export default function History(){
  // Placeholder shell for future Phase 4 integration
  const [items] = useState([])
  useEffect(()=>{},[])
  return (
    <div className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold">History</h1>
        {items.length === 0 && (
          <p className="text-slate-300 mt-2">Your past analyses will appear here.</p>
        )}
      </div>
    </div>
  )
}
