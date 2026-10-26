import { STEPS } from '@/lib/site'

export default function Process() {
  return (
    <section className="section" id="proceso">
      <div className="glow" aria-hidden="true" style={{ width: 600, height: 400, left: -200, top: 60, background: 'radial-gradient(circle,rgba(255,45,61,.12),transparent 65%)' }} />
      <div className="wrap">
        <div className="label reveal"><b>›</b> 02 / Cómo trabajo</div>
        <h2 className="reveal">Simple, claro y <span className="accent">sin sorpresas.</span></h2>
        <p className="section-lead reveal">Hablas directo conmigo de principio a fin. Sabes qué se va a hacer, cuánto cuesta y cuándo está listo.</p>

        <div className="steps">
          {STEPS.map((s, i) => (
            <div key={s.title} className="step glass reveal">
              <div className="dot" />
              <i>{String(i + 1).padStart(2, '0')}</i>
              <b>{s.title}</b>
              <p>{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
