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
    description: 'Experiencia web inmersiva con estética ritual/oscura. Three.js + React Three Fiber + postprocessing para escenas 3D, GSAP y Framer Motion para coreografía de transiciones, Lenis para scroll cinemático y Howler para diseño sonoro. Next.js 16 + React 19.',
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
    description: 'App personal para producir contenido optimizado para Instagram, TikTok y YouTube con asistencia de IA. Generación de guiones, ideas y calendarios editoriales desde una sola interfaz.',
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
    description: 'Plataforma multi-tenant para negocios locales. Registro de negocio con slug público, gestión de servicios y horarios, reservas en tiempo real con JWT, panel de administración y API REST completa.',
    stack: ['Node.js', 'JavaScript', 'React', 'JWT', 'MongoDB', 'REST API'],
    links: { github: 'https://github.com/Noull999/saas-agendamiento', live: 'https://saas-agendamiento.vercel.app' },
    private: false,
    color: '#10b981',
  },
  {
    id: 'proyecto-administrativo',
    category: 'Full-Stack · Facturación',
    title: 'App Administrativa — Facturación',
    description: 'App de facturación full-stack para servicios. Gestión de clientes, creación y seguimiento de facturas, panel de control con historial. Construida con React + Express + Prisma.',
    stack: ['React', 'Express', 'Node.js', 'Prisma', 'PostgreSQL', 'TypeScript'],
    links: { github: 'https://github.com/Noull999/proyecto-administrativo', live: 'https://proyecto-administrativo-iota.vercel.app' },
    private: false,
    color: '#f97316',
  },
  {
    id: 'music-downloader',
    category: 'Automatización · Python',
    title: 'Music Downloader — SoundCloud',
    description: 'Descargador automatizado de música desde SoundCloud con sincronización automática, detección de duplicados y soporte multi-formato. CLI limpio con gestión de biblioteca local.',
    stack: ['Python', 'SoundCloud API', 'CLI', 'Automatización'],
    links: { github: 'https://github.com/Noull999/music-downloader', live: null },
    private: false,
    color: '#f59e0b',
  },
  {
    id: 'portfolio',
    category: 'Frontend · Diseño · 3D',
    title: 'Portfolio v4 — Este sitio',
    description: 'Portfolio personal con Next.js 16, Three.js + React Three Fiber para esculturas 3D en el hero, GSAP, Lenis smooth scroll, carrusel de modelos .glb y diseño dark cinemático. Deployado en Vercel.',
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

export const SOCIAL = {
  github: 'https://github.com/Noull999',
  linkedin: 'https://linkedin.com/in/jose-asencio-70804b269',
  email: 'joseestebanasencio@gmail.com',
}
