import type { Metadata } from 'next';

import { HOST } from '@/utils/constants/host';
import { PT_BR, EN_US } from '@/utils/constants/languages';

const OG_IMAGE = '/og-image.png';

/**
 * Open Graph e Twitter de uma página. O `openGraph` de uma página substitui
 * o do layout inteiro (merge raso), então cada página precisa declarar o
 * completo, com url, imagem e locale, senão herda os da home.
 */
export function buildSocial({
  locale,
  path,
  title,
  description,
  article
}: {
  locale: string;
  path: string;
  title: string;
  description?: string;
  article?: { publishedTime: string; tags: string[] };
}): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      title,
      description,
      url: `${HOST}/${locale}${path}`,
      siteName: 'codesampa.io',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
      locale: locale === PT_BR ? PT_BR : EN_US,
      ...(article ? { type: 'article', ...article } : { type: 'website' })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
      creator: '@sampaiogabriel'
    }
  };
}

/** Serializa JSON-LD escapando `<` para não fechar a tag <script> por acidente. */
export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
