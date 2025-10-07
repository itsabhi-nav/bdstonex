import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || process.env.CLOUDINARY_UPLOAD_PRESET
    if (!cloudName || !uploadPreset) {
      return NextResponse.json({ error: 'Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET (or NEXT_PUBLIC_ equivalents).' }, { status: 500 })
    }

    const cloudinaryFormData = new FormData()
    cloudinaryFormData.append('file', file)
    cloudinaryFormData.append('upload_preset', uploadPreset)

    const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: cloudinaryFormData })
    if (!cloudinaryResponse.ok) {
      const errorText = await cloudinaryResponse.text()
      return NextResponse.json({ error: 'Failed to upload to Cloudinary', details: errorText }, { status: 400 })
    }
    const cloudinaryData = await cloudinaryResponse.json()
    return NextResponse.json({ secure_url: cloudinaryData.secure_url, public_id: cloudinaryData.public_id })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error during upload', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}