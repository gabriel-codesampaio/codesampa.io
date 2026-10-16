'use client';

import { sendContactMessage, type ContactState } from '@/app/actions/contact';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useRef, useState } from 'react';

import { PROJECT_TYPES } from '@/utils/constants/contact';
import { cn } from '@/utils/functions/tw-merge';

const inputClass =
  'w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-[border-color,box-shadow] focus-visible:border-primary-text focus-visible:ring-2 focus-visible:ring-primary-text/40 aria-invalid:border-destructive';

export function ContactForm() {
  const t = useTranslations('Pages.Contact.Form');
  const [state, formAction, isPending] = useActionState<ContactState, FormData>(
    sendContactMessage,
    null
  );
  // Momento em que o formulário apareceu: o servidor descarta envios rápidos demais
  const [renderedAt] = useState(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const errors = state?.fieldErrors ?? {};
  const values = state?.values ?? {};

  // Leva o foco ao primeiro campo com erro depois do envio
  useEffect(() => {
    if (!state || state.success || !state.fieldErrors) return;
    const first = Object.keys(state.fieldErrors)[0];
    formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  if (state?.success) {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-start justify-center gap-4 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8"
      >
        <CheckCircle2
          size={32}
          className="text-emerald-400"
          aria-hidden="true"
        />
        <h2 className="font-space text-2xl font-bold">{t('success_title')}</h2>
        <p className="text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-card p-6 md:p-8"
    >
      <div>
        <h2 className="font-space text-2xl font-bold">{t('title')}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>

      {/* Campo-isca: invisível para pessoas, preenchido por robôs */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          {t('honeypot_label')}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="rendered_at" value={renderedAt} />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field id="contact-name" label={t('name')} error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            defaultValue={values.name}
            autoComplete="name"
            required
            placeholder={t('name_placeholder')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={inputClass}
          />
        </Field>

        <Field id="contact-email" label={t('email')} error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            defaultValue={values.email}
            autoComplete="email"
            spellCheck={false}
            required
            placeholder={t('email_placeholder')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="contact-company" label={t('company')} optional={t('optional')}>
        <input
          id="contact-company"
          name="company"
          type="text"
          defaultValue={values.company}
          autoComplete="organization"
          placeholder={t('company_placeholder')}
          className={inputClass}
        />
      </Field>

      <fieldset
        aria-invalid={!!errors.projectType}
        aria-describedby={errors.projectType ? 'contact-type-error' : undefined}
      >
        <legend className="mb-2 text-sm font-medium">
          {t('project_type')}
        </legend>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((type, i) => (
            <label key={type} className="cursor-pointer">
              <input
                type="radio"
                name="projectType"
                value={type}
                defaultChecked={
                  values.projectType ? values.projectType === type : i === 0
                }
                className="peer sr-only"
              />
              <span
                className={cn(
                  'inline-flex min-h-11 items-center rounded-full border border-white/10 px-4 text-sm text-muted-foreground transition-colors',
                  'hover:bg-white/5 peer-checked:border-primary-text peer-checked:bg-primary/15 peer-checked:text-foreground',
                  'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-text/60'
                )}
              >
                {t(`project_types.${type}`)}
              </span>
            </label>
          ))}
        </div>
        {errors.projectType && (
          <p id="contact-type-error" className="mt-2 text-sm text-red-400">
            {errors.projectType}
          </p>
        )}
      </fieldset>

      <Field id="contact-message" label={t('message')} error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          defaultValue={values.message}
          required
          rows={5}
          placeholder={t('message_placeholder')}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? 'contact-message-error' : undefined
          }
          className={cn(inputClass, 'resize-y')}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" aria-live="polite" className="text-sm text-red-400">
          {state && !state.success ? state.message : ''}
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
        >
          {isPending ? (
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
          ) : (
            <Send size={18} aria-hidden="true" />
          )}
          {isPending ? t('sending') : t('submit')}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children
}: {
  id: string;
  label: string;
  optional?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-muted-foreground">
            ({optional})
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
