'use client';

import { motion } from 'framer-motion';
import {
  CalendarCheck,
  ArrowRight,
  Check,
  Sparkles,
  LayoutGrid,
  FileText
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';

export function ScheduleSuccessView() {
  const t = useTranslations('Pages.Booking.Success');

  return (
    <div className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-background px-4 text-center">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl flex flex-col items-center"
      >
        {/* Ícone Animado */}
        <div className="relative mb-8 group">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, delay: 0.2 }}
            className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500/20 to-emerald-900/20 border border-emerald-500/50 backdrop-blur-md shadow-[0_0_30px_-10px_rgba(16,185,129,0.5)]"
          >
            <CalendarCheck className="h-10 w-10 text-emerald-400" />

            <motion.div
              initial={{ scale: 0, x: 20, y: 20 }}
              animate={{ scale: 1, x: 10, y: 10 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute bottom-0 right-0 bg-background rounded-full p-1 border border-border shadow-lg"
            >
              <div className="bg-emerald-500 rounded-full p-1">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            </motion.div>
          </motion.div>

          <Sparkles className="absolute -top-4 -right-4 text-yellow-300/60 animate-pulse w-6 h-6" />
          <Sparkles className="absolute -bottom-2 -left-6 text-purple-400/60 animate-pulse delay-75 w-4 h-4" />
        </div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-space text-4xl md:text-5xl font-black tracking-tight mb-4"
        >
          {t('title')}
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-lg mb-10 max-w-md leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        {/* Botões Verticais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col w-full max-w-xs gap-4"
        >
          {/* Botão Blog */}
          <div className="relative group w-full">
            <div className="absolute -inset-0.5 rounded-lg bg-linear-to-r from-emerald-500/50 to-cyan-500/50 opacity-20 group-hover:opacity-60 blur transition duration-500" />
            <Button
              className="relative w-full bg-background hover:bg-emerald-950/20 text-foreground border border-emerald-500/20 group-hover:border-emerald-500/50 h-12 justify-between px-6 backdrop-blur-md overflow-hidden transition-all"
              asChild
            >
              <Link href="/blog" className="flex items-center">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span className="font-space font-bold tracking-wide text-sm uppercase">
                    {t('button_blog')}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Botão Portfólio */}
          <div className="relative group w-full">
            <Button
              variant="ghost"
              className="w-full h-12 justify-between px-6 text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
              asChild
            >
              <Link href="/projects" className="flex items-center">
                <div className="flex items-center gap-3">
                  <LayoutGrid className="w-4 h-4" />
                  <span className="font-mono text-sm tracking-tight">
                    {t('button_portfolio')}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
