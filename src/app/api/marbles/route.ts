import { NextRequest, NextResponse } from 'next/server'
import { readAll, writeAll, GraniteItem, slugify } from '@/lib/store'
import { isAuthed } from '@/lib/auth'
import { graniteCollection } from '@/data/graniteData'

export async function GET() {
  let items = await readAll()
  if (!items || items.length === 0) {
    // Auto-import from static collection on first run
    const imported: GraniteItem[] = (graniteCollection || []).map((src) => ({
      id: String(src.id),
      name: src.name,
      slug: slugify(src.name),
      description: src.description,
      category: src.category,
      availability: src.availability,
      features: src.features,
      applications: src.applications,
      finishes: src.finishes || [],
      specifications: {
        origin: src.specifications.origin,
        hardness: src.specifications.hardness,
        finish: src.specifications.finish,
        thickness: src.specifications.thickness
      },
      images: (src.images || []).map((url) => ({ url })),
      featured: false,
      displayRank: 0
    }))
    if (imported.length > 0) {
      await writeAll(imported)
      items = imported
    }
  }
  return NextResponse.json({ marbles: items })
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const payload = (await req.json()) as Partial<GraniteItem>
  if (!payload.name || !payload.description || !payload.specifications) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const all = await readAll()
  const item: GraniteItem = {
    id: payload.id || Date.now().toString(),
    name: payload.name,
    slug: payload.slug || slugify(payload.name),
    description: payload.description,
    category: payload.category || 'premium',
    availability: payload.availability || 'in-stock',
    features: payload.features || [],
    applications: payload.applications || [],
    finishes: payload.finishes || [],
    specifications: payload.specifications,
    images: payload.images || [],
    featured: !!payload.featured,
    displayRank: payload.displayRank ?? 0
  }
  all.push(item)
  await writeAll(all)
  return NextResponse.json({ marble: item, message: 'Marble created successfully' })
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const payload = (await req.json()) as GraniteItem
  const all = await readAll()
  const idx = all.findIndex(x => x.id === payload.id)
  if (idx === -1) return NextResponse.json({ error: 'Marble not found' }, { status: 404 })
  // Enforce max 3 featured
  if (payload.featured) {
    const alreadyFeatured = all.filter(x => x.featured && x.id !== payload.id).length
    if (alreadyFeatured >= 3) {
      return NextResponse.json({ error: 'Maximum of 3 featured items allowed' }, { status: 400 })
    }
  }
  if (!payload.slug) payload.slug = slugify(payload.name)
  all[idx] = payload
  await writeAll(all)
  return NextResponse.json({ marble: all[idx], message: 'Marble updated successfully' })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'Marble ID is required' }, { status: 400 })
  const all = await readAll()
  const found = all.find(x => x.id === id)
  if (!found) return NextResponse.json({ error: 'Marble not found' }, { status: 404 })
  const updated = all.filter(x => x.id !== id)
  await writeAll(updated)
  return NextResponse.json({ message: 'Marble deleted successfully', deletedMarble: found })
}


