import HeroCarousel from '@/components/sections/HeroCarousel'
import DarkAbout from '@/components/sections/DarkAbout'
import DarkProjects from '@/components/sections/DarkProjects'
import DarkSkills from '@/components/sections/DarkSkills'
import DarkContact from '@/components/sections/DarkContact'
import Footer from '@/components/ui/Footer'

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <DarkAbout />
      <DarkProjects />
      <DarkSkills />
      <DarkContact />
      <Footer />
    </main>
  )
}
