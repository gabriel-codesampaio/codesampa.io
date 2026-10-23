'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';

export const Cta = () => {
  const t = useTranslations('Pages.Projects');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-white/5 to-transparent p-8 md:p-16 text-center"
    >
      {/* Background Effects */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-blue-600/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="mb-6 font-space text-3xl font-black text-white md:text-5xl max-w-3xl leading-tight">
          {t.rich('cta_footer.title', {
            highlight: (chunks) => (
              <span className="text-primary-text">{chunks}</span>
            )
          })}
        </h2>

        <p className="mb-10 max-w-xl text-muted-foreground text-lg leading-relaxed">
          {t('cta_footer.subtitle')}
        </p>

        <Button
          asChild
          size="lg"
          className="group relative h-14 rounded-full px-10 text-base font-bold bg-foreground text-background hover:bg-white/90 transition hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
        >
          <Link href="/contact" className="flex items-center gap-2">
            {t('cta_footer.button')}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};
