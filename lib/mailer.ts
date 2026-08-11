import nodemailer from 'nodemailer'

type Pledge = {
  id: string
  name: string
  email: string
  city: string
  intent: string
  message: string
  receivedAt: string
}

const INTENT_LABELS: Record<string, string> = {
  adopt: 'Adopt a resident',
  foster: 'Foster for a season',
  sponsor: 'Sponsor care costs',
  volunteer: 'Volunteer at the barn',
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Sends the notification when SMTP credentials are present. Without them the
 * pledge is still stored and the visitor still gets a confirmation — the barn
 * simply reads the queue by hand. Credentials only ever come from the env.
 */
export async function deliverPledge(pledge: Pledge): Promise<{ delivered: boolean }> {
  const host = process.env.SMTP_HOST
  const to = process.env.PLEDGE_NOTIFY_TO

  if (!host || !to) {
    console.info(`[pledge] stored ${pledge.id} (mail transport not configured)`)
    return { delivered: false }
  }

  const transport = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS ?? '' }
      : undefined,
  })

  const intent = INTENT_LABELS[pledge.intent] ?? pledge.intent
  const rows: Array<[string, string]> = [
    ['Name', pledge.name],
    ['Email', pledge.email],
    ['City', pledge.city || '—'],
    ['Interest', intent],
    ['Received', new Date(pledge.receivedAt).toUTCString()],
  ]

  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM ?? `Silent Snow <no-reply@${host}>`,
      to,
      replyTo: pledge.email,
      subject: `Silent Snow — ${intent} — ${pledge.name}`,
      text: [
        ...rows.map(([k, v]) => `${k}: ${v}`),
        '',
        pledge.message || '(no message)',
      ].join('\n'),
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;color:#101728">
          <h2 style="font-weight:400;letter-spacing:-.01em">New pledge — ${escapeHtml(intent)}</h2>
          <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px">
            ${rows
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:6px 12px 6px 0;color:#6b7280">${k}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
              )
              .join('')}
          </table>
          <p style="white-space:pre-wrap;font-family:Arial,sans-serif;font-size:14px;line-height:1.6">${escapeHtml(pledge.message || '(no message)')}</p>
        </div>`,
    })
    return { delivered: true }
  } catch (error) {
    console.error('[pledge] delivery failed', error instanceof Error ? error.message : error)
    return { delivered: false }
  }
}
