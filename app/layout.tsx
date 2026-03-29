import type { Metadata } from 'next'
import { Lora, Raleway } from 'next/font/google'
import './globals.css'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://operationhealingwaters.org'),
  title: 'Operation Healing Waters | Veteran & Youth Fishing Therapy',
  description:
    'Free guided fishing outings for veterans with PTSD and underprivileged youth. 100% of donations go to mission. Florida Panhandle. Coast Guard approved.',
  keywords: [
    'veteran fishing therapy',
    'PTSD healing outdoors',
    'Operation Healing Waters',
    'veteran nonprofit Florida',
    'youth fishing mentorship',
  ],
  openGraph: {
    title: 'Operation Healing Waters',
    description:
      'Healing happens on the water. Free fishing outings for veterans & youth.',
    url: 'https://operationhealingwaters.org',
    images: [{ url: '/images/og-image.jpg' }],
    type: 'website',
  },
  alternates: { canonical: '/' },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/images/logo.jpg' },
  other: {
    'theme-color': '#0A1628',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${ral