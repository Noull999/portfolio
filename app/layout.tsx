import type { Metadata } from 'next'
import Script from 'next/script'
import { Anton, Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/effects/SmoothScroll'
import Nav from '@/components/ui/Nav'
import Cursor from '@/components/cursor/Cursor'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-v4-rho-opal.vercel.app'),
  title: 'José Asencio — Dev & Tech',
  description: 'Analista Programador Titulado · Técnico IT · Desarrollador Full-Stack. Disponible para proyectos freelance. Puerto Montt, Chile.',
  keywords: ['desarrollador', 'freelance', 'full-stack', 'Python', 'React', 'Three.js', 'Puerto Montt', 'Chile'],
  authors: [{ name: 'José Asencio', url: 'mailto:joseestebanasencio@gmail.com' }],
  openGraph: {
    title: 'José Asencio — Dev & Tech',
    description: 'Analista Programador Titulado · Full-Stack Developer disponible para proyectos freelance. Puerto Montt, Chile.',
    type: 'website',
    locale: 'es_CL',
    siteName: 'José Asencio — Dev & Tech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'José Asencio — Dev & Tech',
    description: 'Analista Programador Titulado · Full-Stack Developer disponible para proyectos freelance.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`h-full ${anton.variable} ${inter.variable}`}>
      <body className="min-h-full overflow-x-hidden">
        <Cursor />
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
        <Script
          defer
          src="https://admingloubal.vercel.app/track.js"
          data-app="glb_d16fbdce719e"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
