// Envios mais rápidos que isso a partir do carregamento do formulário são de robôs
const MIN_FILL_TIME_MS = 2000;

// Honeypot preenchido, ou formulário enviado rápido demais (ou sem o carimbo
// de quando apareceu na tela): tratamos como robô.
export function looksLikeBot(formData: FormData, now = Date.now()): boolean {
  if (formData.get('company')) return true;

  // Sem o campo, Number(null) daria 0 e o envio passaria como humano
  const raw = formData.get('rendered_at');
  const renderedAt = typeof raw === 'string' && raw !== '' ? Number(raw) : NaN;

  return !Number.isFinite(renderedAt) || now - renderedAt < MIN_FILL_TIME_MS;
}
