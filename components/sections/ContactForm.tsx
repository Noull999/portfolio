'use client'

import type { FormEvent } from 'react'
import { NEEDS, waLink } from '@/lib/site'

/** Sin servidor: arma el mensaje y abre WhatsApp listo para enviar */
export default function ContactForm() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const text = `Hola José, soy ${f.get('name')}.\nNecesito: ${f.get('type')}.\n\n${f.get('msg')}`
    window.open(waLink(text), '_blank', 'noopener')
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="f-name">Tu nombre</label>
        <input id="f-name" name="name" required placeholder="Ej: María, Panadería del Sur" />
      </div>
      <div className="field">
        <label htmlFor="f-type">¿Qué necesitas?</label>
        <select id="f-type" name="type">
          {NEEDS.map((n) => <option key={n}>{n}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-msg">Cuéntame un poco</label>
        <textarea id="f-msg" name="msg" required placeholder="¿Qué hace tu negocio y qué te gustaría mejorar?" />
      </div>
      <button className="btn btn-primary" type="submit">Enviar por WhatsApp</button>
      <p className="form-note">Se abre WhatsApp con tu mensaje listo para enviar.</p>
    </form>
  )
}
