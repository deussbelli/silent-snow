'use client'

import { useState } from 'react'
import { intents } from '@/lib/content'

type Errors = Partial<Record<'name' | 'email' | 'intent', string>>
type Status = 'idle' | 'sending' | 'done' | 'failed'

export default function PledgeForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [reference, setReference] = useState('')
  const [notice, setNotice] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    setStatus('sending')
    setErrors({})
    setNotice('')

    try {
      const response = await fetch('/api/pledges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const payload = await response.json()

      if (!response.ok) {
        setErrors(payload.errors ?? {})
        setNotice(payload.error ?? 'Something went wrong. Please try again.')
        setStatus('failed')
        return
      }

      setReference(payload.reference ?? '')
      setStatus('done')
      form.reset()
    } catch {
      setNotice('We could not reach the barn. Please check your connection and retry.')
      setStatus('failed')
    }
  }

  if (status === 'done') {
    return (
      <div className="glass rounded-3xl p-8 md:p-10 text-center">
        <p className="eyebrow">Received</p>
        <h3 className="font-display text-4xl md:text-5xl mt-4">Thank you — we have you.</h3>
        <p className="mt-4 text-pearl/62 leading-relaxed max-w-md mx-auto">
          A carer reads every message by hand, usually within two days. Your reference is{' '}
          <span className="text-gold font-medium tracking-widest">{reference}</span>.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 text-xs uppercase tracking-[0.28em] text-pearl/55 hover:text-gold transition-colors"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 md:p-9" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="eyebrow">Your name</span>
          <input name="name" className="field mt-2" placeholder="Marta Ellery" autoComplete="name" />
          {errors.name && <span className="mt-1.5 block text-xs text-blush">{errors.name}</span>}
        </label>

        <label className="block">
          <span className="eyebrow">Email</span>
          <input
            name="email"
            type="email"
            className="field mt-2"
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && <span className="mt-1.5 block text-xs text-blush">{errors.email}</span>}
        </label>

        <label className="block">
          <span className="eyebrow">Town or city</span>
          <input name="city" className="field mt-2" placeholder="Fern Hollow" autoComplete="address-level2" />
        </label>

        <label className="block">
          <span className="eyebrow">How you would help</span>
          <select name="intent" className="field mt-2" defaultValue="">
            <option value="" disabled>
              Choose one…
            </option>
            {intents.map((option) => (
              <option key={option.value} value={option.value} className="bg-ink-soft">
                {option.label}
              </option>
            ))}
          </select>
          {errors.intent && <span className="mt-1.5 block text-xs text-blush">{errors.intent}</span>}
        </label>
      </div>

      <label className="mt-4 block">
        <span className="eyebrow">Anything we should know</span>
        <textarea
          name="message"
          rows={4}
          className="field mt-2 resize-none"
          placeholder="Other pets, children at home, whether you have lived with a deaf animal before…"
        />
      </label>

      {/* Hidden from people, irresistible to bots. */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0 -z-10"
      />

      {notice && <p className="mt-4 text-sm text-blush">{notice}</p>}

      <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-bright to-gold px-8 py-3.5
                     text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-ink
                     transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-55 disabled:translate-y-0"
        >
          {status === 'sending' ? 'Sending…' : 'Send to the barn'}
        </button>
        <p className="text-xs text-pearl/45 leading-relaxed">
          We reply by hand. No mailing list, no sharing your details.
        </p>
      </div>
    </form>
  )
}
