/**
 * Every photograph on the site is a CC0 / public-domain dedication, sourced
 * through Openverse. No attribution is legally required; it is listed anyway
 * because the people who released the work deserve the line.
 */
export type PhotoCredit = {
  file: string
  creator: string
  source: string
}

export const photoCredits: PhotoCredit[] = [
  { file: 'hero-quiet-light.webp', creator: 'Unknown', source: 'Openverse · CC0 1.0' },
  { file: 'odd-eyes.webp', creator: 'Unknown', source: 'Openverse · CC0 1.0' },
  { file: 'alba.webp', creator: 'katherinev5889', source: 'Openverse · CC0 1.0' },
  { file: 'nocturne.webp', creator: 'Unknown', source: 'Openverse · CC0 1.0' },
  { file: 'vesper.webp', creator: 'Unknown', source: 'Openverse · CC0 1.0' },
  { file: 'pearl.webp', creator: 'NEERAJ K', source: 'Openverse · CC0 1.0' },
  { file: 'detail-gaze.webp', creator: 'Antonio Lapa', source: 'Openverse · CC0 1.0' },
  { file: 'resting.webp', creator: 'Unknown', source: 'Openverse · CC0 1.0' },
  { file: 'window-light.webp', creator: 'Unknown', source: 'Openverse · CC0 1.0' },
  { file: 'meadow.webp', creator: 'Sadie-Michaela Harris', source: 'Openverse · CC0 1.0' },
]
