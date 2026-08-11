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
  openGraph: {
    title: 'Silent Snow — sanctuary for white and deaf cats',
    description: 'A quiet barn where white cats are heard differently.',
    type: 'website',
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
