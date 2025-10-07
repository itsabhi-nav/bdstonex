'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { extractPublicId } from '@/lib/cloudinary'
import type { GraniteItem } from '@/lib/store'

type AdminGranite = GraniteItem & { isEditing?: boolean }
type CategoryType = 'premium' | 'standard' | 'budget'
type AvailabilityType = 'in-stock' | 'limited' | 'out-of-stock'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [items, setItems] = useState<AdminGranite[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [editingItem, setEditingItem] = useState<AdminGranite | null>(null)

  const primaryFileRef = useRef<HTMLInputElement>(null)
  const primaryEditFileRef = useRef<HTMLInputElement>(null)
  const multiFileRef = useRef<HTMLInputElement>(null)
  const multiEditFileRef = useRef<HTMLInputElement>(null)

  const emptyNew: Partial<GraniteItem> = {
    name: '',
    slug: '',
    description: '',
    category: 'premium',
    availability: 'in-stock',
    features: [],
    applications: [],
    finishes: [],
    specifications: { origin: '', hardness: '', finish: '', thickness: '' },
    images: [],
    featured: false,
    displayRank: 0
  }
  const [newItem, setNewItem] = useState<Partial<GraniteItem>>(emptyNew)

  const handleLogin = async () => {
    if (!password.trim()) {
      setLoginError('Please enter a password')
      return
    }
    setLoginLoading(true)
    setLoginError('')
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password })
      })
      if (response.ok) {
        setIsAuthenticated(true)
        setPassword('')
      } else {
        const data = await response.json().catch(() => ({}))
        setLoginError(data.error || 'Login failed')
      }
    } catch {
      setLoginError('Network error')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }) } catch {}
    setIsAuthenticated(false)
    setPassword('')
    setLoginError('')
  }

  const loadItems = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/marbles', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setItems(data.marbles || [])
      } else {
        setItems([])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadItems() }, [])

  const uploadToCloudinary = async (file: File): Promise<{ secure_url: string; public_id: string }> => {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/cloudinary/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      return { secure_url: data.secure_url, public_id: data.public_id }
    } finally {
      setUploading(false)
    }
  }

  const uploadMultipleToCloudinary = async (files: File[]): Promise<{ secure_url: string; public_id: string }[]> => {
    setUploading(true)
    try {
      const fd = new FormData()
      files.forEach(f => fd.append('files', f))
      const res = await fetch('/api/cloudinary/upload-multiple', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      return data.images as { secure_url: string; public_id: string }[]
    } finally {
      setUploading(false)
    }
  }

  const deleteFromCloudinary = async (imageUrl: string) => {
    const publicId = extractPublicId(imageUrl)
    if (!publicId) return
    try {
      await fetch('/api/cloudinary/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId })
      })
    } catch {}
  }

  const handleAdd = async () => {
    if (!newItem.name || !newItem.description) {
      alert('Please provide name and description')
      return
    }
    const res = await fetch('/api/marbles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ...newItem,
        images: newItem.images || []
      })
    })
    if (res.ok) {
      const data = await res.json()
      setItems(prev => [...prev, data.marble])
      setNewItem(emptyNew)
      setShowAddForm(false)
    } else {
      const data = await res.json().catch(() => ({}))
      alert(data.error || 'Failed to add item')
    }
  }

  const handleSaveEdit = async () => {
    if (!editingItem) return
    const res = await fetch('/api/marbles', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(editingItem)
    })
    if (res.ok) {
      const data = await res.json()
      setItems(prev => prev.map(it => it.id === data.marble.id ? data.marble : it))
      setEditingItem(null)
    } else {
      alert('Failed to update item')
    }
  }

  const handleDelete = async (item: AdminGranite) => {
    if (!confirm(`Delete "${item.name}"?`)) return
    if (item.images && item.images.length > 0) {
      for (const img of item.images) {
        if (img.url.includes('cloudinary.com')) await deleteFromCloudinary(img.url)
      }
    }
    const res = await fetch('/api/marbles', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id: item.id })
    })
    if (res.ok) {
      setItems(prev => prev.filter(x => x.id !== item.id))
    } else {
      alert('Failed to delete')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Stone Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-primary-300 to-accent-400 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-10 left-10 w-48 h-48 opacity-10">
          <div className="w-full h-full bg-gradient-to-tr from-accent-400 to-primary-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-neutral-200 p-6 md:p-8 space-y-6">
            {/* Logo */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden mr-3 md:mr-4">
                <img 
                  src="/logo.jpeg" 
                  alt="BD Stonex Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h1 
                  className="font-bold text-neutral-900 leading-tight"
                  style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)'
                  }}
                >
                  BD Stonex
                </h1>
                <span 
                  className="text-accent-600 font-medium leading-tight"
                  style={{
                    fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)'
                  }}
                >
                  Admin Panel
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !loginLoading && handleLogin()}
                className="w-full px-4 py-3 rounded-lg bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-500 focus:border-accent-500 focus:outline-none transition-colors"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              />
              {loginError && (
                <div 
                  className="text-red-500 text-sm"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                  }}
                >
                  {loginError}
                </div>
              )}
              <button
                onClick={handleLogin}
                disabled={loginLoading}
                className="w-full px-4 py-3 rounded-lg bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              >
                {loginLoading ? 'Logging in…' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50 px-4 py-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Stone Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-primary-300 to-accent-400 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute bottom-10 left-10 w-48 h-48 opacity-10">
        <div className="w-full h-full bg-gradient-to-tr from-accent-400 to-primary-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-200 p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden mr-3 md:mr-4">
                <img 
                  src="/logo.jpeg" 
                  alt="BD Stonex Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 
                  className="font-bold text-neutral-900"
                  style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)'
                  }}
                >
                  Granite Admin
                </h1>
                <p 
                  className="text-accent-600 font-medium"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                  }}
                >
                  Manage Your Stone Collection
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setShowAddForm(true)} 
                className="px-6 py-3 rounded-lg bg-neutral-800 hover:bg-neutral-900 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-700"
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                }}
              >
                ➕ Add New Item
              </button>
              <button 
                onClick={handleLogout} 
                className="px-4 py-3 rounded-lg border-2 border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white transition-all duration-300 font-semibold"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div 
                className="text-neutral-600"
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
                }}
              >
                Loading…
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th 
                        className="px-4 py-3 text-left font-semibold text-neutral-900"
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                      >Image</th>
                      <th 
                        className="px-4 py-3 text-left font-semibold text-neutral-900"
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                      >Name</th>
                      <th 
                        className="px-4 py-3 text-left font-semibold text-neutral-900"
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                      >Origin</th>
                      <th 
                        className="px-4 py-3 text-left font-semibold text-neutral-900"
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                      >Category</th>
                      <th 
                        className="px-4 py-3 text-left font-semibold text-neutral-900"
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                      >Availability</th>
                      <th 
                        className="px-4 py-3 text-left font-semibold text-neutral-900"
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                      >Featured</th>
                      <th 
                        className="px-4 py-3 text-left font-semibold text-neutral-900"
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                      >Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {items.map(item => (
                      <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                            {item.images?.[0]?.url ? (
                              <Image src={item.images[0].url} alt={item.name} fill className="object-cover" />
                            ) : (
                              <div className="w-12 h-12 bg-neutral-200 rounded-lg flex items-center justify-center">
                                <span className="text-neutral-400 text-xs">No Image</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div 
                            className="font-semibold text-neutral-900"
                            style={{
                              fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                            }}
                          >{item.name}</div>
                        </td>
                        <td 
                          className="px-4 py-3 text-neutral-600"
                          style={{
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                          }}
                        >{item.specifications.origin}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                            item.category === 'premium' ? 'bg-accent-100 text-accent-800' : 
                            item.category === 'standard' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-neutral-200 text-neutral-800'
                          }`}>
                            {item.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                            item.availability === 'in-stock' ? 'bg-green-100 text-green-800' : 
                            item.availability === 'limited' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {item.availability.replace('-', ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={async () => {
                              const updated = { ...item, featured: !item.featured }
                              const res = await fetch('/api/marbles', {
                                method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(updated)
                              })
                              if (res.ok) {
                                const data = await res.json()
                                setItems(prev => prev.map(x => x.id === data.marble.id ? data.marble : x))
                              }
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              item.featured ? 'bg-emerald-600 text-white border border-emerald-700' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 border border-neutral-300'
                            }`}
                          >
                            {item.featured ? 'Featured' : 'Make Featured'}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setEditingItem(item)} 
                              className="px-3 py-1 rounded-lg border border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white transition-all text-xs font-medium"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(item)} 
                              className="px-3 py-1 rounded-lg border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-all text-xs font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden">
                {items.map(item => (
                  <div key={item.id} className="p-4 border-b border-neutral-200 last:border-b-0">
                    <div className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        {item.images?.[0]?.url ? (
                          <Image src={item.images[0].url} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-16 h-16 bg-neutral-200 rounded-lg flex items-center justify-center">
                            <span className="text-neutral-400 text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 
                          className="font-semibold text-neutral-900 truncate"
                          style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                          }}
                        >{item.name}</h3>
                        <p 
                          className="text-neutral-500 truncate"
                          style={{
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                          }}
                        >{item.specifications.origin}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                            item.category === 'premium' ? 'bg-accent-100 text-accent-800' : 
                            item.category === 'standard' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-neutral-200 text-neutral-800'
                          }`}>
                            {item.category}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                            item.availability === 'in-stock' ? 'bg-green-100 text-green-800' : 
                            item.availability === 'limited' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {item.availability.replace('-', ' ')}
                          </span>
                          {item.featured && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-600 text-white border border-emerald-700">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button 
                            onClick={() => setEditingItem(item)} 
                            className="px-3 py-1 rounded-lg border border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white transition-all text-xs font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(item)} 
                            className="px-3 py-1 rounded-lg border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-all text-xs font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-md border border-neutral-200 rounded-2xl p-6 md:p-8 w-full max-w-3xl shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 
                className="font-bold text-neutral-900"
                style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)' }}
              >Add New Granite</h2>
              <button onClick={() => setShowAddForm(false)} className="text-neutral-500 hover:text-neutral-800">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-600 mb-1">Name</label>
                <input value={newItem.name || ''} onChange={e => setNewItem({ ...newItem, name: e.target.value })} className="w-full px-3 py-2 bg-white border border-neutral-300 rounded focus:border-accent-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-neutral-600 mb-1">Origin</label>
                <input value={newItem.specifications?.origin || ''} onChange={e => setNewItem({ ...newItem, specifications: { ...(newItem.specifications || { origin: '', hardness: '', finish: '', thickness: '' }), origin: e.target.value } })} className="w-full px-3 py-2 bg-white border border-neutral-300 rounded focus:border-accent-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-neutral-600 mb-1">Category</label>
                <select value={newItem.category || 'premium'} onChange={e => setNewItem({ ...newItem, category: e.target.value as CategoryType })} className="w-full px-3 py-2 bg-white border border-neutral-300 rounded focus:border-accent-500 outline-none">
                  <option value="premium">Premium</option>
                  <option value="standard">Standard</option>
                  <option value="budget">Budget</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-neutral-600 mb-1">Availability</label>
                <select value={newItem.availability || 'in-stock'} onChange={e => setNewItem({ ...newItem, availability: e.target.value as AvailabilityType })} className="w-full px-3 py-2 bg-white border border-neutral-300 rounded focus:border-accent-500 outline-none">
                  <option value="in-stock">In Stock</option>
                  <option value="limited">Limited</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-600 mb-1">Description</label>
                <textarea value={newItem.description || ''} onChange={e => setNewItem({ ...newItem, description: e.target.value })} className="w-full px-3 py-2 bg-white border border-neutral-300 rounded h-24 focus:border-accent-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm text-neutral-600 mb-2">Primary Image</label>
                <input ref={primaryFileRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  try {
                    const uploaded = await uploadToCloudinary(file)
                    setNewItem({ ...newItem, images: [{ url: uploaded.secure_url, public_id: uploaded.public_id }, ...(newItem.images || [])] })
                  } catch { alert('Upload failed') }
                }} />
                <button onClick={() => primaryFileRef.current?.click()} className="px-3 py-2 rounded-lg border border-neutral-300 hover:border-accent-500 transition-colors">{uploading ? 'Uploading…' : 'Upload Primary'}</button>
                <div className="mt-2 flex gap-2">
                  {newItem.images && newItem.images[0]?.url ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image src={newItem.images[0].url} alt="primary" fill className="object-cover" />
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="block text-sm text-neutral-600 mb-2">Additional Images</label>
                <input ref={multiFileRef} type="file" multiple accept="image/*" className="hidden" onChange={async (e) => {
                  const files = Array.from(e.target.files || [])
                  if (files.length === 0) return
                  try {
                    const uploaded = await uploadMultipleToCloudinary(files)
                    const imageObjs = uploaded.map(u => ({ url: u.secure_url, public_id: u.public_id }))
                    setNewItem({ ...newItem, images: [ ...(newItem.images || []), ...imageObjs ] })
                  } catch { alert('Upload failed') }
                }} />
                <button onClick={() => multiFileRef.current?.click()} className="px-3 py-2 rounded-lg border border-neutral-300 hover:border-accent-500 transition-colors">{uploading ? 'Uploading…' : 'Upload Multiple'}</button>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {(newItem.images || []).slice(1).map((img, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden group">
                      <Image src={img.url} alt={`img-${i}`} fill className="object-cover" />
                      <button
                        onClick={async () => {
                          try {
                            if (img.public_id) await deleteFromCloudinary(img.url)
                            setNewItem({ 
                              ...newItem, 
                              images: (newItem.images || []).filter((_, index) => index !== i + 1) 
                            })
                          } catch { alert('Delete failed') }
                        }}
                        className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-lg border border-neutral-300 hover:border-neutral-500 transition-colors text-neutral-700">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-900 text-white font-bold transition-colors border border-neutral-700">Add</button>
            </div>
          </div>
        </div>
      )}

      {editingItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-md border border-neutral-200 rounded-2xl p-6 md:p-8 w-full max-w-3xl shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-neutral-900" style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)' }}>Edit Granite</h2>
              <button onClick={() => setEditingItem(null)} className="text-neutral-500 hover:text-neutral-800">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-600 mb-1">Name</label>
                <input value={editingItem.name} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} className="w-full px-3 py-2 bg-white border border-neutral-300 rounded focus:border-accent-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-neutral-600 mb-1">Origin</label>
                <input value={editingItem.specifications.origin} onChange={e => setEditingItem({ ...editingItem, specifications: { ...editingItem.specifications, origin: e.target.value } })} className="w-full px-3 py-2 bg-white border border-neutral-300 rounded focus:border-accent-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-neutral-600 mb-1">Category</label>
                <select value={editingItem.category} onChange={e => setEditingItem({ ...editingItem, category: e.target.value as CategoryType })} className="w-full px-3 py-2 bg-white border border-neutral-300 rounded focus:border-accent-500 outline-none">
                  <option value="premium">Premium</option>
                  <option value="standard">Standard</option>
                  <option value="budget">Budget</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-neutral-600 mb-1">Availability</label>
                <select value={editingItem.availability} onChange={e => setEditingItem({ ...editingItem, availability: e.target.value as AvailabilityType })} className="w-full px-3 py-2 bg-white border border-neutral-300 rounded focus:border-accent-500 outline-none">
                  <option value="in-stock">In Stock</option>
                  <option value="limited">Limited</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-600 mb-1">Description</label>
                <textarea value={editingItem.description} onChange={e => setEditingItem({ ...editingItem, description: e.target.value })} className="w-full px-3 py-2 bg-white border border-neutral-300 rounded h-24 focus:border-accent-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm text-neutral-600 mb-2">Primary Image</label>
                <input ref={primaryEditFileRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file || !editingItem) return
                  try {
                    const currentPrimary = editingItem.images?.[0]?.url
                    if (currentPrimary && currentPrimary.includes('cloudinary.com')) await deleteFromCloudinary(currentPrimary)
                    const uploaded = await uploadToCloudinary(file)
                    const rest = (editingItem.images || []).slice(1)
                    setEditingItem({ ...editingItem, images: [{ url: uploaded.secure_url, public_id: uploaded.public_id }, ...rest] })
                  } catch { alert('Upload failed') }
                }} />
                <button onClick={() => primaryEditFileRef.current?.click()} className="px-3 py-2 rounded-lg border border-neutral-300 hover:border-accent-500 transition-colors">{uploading ? 'Uploading…' : 'Replace Primary'}</button>
                <div className="mt-2 flex gap-2">
                  {editingItem.images && editingItem.images[0]?.url ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image src={editingItem.images[0].url} alt="primary" fill className="object-cover" />
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="block text-sm text-neutral-600 mb-2">Additional Images</label>
                <input ref={multiEditFileRef} type="file" multiple accept="image/*" className="hidden" onChange={async (e) => {
                  const files = Array.from(e.target.files || [])
                  if (files.length === 0 || !editingItem) return
                  try {
                    const uploaded = await uploadMultipleToCloudinary(files)
                    const imageObjs = uploaded.map(u => ({ url: u.secure_url, public_id: u.public_id }))
                    setEditingItem({ ...editingItem, images: [ ...(editingItem.images || []), ...imageObjs ] })
                  } catch { alert('Upload failed') }
                }} />
                <button onClick={() => multiEditFileRef.current?.click()} className="px-3 py-2 rounded-lg border border-neutral-300 hover:border-accent-500 transition-colors">{uploading ? 'Uploading…' : 'Add More'}</button>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {(editingItem.images || []).slice(1).map((img, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden group">
                      <Image src={img.url} alt={`img-${i}`} fill className="object-cover" />
                      <button
                        onClick={async () => {
                          try {
                            if (img.public_id) await deleteFromCloudinary(img.url)
                            setEditingItem({ 
                              ...editingItem, 
                              images: (editingItem.images || []).filter((_, index) => index !== i + 1) 
                            })
                          } catch { alert('Delete failed') }
                        }}
                        className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditingItem(null)} className="px-4 py-2 rounded-lg border border-neutral-300 hover:border-neutral-500 transition-colors text-neutral-700">Cancel</button>
              <button onClick={handleSaveEdit} className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-900 text-white font-bold transition-colors border border-neutral-700">Save</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </main>
  )
}
