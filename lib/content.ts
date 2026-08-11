export const site = {
  name: 'Silent Snow',
  tagline: 'A sanctuary for white cats who live without sound',
  phone: '+1 (415) 555-0142',
  email: 'hello@silentsnow.org',
  address: 'Old Creamery Barn, Fern Hollow Road',
}

export const stats = [
  { value: '312', label: 'white cats rehomed since 2019' },
  { value: '1 in 5', label: 'blue-eyed white cats arrive deaf' },
  { value: '48h', label: 'average intake to first vet review' },
  { value: '0', label: 'healthy cats ever turned away' },
]

export const marquee = [
  'deaf-friendly homes',
  'vibration training',
  'indoor-only placement',
  'sun-safe skin care',
  'BAER hearing tests',
  'lifetime return promise',
]

/**
 * The coat/hearing link is genuine feline genetics: the dominant white (W)
 * gene suppresses pigment cells, and the same cells build the inner ear.
 */
export const science = [
  {
    index: '01',
    title: 'One gene, two effects',
    body: 'The dominant white gene switches off the pigment cells that colour a coat. Those same cells line the cochlea, so when they never arrive the inner ear stays silent.',
  },
  {
    index: '02',
    title: 'Blue eyes raise the odds',
    body: 'A white cat with two blue eyes is far more likely to be deaf than a white cat with amber eyes. With one blue eye, deafness often affects only that side of the head.',
  },
  {
    index: '03',
    title: 'Deaf is not fragile',
    body: 'A deaf cat reads floor vibration, air movement and light. Indoors, with a household that learns three hand signs, the difference all but disappears.',
  },
]

export const programme = [
  {
    title: 'Intake & hearing review',
    body: 'Every white arrival gets a BAER hearing test, a skin and eye check, and a quiet fortnight before anything else is asked of them.',
    meta: 'Week one',
  },
  {
    title: 'Signal training',
    body: 'We build a shared vocabulary: a floor tap for “come”, a torch flick for “dinner”, an open palm for “wait”. New families learn the same three signs.',
    meta: 'Weeks two to six',
  },
  {
    title: 'Sun-safe placement',
    body: 'White ears and noses burn. Homes are matched for indoor living, shaded windows and a yearly dermatology visit we help pay for.',
    meta: 'Placement',
  },
  {
    title: 'The door stays open',
    body: 'If a home stops working — any reason, any year — the cat comes back to us. No fee, no questions, no lecture.',
    meta: 'Forever',
  },
]

export type Resident = {
  slug: string
  name: string
  photo: string
  age: string
  trait: string
  story: string
  status: 'Ready to adopt' | 'In training' | 'Sponsored' | 'Foster wanted'
}

export const residents: Resident[] = [
  {
    slug: 'alba',
    name: 'Alba',
    photo: '/photos/alba.webp',
    age: '3 years',
    trait: 'Deaf on the blue side · odd-eyed',
    story: 'Found asleep in a bakery flour bin, which is how she got the name. Alba turns her green-eyed side toward whoever is talking and supervises every delivery that reaches the barn.',
    status: 'Ready to adopt',
  },
  {
    slug: 'nocturne',
    name: 'Nocturne',
    photo: '/photos/nocturne.webp',
    age: '18 months',
    trait: 'Bilaterally deaf · two blue eyes',
    story: 'Answers to a double tap on the floorboards and nothing else. Nocturne learned the torch signal for dinner in four days and has never once been late for it.',
    status: 'In training',
  },
  {
    slug: 'vesper',
    name: 'Vesper',
    photo: '/photos/vesper.webp',
    age: '7 years',
    trait: 'Hearing · long-coated',
    story: 'Our senior resident and the barn’s unofficial greeter. Vesper sleeps in the office window where the underfloor pipes hum, because she likes the vibration.',
    status: 'Sponsored',
  },
  {
    slug: 'pearl',
    name: 'Pearl',
    photo: '/photos/pearl.webp',
    age: '5 months',
    trait: 'Odd-eyed · sun-sensitive skin',
    story: 'Arrived with a litter of four, the only one who stayed white. Pearl needs a shaded home and a family who will not mind a cat that follows them into the shower.',
    status: 'Foster wanted',
  },
]


export const intents = [
  { value: 'adopt', label: 'Adopt a resident' },
  { value: 'foster', label: 'Foster for a season' },
  { value: 'sponsor', label: 'Sponsor care costs' },
  { value: 'volunteer', label: 'Volunteer at the barn' },
] as const

export const voices = [
  {
    quote: 'We were told a deaf cat would be hard work. Three hand signs later, Alba runs the house and we cannot imagine the quiet without her.',
    name: 'Marta & Idris',
    role: 'adopted Alba, 2024',
  },
  {
    quote: 'The hearing test and the honest paperwork made the difference. Nobody tried to sell us a cat — they matched us with one.',
    name: 'Rowan Ellery',
    role: 'foster carer since 2021',
  },
]
