import type { Metadata } from 'next';

import { routing } from '@/lib/i18n/routing';
import { HOST } from '@/utils/constants/host';

/**
 * Canonical e hreflang de uma rota. Cada página deve declarar o seu,
 * senão herda o do layout raiz (a home) e o Google trata a página como duplicada.
 *
 * @param path caminho sem o locale, começando com "/" (ou "" para a home)
 * @param locales idiomas em que a página existe (posts podem existir em um só)
 */
export function buildAlternates(
  locale: string,
  path: string,
  locales: readonly string[] = routing.locales
): Metadata['alternates'] {
  const languages: Record<string, string> = {};

  for (const lang of locales) {
    languages[lang] = `${HOST}/${lang}${path}`;
  }

  if (locales.includes(routing.defaultLocale)) {
    languages['x-default'] = `${HOST}/${routing.defaultLocale}${path}`;
  }

  return {
    canonical: `${HOST}/${locale}${path}`,
    languages
  };
}
