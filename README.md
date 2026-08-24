# José Asencio — Dev & Tech

Portfolio personal en 3D/WebGL. Analista Programador · Full-Stack, Puerto Montt, Chile.

**Live:** [portfolio-v4-rho-opal.vercel.app](https://portfolio-v4-rho-opal.vercel.app)

![Preview](https://portfolio-v4-rho-opal.vercel.app/opengraph-image)

## Stack

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white) ![Three.js](https://img.shields.io/badge/Three.js-r184-000000?logo=three.js&logoColor=white) ![React Three Fiber](https://img.shields.io/badge/R3F-9-black) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white) ![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)

## Qué tiene

- **Hero 3D interactivo**: carrusel de esculturas generadas con IA (modelos `.glb` optimizados) renderizado con React Three Fiber, con luces dinámicas, post-procesamiento (`@react-three/postprocessing`) y mapas de iluminación ambiental (HDRI) auto-hospedados.
- **Cristal/refracción en tiempo real**: escena con `MeshTransmissionMaterial` de `drei` para efectos de vidrio/cromo.
- **Scroll suave**: `lenis` + animaciones de scroll con GSAP (`@gsap/react`).
- **Cursor custom** y micro-interacciones con `framer-motion`.
- **Analytics propio**: tracking de pageviews/clicks/errores JS vía [Gloubal Panel](https://github.com/Noull999/admingloubal), un dashboard de analytics que construí y opero yo mismo.
- **Open Graph dinámico**: la imagen de preview al compartir el link se genera en runtime con `next/og` (`app/opengraph-image.tsx`), no es un archivo estático.

## Estructura

```
app/            layout, page, metadata, OG image
components/
  hero/         escena 3D principal
  three/        carrusel de esculturas, cristal, canvas compartido
  projects/     sección de proyectos
  sections/     resto de secciones de la página
  cursor/       cursor custom
  ui/           nav y componentes de interfaz
```

## Deploy

Vercel, deploy automático desde `main`.
