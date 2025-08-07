// app/api/profile-photo/route.ts

import { NextRequest, NextResponse } from 'next/server';

const cache = new Map<string, { data: Buffer; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing photo URL' }, { status: 400 });
  }

  // Check cache
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return new Response(cached.data, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status}`);
    }

    const buffer = Buffer.from(await res.arrayBuffer());

    // Cache the image
    cache.set(url, { data: buffer, timestamp: Date.now() });

    return new Response(buffer, {
      headers: {
        'Content-Type': res.headers.get('content-type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error: any) {
    console.error('Error proxying image:', error.message);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}
