import { cookies } from 'next/headers'

const COOKIE_NAME = 'bd_admin'

export async function isAuthed() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(COOKIE_NAME)
  return cookie?.value === '1'
}

export async function setAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.set({
    name: COOKIE_NAME,
    value: '1',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 2
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.set({
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  })
}

export async function verifyPassword(pass: string) {
  const expected = (
    process.env.ADMIN_PASSWORD ?? process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? ''
  ).trim()
  const provided = (pass || '').trim()
  if (expected.length > 0) {
    return provided === expected
  }
  // Dev fallback: if no env configured, allow a default to unblock local admin
  if (process.env.NODE_ENV !== 'production') {
    const fallback = 'Rajasthan'
    return provided === fallback
  }
  return false
}