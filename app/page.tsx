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
        {/* La luz del hero sigue bajando como un hilo y enciende una franja de código */}
        <div className="below">
          <div className="code-field" aria-hidden="true" />
          <Projects />
          <Process />
          <About />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}
