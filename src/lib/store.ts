import { promises as fs } from 'fs'
import path from 'path'

export type GraniteItem = {
  id: string
  name: string
  slug: string
  description: string
  category: 'premium' | 'standard' | 'budget'
  availability: 'in-stock' | 'limited' | 'out-of-stock'
  features: string[]
  applications: string[]
  finishes?: string[]
  specifications: {
    origin: string
    hardness: string
    finish: string
    thickness: string
  }
  images: { url: string; public_id?: string }[]
  featured?: boolean
  displayRank?: number
  price?: string
  pattern?: string
}

const dataFile = path.join(process.cwd(), 'src', 'data', 'granite.json')

async function ensureFile() {
  try {
    await fs.access(dataFile)
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true })
    await fs.writeFile(dataFile, '[]', 'utf8')
  }
}

export async function readAll(): Promise<GraniteItem[]> {
  await ensureFile()
  const raw = await fs.readFile(dataFile, 'utf8')
  try {
    return JSON.parse(raw) as GraniteItem[]
  } catch {
    return []
  }
}

export async function writeAll(items: GraniteItem[]) {
  await ensureFile()
  const body = JSON.stringify(items, null, 2)
  await fs.writeFile(dataFile, body, 'utf8')
}

export function slugify(input: string) {
  return input.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}