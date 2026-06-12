import type { Metadata } from 'next'
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
  title: 'José Asencio — Dev & Tech',
  description: 'Analista Programador Titulado · Técnico IT · Desarrollador Full-Stack. Disponible para proyectos freelance. Puerto Montt, Chile.',
  keywords: ['desarrollador', 'freelance', 'full-stack', 'Python', 'React', 'Flask', 'Puerto Montt', 'Chile'],
  authors: [{ name: 'José Asencio', url: 'mailto:joseestebanasencio@gmail.com' }],
  openGraph: {
    title: 'José Asencio — Dev & Tech',
    description: 'Full-Stack Developer disponible para proyectos freelance.',
    type: 'website',
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
      </body>
    </html>
  )
}
