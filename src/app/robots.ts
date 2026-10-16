import { MetadataRoute } from 'next';

import { HOST } from '@/utils/constants/host';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Páginas internas (vitrine de testes e confirmação de agendamento)
      disallow: ['/*/hero-showcase', '/*/schedule-success']
    },
    sitemap: `${HOST}/sitemap.xml`
  };
}
