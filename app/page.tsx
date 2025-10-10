import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Features from '@/components/home/Features'
import Partners from '@/components/home/Partners'
import CTA from '@/components/home/CTA'
import Stats from '@/components/home/Stats'

export const metadata: Metadata = {
  title: 'matriXO - Empowering Innovation & Creativity',
  description: 'matriXO is a leading event management and technology solutions provider. We organize impactful events, workshops, and experiences that bring communities together.',
  keywords: 'matriXO, events, workshops, technology, innovation, event management, community, TEDx, conferences',
  openGraph: {
    type: 'website',
    url: 'https://matrixo.in',
    title: 'matriXO - Empowering Innovation & Creativity',
    description: 'matriXO is a leading event management and technology solutions provider. We organize impactful events, workshops, and experiences that bring communities together.',
    siteName: 'matriXO',
    images: [
      {
        url: '/logos/logo-dark.png',
        width: 1200,
        height: 630,
        alt: 'matriXO - Empowering Innovation & Creativity',
        type: 'image/png',
      },
      {
        url: '/logos/logo-dark.png',
        width: 1080,
        height: 1080,
        alt: 'matriXO - Empowering Innovation & Creativity',
        type: 'image/png',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'matriXO - Empowering Innovation & Creativity',
    description: 'matriXO is a leading event management and technology solutions provider. We organize impactful events, workshops, and experiences that bring communities together.',
    images: ['/logos/logo-dark.png'],
    creator: '@matrixo',
  },
  other: {
    'instagram:card': 'summary_large_image',
    'instagram:title': 'matriXO - Empowering Innovation & Creativity',
    'instagram:description': 'matriXO is a leading event management and technology solutions provider. We organize impactful events, workshops, and experiences.',
    'instagram:image': 'https://matrixo.in/logos/logo-dark.png',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Features />
      <Partners />
      <CTA />
    </>
  )
}
