import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { publicId } = await request.json()
    if (!publicId) return NextResponse.json({ error: 'Public ID is required' }, { status: 400 })

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ success: true, message: 'Cloudinary not configured for deletion' })
    }

    const timestamp = Math.round(Date.now() / 1000)
    const signature = crypto
      .createHash('sha1')
      .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
      .digest('hex')

    const deleteResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_id: publicId, signature, api_key: apiKey, timestamp })
    })
    if (!deleteResponse.ok) {
      const errorText = await deleteResponse.text()
      return NextResponse.json({ error: 'Failed to delete image from Cloudinary', details: errorText }, { status: 400 })
    }
    const result = await deleteResponse.json()
    return NextResponse.json({ success: true, message: 'Image deleted successfully', result })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error during deletion', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}


