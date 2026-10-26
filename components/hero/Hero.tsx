import type { CSSProperties } from 'react'
import { BUILDING, SERVICES, waLink } from '@/lib/site'
import { WhatsAppIcon } from '@/components/icons'
import BeamPixels from './BeamPixels'
import AsciiFloor from './AsciiFloor'
import Clock from './Clock'

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` })

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="meta in" style={delay(0.15)}>
        <span>Puerto Montt, CL</span>
        <span>41.47°S 72.94°W</span>
        <Clock />
      </div>

      <div className="beam" aria-hidden="true">
        <div className="beam-floor" />
        <div className="beam-core" />
        <BeamPixels />
        <AsciiFloor />
        <div className="grain" />
      </div>

      <div className="hero-grid">
        <div>
          <div className="eyebrow glass in" style={delay(0.2)}><span className="pulse" />Disponible para nuevos proyectos</div>

          <h1 className="in" style={delay(0.3)}>Apps y sistemas<br /><span className="accent">a medida</span> para<br />tu negocio.</h1>

          <p className="lead in" style={delay(0.42)}>
            Soy <strong>José Asencio</strong>, desarrollador full-stack en Puerto Montt.
            Convierto planillas, cuadernos y procesos manuales en software simple:{' '}
            <strong>reservas online, facturación, paneles de gestión</strong> y automatizaciones con IA.
          </p>

          <div className="ctas in" style={delay(0.54)}>
            <a className="btn btn-primary" href={waLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Cotiza por WhatsApp
            </a>
            <a className="btn btn-ghost glass" href="#proyectos">Ver proyectos <span aria-hidden="true">→</span></a>
          </div>

          <div className="trust in" style={delay(0.66)}>
            <span>Analista Programador titulado</span>
            <span>Cotización sin costo</span>
            <span>Respuesta en 24 h</span>
          </div>
        </div>

        <aside className="card glass in" style={delay(0.6)}>
          <div className="card-label"><span>Ahora construyendo</span><span>2026</span></div>
          <ul className="work">
            {BUILDING.map((b) => (
              <li key={b.name}>
                <a className="row" href={b.href} target="_blank" rel="noopener noreferrer">
                  <span className="dot" style={{ background: b.color, boxShadow: `0 0 10px ${b.color}` }} />
                  <div><b>{b.name}</b><small>{b.detail}</small></div>
                  <em>DEMO ↗</em>
                </a>
              </li>
            ))}
          </ul>
          <div className="card-foot">
            <span>¿Tienes una idea?</span>
            <a href="#contacto">Conversemos →</a>
          </div>
        </aside>
      </div>

      <div className="services" id="servicios">
        {SERVICES.map((s, i) => (
          <div key={s.title} className="svc glass in" style={delay(0.75 + i * 0.07)}>
            <i>{String(i + 1).padStart(2, '0')}</i><b>{s.title}</b><span>{s.detail}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
