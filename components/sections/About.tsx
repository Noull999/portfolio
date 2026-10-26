import Image from 'next/image'

const ROLES = ['Full-Stack', 'IA aplicada', 'Experiencias 3D', 'Soporte IT']
const STACK = ['Python', 'FastAPI', 'Node.js', 'React', 'Next.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Three.js', 'Docker', 'Claude API']

export default function About() {
  return (
    <section className="section" id="sobre-mi">
      <div className="wrap">
        <div className="label reveal"><b>›</b> 03 / Sobre mí</div>
        <div className="about">
          <div className="profile glass lq reveal">
            <div className="avatar">
              <Image src="/jose.jpg" alt="José Asencio" fill sizes="(max-width: 960px) 420px, 330px" />
              <small>José Asencio · Dev</small>
            </div>
            <div className="facts">
              <div><span>Ubicación</span>Puerto Montt, CL</div>
              <div><span>Título</span>Analista Programador</div>
              <div><span>Estudiando</span>Ing. en Informática</div>
              <div><span>Estado</span><em style={{ fontStyle: 'normal', color: '#4ade80' }}>● Disponible</em></div>
            </div>
          </div>
          <div>
            <h2 className="reveal">Un desarrollador que entiende <span className="accent">tu negocio</span>, no solo el código.</h2>
            <p className="body reveal">
              Soy <strong>Analista Programador titulado</strong> y estudio <strong>Ingeniería en Informática</strong>. Desarrollo software
              full-stack: desde la página que ven tus clientes hasta la base de datos y el servidor, y le sumo{' '}
              <strong>inteligencia artificial</strong> cuando de verdad aporta.
            </p>
            <p className="body reveal">
              Trabajas directo conmigo, sin intermediarios. Me importa que lo que construya se use todos los días y te ahorre tiempo de verdad.
            </p>
            <div className="roles reveal">{ROLES.map((r) => <span key={r} className="glass">{r}</span>)}</div>
            <div className="stack reveal">{STACK.join(' · ')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
