import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const isAdminPath = url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/auth') || url.pathname.startsWith('/api/granite') || url.pathname.startsWith('/api/cloudinary')
  if (!isAdminPath) return NextResponse.next()
  if (url.pathname.startsWith('/api/auth/login')) return NextResponse.next()
  const cookie = req.cookies.get('bd_admin')?.value
  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin' && !cookie) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }
  if ((url.pathname.startsWith('/api/granite') || url.pathname.startsWith('/api/cloudinary')) && !cookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*']
}