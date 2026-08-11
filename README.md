# Silent Snow

A landing site for a small sanctuary that rehomes white cats — most of them born
deaf, because the gene that whitens a coat also silences the inner ear.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Nodemailer

## What is in here

- One-page landing: the genetics, the care programme, the residents, a gallery.
- A pledge form (adopt / foster / sponsor / volunteer) posting to `/api/pledges`.
- Server-side validation, a honeypot field and a small per-IP rate limit.
- Submissions are appended to `data/pledges.json` and, when SMTP is configured,
  emailed on. Without SMTP the site still works — nothing is lost, the queue is
  just read by hand.

## Running it

```bash
npm install
cp .env.example .env.local   # then fill in the values you actually have
npm run dev                  # http://localhost:4310
```

## Configuration

Every secret comes from the environment. `.env.local` is git-ignored; only
`.env.example` is committed.

| Variable | Purpose |
| --- | --- |
| `PLEDGE_NOTIFY_TO` | Address that receives pledge notifications |
| `SMTP_HOST` | Mail host. Leave empty to run in log-only mode |
| `SMTP_PORT` | Defaults to `587` |
| `SMTP_SECURE` | `true` for implicit TLS (port 465) |
| `SMTP_USER` / `SMTP_PASS` | Credentials, if the host needs them |
| `SMTP_FROM` | Envelope sender |

## Photography

All photographs are CC0 / public-domain dedications sourced through Openverse.
See [CREDITS.md](CREDITS.md).
