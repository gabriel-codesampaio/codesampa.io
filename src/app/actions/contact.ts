'use server';

import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { z } from 'zod';

import { isRateLimited } from '@/lib/rate-limit';
import { getResend } from '@/lib/resend';
import { CONTACT_EMAIL, PROJECT_TYPES } from '@/utils/constants/contact';

const MIN_FILL_TIME_MS = 3000;

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional(),
  projectType: z.enum(PROJECT_TYPES),
  message: z.string().trim().min(10).max(4000)
});

export type ContactFieldErrors = Partial<
  Record<'name' | 'email' | 'projectType' | 'message', string>
>;

export type ContactValues = Partial<
  Record<'name' | 'email' | 'company' | 'projectType' | 'message', string>
>;

export type ContactState = {
  success: boolean;
  message: string;
  fieldErrors?: ContactFieldErrors;
  /** Devolvidos em caso de erro: o React 19 reseta o formulário após a action */
  values?: ContactValues;
} | null;

// O conteúdo vem do visitante: escapar antes de montar o HTML do e-mail
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const t = await getTranslations('Pages.Contact.Form');

  const values: ContactValues = {};
  for (const key of [
    'name',
    'email',
    'company',
    'projectType',
    'message'
  ] as const) {
    const v = formData.get(key);
    if (typeof v === 'string') values[key] = v;
  }

  // Proteções anti-abuso (mesmas da newsletter)
  const honeypot = formData.get('website');
  const renderedAt = Number(formData.get('rendered_at'));
  if (
    honeypot ||
    !Number.isFinite(renderedAt) ||
    Date.now() - renderedAt < MIN_FILL_TIME_MS
  ) {
    return { success: true, message: t('success') };
  }

  const ip =
    (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';
  if (isRateLimited(`contact:${ip}`, 5, 60 * 60 * 1000)) {
    return { success: false, message: t('errors.rate_limited'), values };
  }

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company') || undefined,
    projectType: formData.get('projectType'),
    message: formData.get('message')
  });

  if (!parsed.success) {
    const fields = parsed.error.flatten().fieldErrors;
    const fieldErrors: ContactFieldErrors = {};
    if (fields.name) fieldErrors.name = t('errors.name');
    if (fields.email) fieldErrors.email = t('errors.email');
    if (fields.projectType) fieldErrors.projectType = t('errors.project_type');
    if (fields.message) fieldErrors.message = t('errors.message');
    return {
      success: false,
      message: t('errors.invalid'),
      fieldErrors,
      values
    };
  }

  const { name, email, company, projectType, message } = parsed.data;
  const typeLabel = t(`project_types.${projectType}`);
  // Assunto é uma linha só: remove quebras vindas do visitante
  const oneLine = (v: string) => v.replace(/[\r\n]+/g, ' ');

  try {
    const resend = getResend();
    if (!resend) {
      return { success: false, message: t('errors.send'), values };
    }

    const { error } = await resend.emails.send({
      from: `Site codesampa.io <${CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Novo contato: ${oneLine(name)}${company ? ` (${oneLine(company)})` : ''} · ${typeLabel}`,
      html: `
        <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
          <h2>Novo contato pelo site</h2>
          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
          ${company ? `<p><strong>Empresa:</strong> ${escapeHtml(company)}</p>` : ''}
          <p><strong>Tipo de projeto:</strong> ${escapeHtml(typeLabel)}</p>
          <p><strong>Mensagem:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `
    });

    if (error) {
      console.error('Resend Contact Form Error:', error);
      return { success: false, message: t('errors.send'), values };
    }

    return { success: true, message: t('success') };
  } catch (error) {
    console.error(error);
    return { success: false, message: t('errors.send'), values };
  }
}
