export const SITE_URL = 'https://portfolio-v4-rho-opal.vercel.app'

export const CONTACT = {
  // Código país + número, sin + ni espacios
  whatsapp: '56966989252',
  email: 'joseestebanasencio@gmail.com',
  linkedin: 'https://linkedin.com/in/jose-asencio-70804b269',
  github: 'https://github.com/Noull999',
}

export const DEFAULT_WA_MESSAGE = 'Hola José, vi tu portafolio y quiero cotizar un proyecto.'

export const waLink = (text = DEFAULT_WA_MESSAGE) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`

export const NAV = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#proceso', label: 'Cómo trabajo' },
  { href: '#sobre-mi', label: 'Sobre mí' },
]

/** Tarjeta "Ahora construyendo" del hero: el haz de luz pasa por detrás */
export const BUILDING = [
  { name: 'Marea Alerta', detail: 'Riesgo de marea roja · Los Lagos', href: 'https://marea-alerta.vercel.app', color: '#ff2d3d' },
  { name: 'Dashboard Industrial', detail: 'Sensores de planta en tiempo real', href: 'https://dashboard-industrial-woad.vercel.app', color: '#ff8a5c' },
  { name: 'Predial Lechero', detail: 'Control de rodeo, ordeña y sanidad', href: 'https://predial-lechero.vercel.app', color: '#ffb3bb' },
]

export const SERVICES = [
  { title: 'Apps web', detail: 'Plataformas y portales a medida, listas para usar.' },
  { title: 'Sistemas de gestión', detail: 'Inventario, facturación y paneles para tu equipo.' },
  { title: 'Automatizaciones', detail: 'Menos trabajo repetitivo, menos errores.' },
  { title: 'Bots e IA', detail: 'WhatsApp, atención y asistentes inteligentes.' },
]

type Media =
  | { kind: 'shot'; src: string; alt: string; width: number; height: number; focus?: 'left' }
  | { kind: 'invoices' }

export type Project = {
  big?: boolean
  tag: string
  title: string
  description: string
  chips: string[]
  link: { href: string; label: string }
  media: Media
}

export const PROJECTS: Project[] = [
  {
    big: true,
    tag: 'Reservas online · SaaS',
    title: 'Sistema de Reservas Online',
    description: 'Tus clientes reservan solos y tú ves todo en un panel. Cada negocio tiene su página pública, sus horarios y sus servicios: sin llamadas ni mensajes perdidos.',
    chips: ['React', 'Node.js', 'MongoDB'],
    link: { href: 'https://saas-agendamiento-backend.vercel.app', label: 'Probar demo' },
    media: { kind: 'shot', src: '/img/reservas.webp', alt: 'Panel de reservas con las citas del día', width: 900, height: 427 },
  },
  {
    big: true,
    tag: 'Facturación · Gestión',
    title: 'Facturación y Clientes',
    description: 'Reemplaza la planilla de Excel: clientes, facturas y pagos en un solo panel. En uso real por una pyme de servicios.',
    chips: ['React', 'Express', 'PostgreSQL'],
    // Es el sistema en producción de un cliente: no tiene demo pública, se pide por correo
    link: { href: `mailto:${CONTACT.email}?subject=${encodeURIComponent('Quiero ver una demo del sistema de facturación')}`, label: 'Pedir demo' },
    media: { kind: 'invoices' },
  },
  {
    tag: 'PWA · Datos en vivo',
    title: 'Marea Alerta',
    description: 'Monitoreo del riesgo de marea roja en Los Lagos con mapa interactivo y notificaciones push.',
    chips: ['Next.js', 'IA'],
    link: { href: 'https://marea-alerta.vercel.app', label: 'Probar demo' },
    media: { kind: 'shot', src: '/img/marea.webp', alt: 'Mapa de riesgo de marea roja en Los Lagos', width: 1200, height: 575 },
  },
  {
    tag: 'Experiencia web · 3D',
    title: 'Nóctura — Rito y código',
    description: 'Experiencia web 3D inmersiva: escenas interactivas, postprocesado cinematográfico y diseño sonoro. Para marcas que quieren impactar.',
    chips: ['Three.js', 'Next.js'],
    link: { href: 'https://noctura-wheat.vercel.app', label: 'Ver experiencia' },
    media: { kind: 'shot', src: '/img/noctura.webp', alt: 'Escena 3D de Nóctura', width: 1200, height: 600, focus: 'left' },
  },
  {
    tag: 'Analytics · Herramienta propia',
    title: 'Gloubal Panel',
    description: 'Mi propio panel de analytics y monitoreo: visitas, clics, errores y uptime de todos mis sitios en un solo lugar, con reportes semanales automáticos. Tiene demo sin registro.',
    chips: ['Next.js', 'PostgreSQL'],
    link: { href: 'https://admingloubal.vercel.app', label: 'Probar demo' },
    media: { kind: 'shot', src: '/img/gloubal.webp', alt: 'Métricas de visitas en Gloubal Panel', width: 1200, height: 525 },
  },
]

export const STEPS = [
  { title: 'Conversamos', detail: 'Me cuentas cómo funciona tu negocio y qué te quita tiempo. Sin costo ni compromiso.' },
  { title: 'Propuesta', detail: 'Te envío qué voy a construir, el plazo y el precio, por escrito.' },
  { title: 'Construcción', detail: 'Te muestro avances para que veas cómo va y ajustemos a tiempo.' },
  { title: 'Entrega y soporte', detail: 'Lo dejo funcionando, te enseño a usarlo y quedo disponible para lo que necesites.' },
]

export const NEEDS = [
  'Una app o sistema web',
  'Sistema de reservas',
  'Facturación o gestión',
  'Automatizar un proceso',
  'Bot de WhatsApp o IA',
  'Otra cosa / no estoy seguro',
]
