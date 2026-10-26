import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La página /soluciones del sitio anterior ahora vive dentro de la portada
  async redirects() {
    return [{ source: "/soluciones", destination: "/", permanent: true }];
  },
};

export default nextConfig;
