'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

interface PriorityNotificationProps {
  isVisible: boolean;
  onDismiss: () => void;
  mode: 'systems' | 'landing';
}

export function PriorityNotification({
  isVisible,
  onDismiss,
  mode
}: PriorityNotificationProps) {
  const t = useTranslations('Components.Pages.Home.ShapeShifter.Notification');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isVisible && !prefersReducedMotion) {
      const audio = new Audio('/assets/sounds/notification.mp3');
      audio.volume = 0.6;

      audio.play().catch((error) => {
        console.debug('Autoplay blocked or audio failed:', error);
      });
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto w-auto max-w-sm md:absolute md:bottom-auto md:left-auto md:right-6 md:top-6"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/80 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
            {/* Header da Notificação */}
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex gap-3">
                {/* Correção aqui: Container wrapper relativo sem overflow-hidden */}
                <div className="relative h-10 w-10 shrink-0">
                  {/* Container da imagem com overflow-hidden e borda */}
                  <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 shadow-sm">
                    <Image
                      src="https://github.com/gabriel-codesampaio.png"
                      alt="Gabriel Sampaio"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Indicador fora do overflow-hidden */}
                  <div className="absolute bottom-0 right-0 z-10 h-3 w-3 rounded-full border-2 border-black bg-green-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Gabriel Sampaio
                  </h4>
                  <p className="text-xs text-slate-400">
                    {t('time')} • {t('priority')}
                  </p>
                </div>
              </div>

              <button
                onClick={onDismiss}
                aria-label={t('actions.dismiss')}
                className="rounded-full p-1 text-slate-500 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Conteúdo Dinâmico */}
            <div className="mb-4 space-y-1">
              <h5 className="text-sm font-semibold text-slate-200">
                {t(`${mode}.title`)}
              </h5>
              <p className="text-xs leading-relaxed text-slate-400">
                {t(`${mode}.message`)}
              </p>
            </div>

            {/* Ações */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="h-9 w-full text-xs text-slate-400 hover:text-white hover:bg-white/5"
              >
                {t('actions.dismiss')}
              </Button>
              <Button
                size="sm"
                className="h-9 w-full bg-white text-black hover:bg-slate-200 text-xs font-bold gap-1.5"
                asChild
              >
                <Link href="/contact">
                  <Calendar size={12} />
                  {t('actions.cta')}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
