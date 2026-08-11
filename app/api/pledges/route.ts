import { NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { deliverPledge } from '@/lib/mailer'

export const runtime = 'nodejs'

const STORE = path.join(process.cwd(), 'data', 'pledges.json')
const INTENTS = new Set(['adopt', 'foster', 'sponsor', 'volunteer'])
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Small in-memory throttle so a single client cannot flood the barn inbox. */
const recent = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

function throttled(key: string) {
  const now = Date.now()
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  hits.push(now)
  recent.set(key, hits)
  return hits.length > MAX_PER_WINDOW
}

function clean(value: unknown, max: number) {
  if (typeof value !== 'string') return ''
  return value.replace(/\s+/g, ' ').trim().slice(0, max)
}

export type Pledge = {
  id: string
  name: string
  email: string
  city: string
  intent: string
  message: string
  receivedAt: string
}

async function append(pledge: Pledge) {
  await fs.mkdir(path.dirname(STORE), { recursive: true })
  let existing: Pledge[] = []
  try {
    existing = JSON.parse(await fs.readFile(STORE, 'utf8'))
    if (!Array.isArray(existing)) existing = []
  } catch {
    existing = []
  }
  existing.unshift(pledge)
  await fs.writeFile(STORE, JSON.stringify(existing.slice(0, 500), null, 2), 'utf8')
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (throttled(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many messages in a short time. Please try again in a minute.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request.' }, { status: 400 })
  }

  const raw = body as Record<string, unknown>
  const name = clean(raw.name, 80)
  const email = clean(raw.email, 160).toLowerCase()
  const city = clean(raw.city, 80)
  const intent = clean(raw.intent, 20)
  const message = clean(raw.message, 1200)

  // Honeypot: a real person never fills a field they cannot see.
  if (clean(raw.website, 40)) {
    return NextResponse.json({ ok: true, reference: 'accepted' })
  }

  const errors: Record<string, string> = {}
  if (name.length < 2) errors.name = 'Please tell us your name.'
  if (!EMAIL.test(email)) errors.email = 'That email address does not look right.'
  if (!INTENTS.has(intent)) errors.intent = 'Choose how you would like to help.'

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 })
  }

  const pledge: Pledge = {
    id: randomUUID(),
    name,
    email,
    city,
    intent,
    message,
    receivedAt: new Date().toISOString(),
  }

  await append(pledge)
  const delivery = await deliverPledge(pledge)

  return NextResponse.json({
    ok: true,
    reference: pledge.id.slice(0, 8).toUpperCase(),
    delivered: delivery.delivered,
  })
}
