import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const envs = {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME),
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET),
    CLOUDINARY_CLOUD_NAME: Boolean(process.env.CLOUDINARY_CLOUD_NAME),
    CLOUDINARY_UPLOAD_PRESET: Boolean(process.env.CLOUDINARY_UPLOAD_PRESET),
  }
  return NextResponse.json({ ok: true, envs })
}


