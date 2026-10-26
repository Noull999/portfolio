import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Effects from '@/components/Effects'
import LiquidFilter from '@/components/LiquidFilter'
import { SITE_URL } from '@/lib/site'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const title = 'José Asencio — Apps y sistemas a medida para tu negocio'
const description =
  'Desarrollador full-stack en Puerto Montt, Chile. Sistemas de reservas, facturación, paneles de gestión y automatizaciones con IA para pymes y negocios locales.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: ['desarrollador', 'freelance', 'full-stack', 'apps a medida', 'sistemas web', 'pymes', 'Puerto Montt', 'Chile'],
  authors: [{ name: 'José Asencio' }],
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'es_CL',
    siteName: 'José Asencio',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'dA4qMejWY-fvafVIw66flPyEiS4qkPz8gEJav4LxnjI',
  },
}

export const viewport: Viewport = {
  themeColor: '#070405',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <LiquidFilter />
        {children}
        <Effects />
        {/* Analytics propio (Gloubal Panel) */}
        <Script
          defer
          src="https://admingloubal.vercel.app/s.js"
          data-app="glb_d16fbdce719e"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
