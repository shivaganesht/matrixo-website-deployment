import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'matriXO - Technical Workshops, Events & Bootcamps for Students',
  description: 'matriXO — Your gateway to technical excellence. Workshops, hackathons, bootcamps, and career-focused events designed for students. MSME Registered.',
  keywords: 'matriXO, technical workshops, hackathons, bootcamps, student events, career development, tech events, coding workshops, student training',
  authors: [{ name: 'matriXO Team' }],
  creator: 'matriXO',
  publisher: 'matriXO',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://matrixo.in',
    siteName: 'matriXO',
    title: 'matriXO - Technical Workshops & Career-Focused Events',
    description: 'Technical workshops, hackathons, and bootcamps for student career growth.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'matriXO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'matriXO - Technical Workshops & Career-Focused Events',
    description: 'Technical workshops, hackathons, and bootcamps for student career growth.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
