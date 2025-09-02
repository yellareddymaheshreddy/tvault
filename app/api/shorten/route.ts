import { NextResponse } from "next/server"
import redis from "@/lib/redis"

const TTL_SECONDS = 60 * 60 * 24 // 24h
const CODE_LEN = 6
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789" // avoid ambiguous chars

function isValidUrl(url: string) {
  try {
    const u = new URL(url)
    return u.protocol === "http:" || u.protocol === "https:"
  } catch {
    return false
  }
}

function isValidKey(key: string) {
  return /^[A-Za-z0-9_-]{3,64}$/.test(key)
}

function genCode() {
  let out = ""
  for (let i = 0; i < CODE_LEN; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return out
}

export async function POST(req: Request) {
  try {
    const { url, key } = await req.json()

    if (!url || typeof url !== "string" || !isValidUrl(url)) {
      return NextResponse.json({ error: "Valid http(s) URL is required" }, { status: 400 })
    }

    let code = ""
    if (key) {
      if (!isValidKey(key)) {
        return NextResponse.json({ error: "Key must be 3-64 chars [A-Za-z0-9_-]" }, { status: 400 })
      }
      code = key
      const exists = await redis.get(`url:${code}`)
      if (exists) {
        return NextResponse.json({ error: "Key already in use" }, { status: 409 })
      }
    } else {
      // try generate unique code a few times
      for (let i = 0; i < 5; i++) {
        const candidate = genCode()
        const exists = await redis.get(`url:${candidate}`)
        if (!exists) {
          code = candidate
          break
        }
      }
      if (!code) {
        return NextResponse.json({ error: "Unable to generate code" }, { status: 500 })
      }
    }
    await redis.set(`url:${code}`, url, { EX: TTL_SECONDS })
    return NextResponse.json({ code })
  } catch {
    return NextResponse.json({ error: "Unable to shorten URL" }, { status: 500 })
  }
}
