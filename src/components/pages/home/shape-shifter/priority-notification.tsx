'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { SCHEDULE_URL } from '@/utils/constants/contact';

interface PriorityNotificationProps {
  isVisible: boolean;
  onDismiss: () => void;
  mode: 'systems' | 'landing';
}

// Aviso de agenda aberta. Antes simulava uma mensagem recebida ("Há 1 min",
// "Prioridade Alta", som de notificação); agora é um convite direto e verdadeiro.
export function PriorityNotification({
  isVisible,
  onDismiss,
  mode
}: PriorityNotificationProps) {
  const t = useTranslations('Components.Pages.Home.ShapeShifter.Notification');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          aria-label={t('label')}
          className="absolute right-6 top-6 z-50 w-auto max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="relative rounded-2xl border border-white/15 bg-card p-5 shadow-2xl">
            <button
              type="button"
              onClick={onDismiss}
              aria-label={t('actions.dismiss')}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={16} aria-hidden="true" />
            </button>

            <p className="mb-1 pr-10 font-space text-base font-bold text-white">
              {t(`${mode}.title`)}
            </p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {t(`${mode}.message`)}
            </p>

            <Button
              size="sm"
              className="h-11 w-full gap-2 bg-white text-sm font-bold text-black hover:bg-slate-200"
              asChild
            >
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                <Calendar size={16} aria-hidden="true" />
                {t('actions.cta')}
              </a>
            </Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
