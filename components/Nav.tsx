import { NAV } from '@/lib/site'

export default function Nav() {
  return (
    <nav className="nav glass in" style={{ animationDelay: '.05s' }} aria-label="Principal">
      <a href="#top" className="brand"><span className="brand-dot" />José Asencio</a>
      <div className="nav-links">
        {NAV.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
      </div>
      <a href="#contacto" className="nav-cta glass">Contacto</a>
    </nav>
  )
}
