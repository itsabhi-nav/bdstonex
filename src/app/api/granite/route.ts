import { NextResponse } from 'next/server'
import { isAuthed } from '@/lib/auth'
import { readAll, writeAll, slugify, GraniteItem } from '@/lib/store'

export async function GET() {
  const items = await readAll()
  return NextResponse.json({ items })
}

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = (await req.json()) as Partial<GraniteItem>
  if (!data.name || !data.description) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const all = await readAll()
  const item: GraniteItem = {
    id: Date.now().toString(),
    name: data.name!,
    slug: data.slug || slugify(data.name!),
    description: data.description!,
    category: data.category || 'premium',
    availability: data.availability || 'in-stock',
    features: data.features || [],
    applications: data.applications || [],
    finishes: data.finishes || [],
    specifications: data.specifications || { origin: '', hardness: '', finish: '', thickness: '' },
    images: data.images || [],
    featured: !!data.featured,
    displayRank: data.displayRank ?? 0
  }
  all.push(item)
  await writeAll(all)
  return NextResponse.json({ item })
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = (await req.json()) as GraniteItem
  const all = await readAll()
  const idx = all.findIndex(x => x.id === data.id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!data.slug) data.slug = slugify(data.name)
  all[idx] = data
  await writeAll(all)
  return NextResponse.json({ item: all[idx] })
}

export async function DELETE(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  const all = await readAll()
  const filtered = all.filter(x => x.id !== id)
  await writeAll(filtered)
  return NextResponse.json({ ok: true })
}