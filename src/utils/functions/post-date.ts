/**
 * Data de um post como dia de calendário, sem fuso.
 *
 * O Velite gera "2025-12-28T00:00:00.000Z" (meia-noite UTC). Com new Date(),
 * o servidor (UTC) formata dia 28 e um navegador no Brasil (UTC-3), dia 27:
 * o texto diverge e o React acusa erro de hidratação (#418).
 */
export function postDate(iso: string): Date {
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day);
}
