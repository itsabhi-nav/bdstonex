'use client'

import { useEffect, useState } from 'react'
import { GraniteItem } from '@/lib/store'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pwd, setPwd] = useState('')
  const [items, setItems] = useState<GraniteItem[]>([])
  const [editing, setEditing] = useState<GraniteItem | null>(null)
  const [creating, setCreating] = useState<Partial<GraniteItem>>({
    name: '', description: '', category: 'premium', availability: 'in-stock', features: [], applications: [], finishes: [], specifications: { origin: '', hardness: '', finish: '', thickness: '' }, images: []
  })
  // const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/granite')
      const { items } = await res.json()
      setItems(items || [])
      setLoading(false)
    }
    load()
  }, [])

  const login = async () => {
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pwd }) })
    if (res.ok) setAuthed(true)
  }
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setAuthed(false)
  }

  const create = async () => {
    const res = await fetch('/api/granite', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(creating) })
    if (res.ok) {
      const { item } = await res.json()
      setItems(prev => [...prev, item])
      setCreating({ name: '', description: '', category: 'premium', availability: 'in-stock', features: [], applications: [], finishes: [], specifications: { origin: '', hardness: '', finish: '', thickness: '' }, images: [] })
    }
  }

  const update = async () => {
    if (!editing) return
    const res = await fetch('/api/granite', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    if (res.ok) {
      const { item } = await res.json()
      setItems(prev => prev.map(i => i.id === item.id ? item : i))
      setEditing(null)
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Delete item?')) return
    const res = await fetch('/api/granite', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    if (res.ok) setItems(prev => prev.filter(i => i.id !== id))
  }

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>

  if (!authed) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="glass-enhanced rounded-2xl p-6 w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold gradient-text">Admin Login</h1>
          <input value={pwd} onChange={e => setPwd(e.target.value)} type="password" placeholder="Admin password" className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-emerald-500 outline-none" />
          <button onClick={login} className="w-full px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-black font-semibold transition">Login</button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold gradient-text">Granite Admin</h1>
        <button onClick={logout} className="px-4 py-2 rounded-full border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black transition">Logout</button>
      </div>

      <section className="glass-enhanced rounded-2xl p-4 mb-8">
        <h2 className="font-semibold mb-3">Create new item</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <input placeholder="Name" className="bg-gray-900 border border-gray-700 rounded px-3 py-2" value={creating.name as string} onChange={e => setCreating({ ...creating, name: e.target.value })} />
          <input placeholder="Origin" className="bg-gray-900 border border-gray-700 rounded px-3 py-2" value={creating.specifications?.origin} onChange={e => setCreating({ ...creating, specifications: { ...(creating.specifications || { origin: '', hardness: '', finish: '', thickness: '' }), origin: e.target.value } })} />
          <textarea placeholder="Description" className="bg-gray-900 border border-gray-700 rounded px-3 py-2 md:col-span-2" value={creating.description as string} onChange={e => setCreating({ ...creating, description: e.target.value })} />
        </div>
        <div className="mt-3">
          <button onClick={create} className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-black">Add</button>
        </div>
      </section>

      <section className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="glass-enhanced rounded-2xl p-4">
            {!editing || editing.id !== item.id ? (
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-400">{item.specifications?.origin}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(item)} className="px-3 py-1 rounded-full border border-emerald-500 text-emerald-400">Edit</button>
                  <button onClick={() => remove(item.id)} className="px-3 py-1 rounded-full border border-red-500 text-red-400">Delete</button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <input className="bg-gray-900 border border-gray-700 rounded px-3 py-2 w-full" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
                <input className="bg-gray-900 border border-gray-700 rounded px-3 py-2 w-full" value={editing.specifications?.origin || ''} onChange={e => setEditing({ ...editing, specifications: { ...(editing.specifications || { origin: '', hardness: '', finish: '', thickness: '' }), origin: e.target.value } })} />
                <textarea className="bg-gray-900 border border-gray-700 rounded px-3 py-2 w-full" value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} />
                <div className="flex gap-2">
                  <button onClick={update} className="px-3 py-1 rounded-full bg-emerald-600 text-black">Save</button>
                  <button onClick={() => setEditing(null)} className="px-3 py-1 rounded-full border border-gray-600">Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  )
}