import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function GET(_request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const {id}=await params;
    
    if (!id) {
      return new NextResponse('Key is required', { status: 400 ,headers:{'Content-Type':'text/plain'}});
    }

    const text = await redis.get(id);
    
    if (!text) {
      return new NextResponse('Text not found\n\n', { status: 404 ,headers:{'Content-Type':'text/plain'}});
    }

    return new NextResponse(`Key: ${id}\nText:\n${text}\n\n`, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
  } catch (error) {
    console.log(error)
    return new NextResponse('Failed to retrieve text\n\n', { status: 500 ,headers:{'Content-Type':'text/plain'}});
  }
} 

export async function POST(request: NextRequest) {
  try {
    const { key, text } = await request.json();

    if (!key || !text) {
      return NextResponse.json({ error: 'Key and text are required' }, { status: 400 });
    }

    await redis.set(key, text);

    return NextResponse.json({ message: `Text stored under key: ${key}` }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to store text' }, { status: 500 });
  }
}
