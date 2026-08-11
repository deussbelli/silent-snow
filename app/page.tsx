import PhotoBand from '@/components/PhotoBand'
import PledgeForm from '@/components/PledgeForm'
import { marquee, programme, residents, science, site, stats, voices } from '@/lib/content'

const NAV = [
  { label: 'The silence', href: '#silence' },
  { label: 'Residents', href: '#residents' },
  { label: 'Our care', href: '#care' },
  { label: 'Take part', href: '#take-part' },
]

export default function Home() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 40% at 18% 8%, rgba(91,141,246,0.16), transparent 62%),' +
            'radial-gradient(50% 38% at 88% 22%, rgba(47,166,160,0.13), transparent 60%),' +
            'radial-gradient(70% 50% at 50% 100%, rgba(217,192,138,0.10), transparent 66%)',
        }}
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-pearl/8 bg-ink/72 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo.svg" alt="" className="h-9 w-9 md:h-10 md:w-10" />
            <span className="font-display text-xl tracking-wide md:text-2xl">Silent&nbsp;Snow</span>
          </a>
          <nav className="hidden items-center gap-9 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.7rem] uppercase tracking-[0.22em] text-pearl/58 transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#take-part"
            className="rounded-full border border-gold/40 px-5 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-gold transition-colors hover:bg-gold/10"
          >
            Take part
          </a>
        </div>
      </header>

      {/* ─────────────────────────── hero ─────────────────────────── */}
      <section id="top" className="relative px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16">
          <div className="rise">
            <p className="eyebrow">Est. 2019 · {site.address}</p>
            <h1 className="font-display mt-6 text-[3.4rem] leading-[0.92] tracking-[-0.02em] sm:text-7xl lg:text-[5.6rem]">
              They never hear
              <br />
              the door open.
              <br />
              <span className="gold-text">They still come running.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-pearl/68">
              Silent Snow is a small sanctuary for white cats — most of them born deaf, all of them
              born convinced the world owes them a warm windowsill. We test, we train, we place, and
              we keep the door open for life.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#take-part"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-bright to-gold px-8 py-4
                           text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-ink
                           transition-transform duration-300 hover:-translate-y-0.5"
              >
                Give a cat a home
              </a>
              <a
                href="#residents"
                className="inline-flex items-center justify-center rounded-full border border-pearl/16 px-8 py-4
                           text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-pearl/82
                           transition-colors hover:border-gold/50 hover:text-gold"
              >
                Meet the residents
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 lg:max-w-2xl">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-3xl text-gold sm:text-4xl">{stat.value}</dt>
                  <dd className="mt-1.5 text-[0.72rem] leading-snug text-pearl/48">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-8 rounded-[3rem] blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(91,141,246,0.22), transparent 62%)' }}
            />
            <figure className="relative overflow-hidden rounded-[2.2rem] border border-pearl/12 bg-pearl/[0.03] p-2.5 shadow-[0_50px_140px_rgba(0,0,0,0.55)]">
              <img
                src="/photos/hero-quiet-light.webp"
                alt="A white cat looking up into the dark, one blue eye catching the light"
                className="w-full rounded-[1.7rem] object-cover"
                width={1024}
                height={640}
              />
            </figure>
            <div className="glass absolute -bottom-6 left-6 right-6 rounded-2xl px-5 py-4 sm:left-10 sm:right-auto sm:w-[19rem]">
              <p className="eyebrow">Why white, why deaf</p>
              <p className="mt-2 text-sm leading-relaxed text-pearl/70">
                The gene that whitens a coat also silences the inner ear. Same switch, two results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── marquee ─────────────────────────── */}
      <section className="relative mt-10 overflow-hidden border-y border-pearl/8 py-5">
        <div className="marquee-track">
          {[0, 1].map((pass) => (
            <div key={pass} className="flex shrink-0 items-center">
              {marquee.map((item) => (
                <span key={`${pass}-${item}`} className="flex items-center whitespace-nowrap">
                  <span className="px-7 text-[0.7rem] uppercase tracking-[0.3em] text-pearl/42">{item}</span>
                  <span className="h-1 w-1 rounded-full bg-gold/55" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────── science ─────────────────────────── */}
      <section id="silence" className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
            <figure className="overflow-hidden rounded-[2rem] border border-pearl/10">
              <img
                src="/photos/odd-eyes.webp"
                alt="A white cat with one blue eye and one green eye"
                className="w-full object-cover"
                width={1024}
                height={768}
                loading="lazy"
              />
            </figure>
            <div>
              <p className="eyebrow">The silence</p>
              <h2 className="font-display mt-5 text-5xl leading-[1.02] md:text-6xl">
                A deaf cat is not
                <br />a broken cat.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-pearl/64">
                People hear “deaf” and picture a life half lived. In a house with a few agreed
                signals, a deaf white cat is simply a cat — with better manners about the doorbell.
              </p>
            </div>
          </div>

          <div className="rule mt-16" />

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {science.map((item) => (
              <article key={item.index} className="group">
                <span className="font-display text-6xl text-gold/24 transition-colors group-hover:text-gold/45">
                  {item.index}
                </span>
                <h3 className="font-display mt-4 text-3xl">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-pearl/58">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── residents ─────────────────────────── */}
      <section id="residents" className="px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">In residence</p>
              <h2 className="font-display mt-5 text-5xl leading-[1.02] md:text-6xl">
                Four of them are waiting.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-pearl/50">
              Ask for the full file — vet history, quirks, and the honest parts — before you decide
              anything.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {residents.map((resident) => (
              <article
                key={resident.slug}
                className="group overflow-hidden rounded-[1.6rem] border border-pearl/10 bg-pearl/[0.02] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/35"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={resident.photo}
                    alt={resident.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-pearl/15 bg-ink/72 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-pearl/78 backdrop-blur-md">
                    {resident.status}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-3xl">{resident.name}</h3>
                  <p className="mt-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-gold/85">
                    {resident.age} · {resident.trait}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-pearl/56">{resident.story}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── care ─────────────────────────── */}
      <section id="care" className="relative px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="eyebrow">Our care</p>
              <h2 className="font-display mt-5 text-5xl leading-[1.02] md:text-6xl">
                What actually
                <br />
                happens here.
              </h2>
              <p className="mt-6 leading-relaxed text-pearl/60">
                No sprawling campus, no glossy annual report. One converted creamery, eleven pens, a
                vet who answers her phone, and a rule we have never broken.
              </p>
              <div className="glass mt-9 rounded-2xl p-6">
                <p className="font-display text-2xl text-gold">The open door</p>
                <p className="mt-3 text-sm leading-relaxed text-pearl/62">
                  Any cat placed by Silent Snow can come back to Silent Snow. Any reason. Any year.
                  Free. It is the first line of the adoption paperwork and the last thing we say at
                  the gate.
                </p>
              </div>
            </div>

            <ol className="relative space-y-px">
              {programme.map((step, index) => (
                <li
                  key={step.title}
                  className="group grid gap-4 border-t border-pearl/10 py-8 sm:grid-cols-[7.5rem_1fr] sm:gap-8"
                >
                  <div>
                    <span className="font-display text-4xl text-pearl/18 transition-colors group-hover:text-gold/50">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-pearl/40">
                      {step.meta}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl">{step.title}</h3>
                    <p className="mt-3 leading-relaxed text-pearl/58">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── gallery ─────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow">The barn, lately</p>
        </div>
        <PhotoBand />
      </section>

      {/* ─────────────────────────── voices ─────────────────────────── */}
      <section className="px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {voices.map((voice) => (
            <figure key={voice.name} className="glass rounded-[1.6rem] p-8 md:p-10">
              <span className="font-display text-6xl leading-none text-gold/35">“</span>
              <blockquote className="font-display -mt-4 text-2xl leading-snug md:text-[1.7rem]">
                {voice.quote}
              </blockquote>
              <figcaption className="mt-6 text-[0.66rem] uppercase tracking-[0.22em] text-pearl/45">
                {voice.name} · {voice.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ─────────────────────────── take part ─────────────────────────── */}
      <section id="take-part" className="px-5 pb-28 md:px-8 md:pb-36">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="eyebrow">Take part</p>
            <h2 className="font-display mx-auto mt-5 max-w-3xl text-5xl leading-[1.02] md:text-6xl">
              Adopt, foster, sponsor,
              <br />
              or just turn up on a Saturday.
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-pearl/58">
              Tell us which one and we will write back — a person, not a template.
            </p>
          </div>

          <div className="mt-12">
            <PledgeForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-pearl/8 px-5 py-12 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="" className="h-10 w-10" />
            <div>
              <p className="font-display text-xl">{site.name}</p>
              <p className="text-[0.66rem] uppercase tracking-[0.2em] text-pearl/40">{site.tagline}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 text-sm text-pearl/52 md:items-end">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="transition-colors hover:text-gold">
              {site.phone}
            </a>
            <p className="text-[0.66rem] uppercase tracking-[0.2em] text-pearl/32">
              Photography released under CC0 · see CREDITS.md
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
