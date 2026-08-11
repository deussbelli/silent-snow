'use client'

import { useEffect, useState } from 'react'
import { gallery } from '@/lib/content'

/**
 * The photo band, with a lightbox. Kept as its own client component so the
 * rest of the page stays a server component.
 */
export default function PhotoBand() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const open = openIndex === null ? null : gallery[openIndex]

  useEffect(() => {
    if (openIndex === null) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenIndex(null)
      if (event.key === 'ArrowRight') setOpenIndex((i) => (i === null ? i : (i + 1) % gallery.length))
      if (event.key === 'ArrowLeft') setOpenIndex((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length))
    }

    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [openIndex])

  return (
    <>
      <div className="mt-7 grid grid-cols-2 gap-2 px-2 md:grid-cols-4 md:gap-3 md:px-3">
        {gallery.map((shot, index) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open: ${shot.alt}`}
            className="overflow-hidden rounded-2xl border border-pearl/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <img
              src={shot.src}
              alt={shot.alt}
              className="aspect-[3/2] w-full object-cover transition-transform duration-700 hover:scale-[1.06]"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/94 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setOpenIndex(null)}
        >
          <figure className="max-h-full max-w-4xl overflow-hidden rounded-[1.4rem] border border-pearl/12">
            <img src={open.src} alt={open.alt} className="max-h-[78vh] w-full object-contain" />
            <figcaption className="bg-ink-soft px-5 py-3 text-center text-sm text-pearl/70">
              {open.alt}
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full border border-pearl/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-pearl/70 hover:text-gold"
          >
            Close
          </button>
        </div>
      ) : null}
    </>
  )
}
