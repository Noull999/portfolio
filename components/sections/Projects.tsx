import Image from 'next/image'
import { PROJECTS, type Project } from '@/lib/site'

function Media({ media, big }: { media: Project['media']; big?: boolean }) {
  if (media.kind === 'invoices') {
    // Mini interfaz dibujada con CSS: el sistema de facturación no tiene capturas públicas
    return (
      <div className="mock rows" aria-hidden="true">
        <div className="mock-bar" style={{ border: 0, padding: '0 0 4px', justifyContent: 'flex-start' }}><i /><i /><i /></div>
        <div><span>#0142 · Mantención mensual</span><span className="pill ok">Pagada</span></div>
        <div><span>#0143 · Instalación equipos</span><span className="pill wait">Pendiente</span></div>
        <div><span>#0144 · Soporte técnico</span><span className="pill ok">Pagada</span></div>
      </div>
    )
  }
  const cls = ['shot', !big && 'top', media.focus === 'left' && 'center'].filter(Boolean).join(' ')
  return (
    <figure className={cls}>
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes={big ? '(max-width: 960px) 100vw, 560px' : '(max-width: 520px) 100vw, (max-width: 960px) 50vw, 380px'}
      />
    </figure>
  )
}

export default function Projects() {
  return (
    <section className="section" id="proyectos">
      <div className="glow" aria-hidden="true" style={{ width: 520, height: 520, right: -160, top: 120, background: 'radial-gradient(circle,rgba(255,45,61,.16),transparent 65%)' }} />
      <div className="wrap">
        <div className="label reveal"><b>›</b> 01 / Proyectos</div>
        <h2 className="reveal">Software que ya está <span className="accent">resolviendo problemas</span> reales.</h2>
        <p className="section-lead reveal">Cada proyecto parte de una necesidad concreta de un negocio. Estos son algunos que puedes probar o adaptar al tuyo.</p>

        <div className="projects">
          {PROJECTS.map((p) => {
            const external = p.link.href.startsWith('http')
            if (p.wide) {
              return (
                <article key={p.title} className="project wide glass reveal">
                  <div className="wide-text">
                    <span className="tag">{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    {p.bullets && <ul className="bullets">{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                    <div className="project-foot">
                      <div className="chips">{p.chips.map((c) => <span key={c}>{c}</span>)}</div>
                      <div className="links">
                        {p.secondaryLink && (
                          <a className="link muted" href={p.secondaryLink.href} target="_blank" rel="noopener noreferrer">{p.secondaryLink.label}</a>
                        )}
                        <a className="link" href={p.link.href} target="_blank" rel="noopener noreferrer">{p.link.label} →</a>
                      </div>
                    </div>
                  </div>
                  <Media media={p.media} big />
                </article>
              )
            }
            return (
              <article key={p.title} className={`project glass reveal${p.big ? ' big' : ''}`}>
                {!p.big && <Media media={p.media} />}
                <span className="tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                {p.big && <Media media={p.media} big />}
                <div className="project-foot">
                  <div className="chips">{p.chips.map((c) => <span key={c}>{c}</span>)}</div>
                  <a className="link" href={p.link.href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
                    {p.link.label} →
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
