'use server';

import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { z } from 'zod';

import { isRateLimited } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);
const audienceId = process.env.RESEND_AUDIENCE_ID;

// Envios mais rápidos que isso a partir do carregamento do formulário são de robôs
const MIN_FILL_TIME_MS = 2000;

const schema = z.object({
  email: z.string().trim().email().max(254)
});

export async function subscribeToNewsletter(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) {
  const t = await getTranslations('Newsletter');

  // 1. Proteções anti-abuso: sem elas, qualquer script dispara e-mails
  // em nome do domínio para endereços de terceiros.
  const honeypot = formData.get('company');
  const renderedAt = Number(formData.get('rendered_at'));
  const filledTooFast =
    !Number.isFinite(renderedAt) || Date.now() - renderedAt < MIN_FILL_TIME_MS;

  if (honeypot || filledTooFast) {
    // Resposta igual à de sucesso para não ensinar o robô a contornar
    return { success: true, message: t('actions.success') };
  }

  const ip =
    (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';

  if (isRateLimited(`newsletter:${ip}`, 3, 10 * 60 * 1000)) {
    return { success: false, message: t('actions.error_rate_limited') };
  }

  // 2. Validação Zod
  const validatedFields = schema.safeParse({ email: formData.get('email') });

  if (!validatedFields.success) {
    return {
      success: false,
      message: t('validation.invalid_email')
    };
  }

  try {
    if (!audienceId) {
      throw new Error('Audience ID not configured.');
    }

    // 3. Criar contato no Resend
    const { error: contactError } = await resend.contacts.create({
      email: validatedFields.data.email,
      audienceId: audienceId,
      unsubscribed: false
    });

    if (contactError) {
      // "Já inscrito" responde como sucesso para não revelar quem está na lista
      if (contactError.message.includes('already')) {
        return { success: true, message: t('actions.success') };
      }
      console.error('Resend Contact Error:', contactError);
      return { success: false, message: t('actions.error_generic') };
    }

    const { error: emailError } = await resend.emails.send({
      from: 'Gabriel Sampaio <gabriel@codesampa.io>',
      to: validatedFields.data.email,
      subject: t('email.subject'),
      html: `
        <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
          <h1>${t('email.title')}</h1>
          <p>${t('email.greeting')}</p>
          <p>${t.raw('email.content')}</p> <p>${t('email.reply_invite')}</p>
          <br />
          <p>${t('email.closing')}<br />Gabriel Sampaio</p>
          <p style="font-size: 12px; color: #888;">${t('email.footer')}</p>
        </div>
      `
    });

    if (emailError) {
      console.error('Resend Email Error:', emailError);
    }

    return { success: true, message: t('actions.success') };
  } catch (error) {
    console.error(error);
    return { success: false, message: t('actions.error_server') };
  }
}
