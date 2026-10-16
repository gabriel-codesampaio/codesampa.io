import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

// Só no dev (modo watch). No build o script já roda `velite && next build`;
// disparar de novo aqui com clean:true apagava .velite/ no meio da compilação
// e o build falhava às vezes com "Can't resolve './posts.json'".
const isDev = process.argv.indexOf('dev') !== -1;
if (!process.env.VELITE_STARTED && isDev) {
  process.env.VELITE_STARTED = '1';
  import('velite').then((m) => m.build({ watch: true, clean: false }));
}

// CSP sem script-src: o Next e o next-themes usam scripts inline, e uma política
// de scripts exigiria nonce em todas as páginas. Estas diretivas não quebram nada
// e já bloqueiam clickjacking, injeção de <base> e formulários enviados para fora.
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value:
      "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests"
  },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  }
  // HSTS já é enviado pela Vercel (sem includeSubDomains, de propósito)
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  images: {
    qualities: [75, 90],
    // AVIF primeiro (menor); seguro a partir do next@16.3.8, que corrigiu a
    // vulnerabilidade do otimizador com AVIF
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com'
      }
    ]
  }
};

export default withNextIntl(nextConfig);
