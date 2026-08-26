import type { Metadata } from 'next'
import SolutionsHero from '@/components/sections/SolutionsHero'
import SolutionsGrid from '@/components/sections/SolutionsGrid'
import SolutionsProcess from '@/components/sections/SolutionsProcess'
import SolutionsCTA from '@/components/sections/SolutionsCTA'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Soluciones para tu negocio — José Asencio',
  description:
    'Sistemas web ya probados (reservas online, facturación) listos para adaptar a tu pyme en días, no meses.',
}

export default function SolucionesPage() {
  return (
    <main>
      <SolutionsHero />
      <SolutionsGrid />
      <SolutionsProcess />
      <SolutionsCTA />
      <Footer />
    </main>
  )
}
