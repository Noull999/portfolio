import HeroCarousel from '@/components/sections/HeroCarousel'
import DarkAbout from '@/components/sections/DarkAbout'
import DarkProjects from '@/components/sections/DarkProjects'
import DarkSkills from '@/components/sections/DarkSkills'
import DarkContact from '@/components/sections/DarkContact'
import SectionsBackdrop from '@/components/sections/SectionsBackdrop'
import Marquee from '@/components/ui/Marquee'
import Footer from '@/components/ui/Footer'

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <Marquee />
      <SectionsBackdrop>
        <DarkAbout />
        <Marquee />
        <DarkProjects />
        <Marquee />
        <DarkSkills />
        <DarkContact />
      </SectionsBackdrop>
      <Footer />
    </main>
  )
}
