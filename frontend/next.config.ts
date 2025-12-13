import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  turbopack: {
    root: __dirname,
  },
  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'backend',
        port: '3001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
    ],
    // Erlaube localhost-Bilder (nur für Entwicklung)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
  },
  // Disable image optimization für localhost in Entwicklung
  experimental: {
    allowedLocalUrls: ['http://localhost:3001', 'http://backend:3001'],
  },
};

export default nextConfig;