import Nav from '@/components/Nav'
import Hero from '@/components/hero/Hero'
import Projects from '@/components/sections/Projects'
import Process from '@/components/sections/Process'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
