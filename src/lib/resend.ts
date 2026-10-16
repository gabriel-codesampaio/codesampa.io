import { Resend } from 'resend';

// Criado sob demanda: `new Resend()` sem chave lança erro na carga do módulo,
// o que derrubava a página inteira (500) em vez de mostrar uma mensagem.
export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('RESEND_API_KEY não configurada.');
    return null;
  }
  return new Resend(key);
}
