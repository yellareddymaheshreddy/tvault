import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function POST(request: NextRequest) {
  try {
    const { key, text } = await request.json();
    
    if (!key || !text) {
      return NextResponse.json({ error: 'Key and text are required' }, { status: 400 });
    }

    await redis.set(key, text, {
      EX: 60 * 60 * 24 // Expires in 1 day
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to save text' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const key = request.nextUrl.searchParams.get('key');
    
    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 });
    }

    const text = await redis.get(key);
    
    if (!text) {
      return NextResponse.json({ error: 'Text not found' }, { status: 404 });
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to retrieve text' }, { status: 500 });
  }
} 