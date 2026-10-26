import { CONTACT, waLink } from '@/lib/site'
import ContactForm from './ContactForm'

export default function Contact() {
  return (
    <section className="section" id="contacto">
      <div className="glow" aria-hidden="true" style={{ width: 900, height: 600, left: '50%', top: 40, transform: 'translateX(-50%)', background: 'radial-gradient(ellipse,rgba(255,45,61,.22),transparent 65%)' }} />
      <div className="wrap">
        <div className="contact glass reveal">
          <div>
            <div className="label"><b>›</b> 04 / Contacto</div>
            <h2>¿Tienes un proyecto en <span className="accent">mente?</span></h2>
            <p className="section-lead">Cuéntame qué necesitas y te respondo con ideas y una cotización. La primera conversación no tiene costo.</p>
            <div className="direct">
              <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp <span>Respuesta rápida →</span></a>
              <a href={`mailto:${CONTACT.email}`}>Correo <span>{CONTACT.email}</span></a>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span>/in/jose-asencio →</span></a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
