'use client';

import { Mail, Calendar, Copy, Check, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { CONTACT_EMAIL, SCHEDULE_URL } from '@/utils/constants/contact';

import { ContactForm } from './contact-form';

// Formulário como ação principal; agenda e e-mail como alternativas.
// Tudo visível desde o HTML do servidor (antes os cards nasciam com opacity 0).
export function ContactHub() {
  const t = useTranslations('Pages.Contact.Hub');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      toast.success(t('email.toast_success'));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t('email.toast_error'));
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <ContactForm />
      </div>

      <div className="flex flex-col gap-6 lg:col-span-2">
        {/* Agenda */}
        <a
          href={SCHEDULE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-primary/10 to-transparent p-6 transition-colors hover:border-primary/40 md:p-8"
        >
          <div className="relative z-10 flex flex-col gap-2">
            <Calendar
              size={24}
              className="text-primary-text"
              aria-hidden="true"
            />
            <h2 className="font-space text-2xl font-black">
              {t('schedule.title')}
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              {t('schedule.desc')}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45"
          >
            <ArrowUpRight size={24} />
          </span>
        </a>

        {/* E-mail: o link abre o app de e-mail; o botão ao lado copia */}
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-linear-to-br from-white/10 to-transparent p-6 md:p-8">
          <div className="flex items-center gap-3">
            <Mail size={24} className="text-blue-400" aria-hidden="true" />
            <h2 className="font-space text-2xl font-bold">
              {t('email.label')}
            </h2>
          </div>
          <div className="flex items-center justify-between gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="min-h-11 break-all font-mono text-lg text-foreground/90 underline-offset-4 hover:underline flex items-center"
            >
              {CONTACT_EMAIL}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label={t('email.action')}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              {copied ? (
                <Check
                  size={18}
                  className="text-emerald-400"
                  aria-hidden="true"
                />
              ) : (
                <Copy size={18} aria-hidden="true" />
              )}
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('email.response_time')}
          </p>
        </div>
      </div>
    </div>
  );
}
