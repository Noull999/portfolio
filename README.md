# José Asencio — Apps y sistemas a medida

Portafolio para clientes: desarrollo full-stack de apps, sistemas de gestión y automatizaciones con IA. Puerto Montt, Chile.

**Live:** [portfolio-v4-rho-opal.vercel.app](https://portfolio-v4-rho-opal.vercel.app)

![Preview](https://portfolio-v4-rho-opal.vercel.app/opengraph-image)

## Stack

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)

Sin librerías de animación ni 3D: todo el diseño es CSS y un `<canvas>` liviano.

## Qué tiene

- **Haz de luz pixelado**: un canvas de 88 columnas escalado con `image-rendering: pixelated`, a ~30 fps y en pausa cuando sale de pantalla o el usuario prefiere menos movimiento.
- **Liquid glass**: en Chromium, `backdrop-filter: url(#liquid)` con un filtro SVG de turbulencia + desplazamiento refracta la luz que pasa detrás de las tarjetas. En Safari/Firefox queda como vidrio esmerilado normal.
- **Contacto sin servidor**: el formulario arma el mensaje y abre WhatsApp listo para enviar.
- **Demos enlazadas**: cada proyecto lleva a su demo pública.
- **Analytics propio** con [Gloubal Panel](https://github.com/Noull999/admingloubal).
- **Open Graph dinámico** con `next/og` (`app/opengraph-image.tsx`).

## Estructura

```
app/            layout, page, estilos globales, imagen OG
components/
  hero/         hero, haz de píxeles y reloj
  sections/     proyectos, proceso, sobre mí y contacto
lib/site.ts     contenido: contacto, proyectos, servicios, pasos
public/img/     capturas de las apps (WebP)
```

Para cambiar textos, proyectos o el número de WhatsApp se edita `lib/site.ts`.

## Desarrollo

```bash
npm install
npm run dev
```

## Deploy

Vercel, deploy automático desde `main`.
