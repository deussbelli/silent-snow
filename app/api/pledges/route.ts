import { NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { deliverPledge } from '@/lib/mailer'

export const runtime = 'nodejs'

const STORE = path.join(process.cwd(), 'data', 'pledges.json')
const INTENTS = new Set(['adopt', 'foster', 'sponsor', 'volunteer'])
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

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
