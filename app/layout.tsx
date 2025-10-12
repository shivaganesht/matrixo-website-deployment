import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://matrixo.in'),
  title: {
    default: 'matriXO - Technical Workshops, Events & Bootcamps for Students',
    template: '%s | matriXO'
  },
  description: 'matriXO — Your gateway to technical excellence. Workshops, hackathons, bootcamps, and career-focused events designed for students. MSME Registered.',
  keywords: 'matriXO, technical workshops, hackathons, bootcamps, student events, career development, tech events, coding workshops, student training',
  authors: [{ name: 'matriXO Team' }],
  creator: 'matriXO',
  publisher: 'matriXO',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://matrixo.in',
    siteName: 'matriXO',
    title: 'matriXO - Technical Workshops & Career-Focused Events',
    description: 'Technical workshops, hackathons, and bootcamps for student career growth. Join our events and accelerate your tech journey.',
    images: [
      {
        url: 'https://matrixo.in/logos/matrixo logo wide.png',
        width: 1200,
        height: 630,
        alt: 'matriXO - Technical Workshops & Events',
        type: 'image/png',
      },
      {
        url: 'https://matrixo.in/logos/logo-dark.png',
        width: 1080,
        height: 1080,
        alt: 'matriXO Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'matriXO - Technical Workshops & Career-Focused Events',
    description: 'Technical workshops, hackathons, and bootcamps for student career growth.',
    images: ['https://matrixo.in/logos/matrixo logo wide.png'],
    creator: '@matrixo',
  },
  other: {
    'instagram:card': 'summary_large_image',
    'instagram:title': 'matriXO - Technical Workshops & Career-Focused Events',
    'instagram:description': 'Technical workshops, hackathons, and bootcamps for student career growth. Join our events!',
    'instagram:image': 'https://matrixo.in/logos/matrixo logo wide.png',
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
        {/* Dark Mode Script */}
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KFF7KV3Z11"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KFF7KV3Z11');
          `}
        </Script>

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
