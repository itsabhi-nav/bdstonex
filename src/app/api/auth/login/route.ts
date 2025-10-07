import { NextResponse } from 'next/server'
import { setAuthCookie, verifyPassword } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({}))
  if (!password) return NextResponse.json({ error: 'Missing password' }, { status: 400 })
  const ok = await verifyPassword(password)
  if (!ok) return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  await setAuthCookie()
  return NextResponse.json({ ok: true })
}