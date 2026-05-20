import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/effects/SmoothScroll'
import Nav from '@/components/ui/Nav'
import Cursor from '@/components/cursor/Cursor'

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
    <html lang="es" className="h-full">
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
