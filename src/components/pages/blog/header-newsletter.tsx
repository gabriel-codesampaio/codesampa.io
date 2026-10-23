'use client';

import { subscribeToNewsletter } from '@/app/actions/newsletter';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, Terminal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { cn } from '@/utils/functions/tw-merge';

export function HeaderNewsletter() {
  const t = useTranslations('Components.Pages.Blog.Newsletter');
  const [email, setEmail] = useState('');
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  // Momento em que o formulário apareceu: o servidor descarta envios rápidos demais
  const [renderedAt] = useState(() => Date.now());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    const honeypot = new FormData(e.currentTarget).get('company') ?? '';

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('company', honeypot);
        formData.append('rendered_at', String(renderedAt));
        const result = await subscribeToNewsletter(null, formData);

        if (result?.success) {
          setStatus('success');
          setStatusMessage(t('messages.success'));
          toast.success(t('messages.success'));
          setEmail('');
        } else {
          const message = result?.message || t('messages.error');
          setStatus('error');
          setStatusMessage(message);
          toast.error(message);
        }
      } catch (error) {
        setStatus('error');
        setStatusMessage(t('messages.critical_error'));
        toast.error(t('messages.critical_error'));
      }
      setTimeout(() => setStatus('idle'), 3000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-card/30 p-5 md:p-6 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-card/40"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Lado Esquerdo */}
        <div className="flex flex-col gap-2 md:max-w-lg">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-primary-text" />
            <h3
              id="newsletter-heading"
              className="text-lg font-bold font-space text-foreground md:text-xl"
            >
              {t('title_prefix')}{' '}
              <span className="text-primary-text">{t('title_highlight')}</span>
            </h3>
          </div>
          <p className="text-sm text-muted-foreground/80 leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Lado Direito */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-stretch gap-2 md:w-auto md:min-w-[340px]"
        >
          {/* Campo-isca: invisível para pessoas, preenchido por robôs */}
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] h-px w-px overflow-hidden"
          >
            <label>
              {t('honeypot_label')}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <div className="relative flex-1">
            <input
              type="email"
              name="email"
              autoComplete="email"
              spellCheck={false}
              aria-labelledby="newsletter-heading"
              aria-invalid={status === 'error'}
              aria-describedby="newsletter-status"
              placeholder={t('placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending || status === 'success'}
              className="h-11 w-full rounded-lg border border-muted-foreground/60 bg-black/20 px-3 text-sm text-white placeholder:text-muted-foreground/50 outline-none focus-visible:border-primary-text focus-visible:ring-2 focus-visible:ring-primary-text/60 transition-[border-color,box-shadow] font-mono"
              required
            />
            <span
              id="newsletter-status"
              role="status"
              aria-live="polite"
              className="sr-only"
            >
              {statusMessage}
            </span>
          </div>

          <button
            type="submit"
            disabled={isPending || status === 'success'}
            className={cn(
              'flex h-11 items-center justify-center rounded-lg px-4 text-sm font-bold uppercase tracking-wider transition min-w-[100px]',
              status === 'success'
                ? 'bg-success/20 text-success-soft border border-success/50'
                : 'bg-primary text-white hover:bg-primary/90 hover:shadow-[0_0_15px_color-mix(in_oklab,var(--color-primary)_30%,transparent)]'
            )}
          >
            <AnimatePresence mode="wait">
              {isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : status === 'success' ? (
                <CheckCircle2 size={16} />
              ) : (
                <div className="flex items-center gap-1">
                  <span>{t('button_label')}</span>
                  <ArrowRight size={14} />
                </div>
              )}
            </AnimatePresence>
          </button>
        </form>
      </div>
    </motion.div>
  );
}
