export const ROLES = [
  'Desarrollador Full-Stack',
  'Analista Programador',
  'Ingeniero en Informática',
  'Automatizador Industrial',
]

export const PROJECTS = [
  {
    id: 'noctura',
    category: 'Experiencia Web · 3D · Diseño',
    title: 'Nóctura — Rito y Código',
    description: 'Experiencia web 3D en producción que demuestra dominio real de WebGL. Escenas interactivas, postprocessing cinemático y audio sincronizado — todo corriendo a 60 fps en el navegador.',
    stack: ['Next.js 16', 'React 19', 'Three.js', 'R3F', 'GSAP', 'Framer Motion', 'Lenis', 'Howler', 'Tailwind v4'],
    links: { github: 'https://github.com/Noull999/noctura', live: 'https://noctura-wheat.vercel.app' },
    private: false,
    color: '#c084fc',
    featured: true,
  },
  {
    id: 'content-studio',
    category: 'SaaS · IA · Redes Sociales',
    title: 'ContentStudio — Creación con IA',
    description: 'Reduce el tiempo de producción de contenido en redes sociales usando Claude AI. Genera guiones, ideas y calendarios editoriales para Instagram, TikTok y YouTube desde una interfaz unificada.',
    stack: ['Next.js', 'React', 'TypeScript', 'Claude API', 'Tailwind CSS'],
    links: { github: 'https://github.com/Noull999/content-studio', live: 'https://contentstudio-six.vercel.app' },
    private: false,
    color: '#a855f7',
    featured: true,
  },
  {
    id: 'saas-agendamiento',
    category: 'SaaS · Full-Stack',
    title: 'SaaS de Agendamiento',
    description: 'SaaS multi-tenant que permite a negocios locales aceptar reservas online en minutos. Cada negocio tiene su slug público, gestión de horarios y panel propio — sin configuración técnica.',
    stack: ['Node.js', 'JavaScript', 'React', 'JWT', 'MongoDB', 'REST API'],
    links: { github: 'https://github.com/Noull999/saas-agendamiento', live: 'https://saas-agendamiento.vercel.app' },
    private: false,
    color: '#10b981',
  },
  {
    id: 'proyecto-administrativo',
    category: 'Full-Stack · Facturación',
    title: 'App Administrativa — Facturación',
    description: 'Digitaliza el flujo completo de facturación: alta de clientes, emisión de facturas y seguimiento de pagos en un panel centralizado. Stack completo React + Express + Prisma + PostgreSQL.',
    stack: ['React', 'Express', 'Node.js', 'Prisma', 'PostgreSQL', 'TypeScript'],
    links: { github: 'https://github.com/Noull999/proyecto-administrativo', live: 'https://proyecto-administrativo-iota.vercel.app' },
    private: false,
    color: '#f97316',
  },
  {
    id: 'music-downloader',
    category: 'Automatización · Python',
    title: 'Music Downloader — SoundCloud',
    description: 'Automatiza la descarga y organización de bibliotecas musicales desde SoundCloud. Sincronización incremental, detección de duplicados y soporte multi-formato — resuelve en segundos lo que tomaría horas manual.',
    stack: ['Python', 'SoundCloud API', 'CLI', 'Automatización'],
    links: { github: 'https://github.com/Noull999/music-downloader', live: null },
    private: false,
    color: '#f59e0b',
  },
  {
    id: 'portfolio',
    category: 'Frontend · Diseño · 3D',
    title: 'Portfolio v4 — Este sitio',
    description: 'Este mismo sitio: hero con esculturas 3D interactivas, carrusel animado y diseño dark cinemático. Construido con Next.js 16 + R3F — la prueba viva de todo lo que sé hacer.',
    stack: ['Next.js 16', 'TypeScript', 'Three.js', 'R3F', 'GSAP', 'Lenis', 'Tailwind v4'],
    links: { github: 'https://github.com/Noull999/portfolio', live: 'https://portfolio-v4-rho-opal.vercel.app' },
    private: false,
    color: '#48cae4',
  },
]

export const SKILLS = [
  { group: 'Backend', items: ['Python', 'Flask', 'Node.js', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Docker'] },
  { group: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
  { group: 'IA & APIs', items: ['Claude API', 'Anthropic SDK', 'Stripe API', 'REST APIs', 'JWT', 'Prompt Engineering'] },
  { group: 'Industrial', items: ['PLC Siemens S7', 'TIA Portal', 'Ladder Logic', 'SCADA', 'HMI'] },
  { group: 'IT & Infra', items: ['Linux', 'Git', 'Docker', 'Redes TCP/IP', 'Soporte Hardware'] },
]

export const SOLUTIONS = [
  {
    id: 'reservas',
    tag: 'Reservas online',
    title: 'Sistema de Reservas Online',
    pitch: 'Tus clientes reservan solos, vos ves todo en un panel.',
    description:
      'Cada negocio tiene su propia página pública, sus horarios y sus servicios. El cliente reserva sin llamarte ni escribirte, y vos administrás todo desde un panel — sin planillas, sin WhatsApp perdido entre mensajes.',
    bullets: [
      'Página pública propia por negocio (tu marca, tus servicios)',
      'Calendario de horarios y disponibilidad en tiempo real',
      'Panel de administración para ver y gestionar reservas',
      'Adaptable a peluquerías, clínicas, talleres, estudios — cualquier rubro con turnos',
    ],
    demo: 'https://saas-agendamiento.vercel.app',
    demoIsPublic: true,
    color: '#10b981',
  },
  {
    id: 'facturacion',
    tag: 'Facturación y clientes',
    title: 'Sistema de Facturación y Clientes',
    pitch: 'Facturás, cobrás y llevás el control — todo en un solo lugar.',
    description:
      'Reemplaza la planilla de Excel y los papeles sueltos: alta de clientes, emisión de facturas y seguimiento de pagos centralizado en un panel simple, pensado para pymes que necesitan orden sin complicarse con software contable pesado.',
    bullets: [
      'Alta y gestión de clientes en un solo lugar',
      'Emisión de facturas con seguimiento de estado (pagada / pendiente)',
      'Historial completo, sin depender de planillas sueltas',
      'Pensado para pymes de servicios — se adapta a tu rubro',
    ],
    // Es el sistema real de un cliente real (Servicios Asencio) en produccion:
    // no tiene landing publica, cae directo al login. No se linkea para que
    // nadie pruebe entrar ahi ni vea eso como un "demo roto".
    demo: `mailto:${'joseestebanasencio@gmail.com'}?subject=Quiero%20ver%20una%20demo%20del%20sistema%20de%20facturacion`,
    demoIsPublic: false,
    color: '#f97316',
  },
]

export const SOCIAL = {
  github: 'https://github.com/Noull999',
  linkedin: 'https://linkedin.com/in/jose-asencio-70804b269',
  email: 'joseestebanasencio@gmail.com',
}
