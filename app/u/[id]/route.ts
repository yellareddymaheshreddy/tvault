import { NextResponse } from "next/server"
import redis from "@/lib/redis"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  if (!id) {
    return new NextResponse("Missing id", { status: 400 })
  }

  const target = await redis.get(`url:${id}`)
  if (!target) {
    return new NextResponse("Not found", { status: 404 })
  }

  return NextResponse.redirect(target, { status: 302 })
}
