import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display-loaded',
  display: 'swap',
})

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans-loaded',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Silent Snow — sanctuary for white and deaf cats',
  description:
    'Silent Snow rehomes white cats, most of them born deaf. Hearing tests, signal training, sun-safe placement and a door that stays open for life.',
  keywords: ['white cats', 'deaf cats', 'cat sanctuary', 'adoption', 'foster', 'animal welfare'],
  icons: { icon: '/logo.svg' },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://silentsnow.org'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Silent Snow — sanctuary for white and deaf cats',
    description: 'A quiet barn where white cats are heard differently.',
    type: 'website',
    images: [
      {
        url: '/photos/odd-eyes.webp',
        width: 1024,
        height: 768,
        alt: 'A white cat with one blue eye and one green eye',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silent Snow — sanctuary for white and deaf cats',
    description: 'A quiet barn where white cats are heard differently.',
    images: ['/photos/odd-eyes.webp'],
  },
}

export const viewport: Viewport = {
  themeColor: '#070a11',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
