/**
 * Data de um post como dia de calendário, sem fuso.
 *
 * O Velite gera "2026-10-13T00:00:00.000Z" (meia-noite UTC). Com new Date(),
 * o servidor (UTC) formata dia 13 e um navegador no Brasil (UTC-3), dia 12:
 * o texto diverge e o React acusa erro de hidratação (#418).
 */
export function postDate(iso: string): Date {
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day);
}

const STYLES = {
  // pt-BR: "13 de outubro de 2026" · en-US: "October 13, 2026"
  long: { day: 'numeric', month: 'long', year: 'numeric' },
  // pt-BR: "13 de out. de 2026" · en-US: "Oct 13, 2026"
  short: { day: 'numeric', month: 'short', year: 'numeric' },
  // pt-BR: "13/10" · en-US: "10/13"
  dayMonth: { day: '2-digit', month: '2-digit' }
} satisfies Record<string, Intl.DateTimeFormatOptions>;

/**
 * Formata a data de um post seguindo as regras do idioma (ordem, preposições,
 * abreviações). Fuso fixo em UTC para servidor e navegador mostrarem o mesmo dia.
 */
export function formatPostDate(
  iso: string,
  locale: string,
  style: keyof typeof STYLES = 'long'
): string {
  return new Intl.DateTimeFormat(locale, {
    ...STYLES[style],
    timeZone: 'UTC'
  }).format(new Date(iso));
}
