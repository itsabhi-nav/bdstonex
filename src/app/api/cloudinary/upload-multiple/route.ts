import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    if (!files || files.length === 0) return NextResponse.json({ error: 'No files provided' }, { status: 400 })

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || process.env.CLOUDINARY_UPLOAD_PRESET
    if (!cloudName || !uploadPreset) {
      return NextResponse.json({ error: 'Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET (or NEXT_PUBLIC_ equivalents).' }, { status: 500 })
    }

    const uploadPromises = files.map(async (file) => {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('upload_preset', uploadPreset)
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: fd })
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Upload failed for ${file.name}: ${errorText}`)
      }
      return res.json()
    })

    const results = await Promise.all(uploadPromises)
    return NextResponse.json({ images: results.map(r => ({ secure_url: r.secure_url, public_id: r.public_id })) })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload images', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}


