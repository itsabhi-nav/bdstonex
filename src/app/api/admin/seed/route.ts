import { NextResponse } from 'next/server'
import { isAuthed } from '@/lib/auth'
import { writeAll, slugify, GraniteItem } from '@/lib/store'
import { graniteCollection } from '@/data/graniteData'

export async function POST() {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const items: GraniteItem[] = graniteCollection.map(src => ({
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
    images: (src.images || []).map(url => ({ url })),
    featured: false,
    displayRank: 0
  }))
  await writeAll(items)
  return NextResponse.json({ ok: true, count: items.length })
}


