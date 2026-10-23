'use client';

import { motion, Variants } from 'framer-motion';
import { Terminal, Mouse, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AnimatedBadge } from '@/components/ui/animated-badge';
import { codeSymbols } from '@/utils/constants/code_symbols';
import useIsMobile from '@/utils/hooks/use-mobile';

import { FloatingSymbol } from './components';
import { HeroActions } from './hero-actions';

// Só coordena a cascata; sem opacity, para não esconder o título no primeiro paint
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98] as const
    }
  }
};

// Título e subtítulo nascem visíveis (só deslizam): com opacity 0 no HTML do
// servidor, o LCP esperava a hidratação inteira (~8 s em celular com rede lenta).
const textVariants: Variants = {
  hidden: { y: 20 },
  visible: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98] as const
    }
  }
};

export function HeroSection() {
  const t = useTranslations('Pages.Home.Hero');
  const isMobile = useIsMobile();

  const visibleSymbols = isMobile ? codeSymbols.slice(0, 8) : codeSymbols;

  return (
    <section className="relative flex min-h-[calc(100dvh-3.5rem)] w-full flex-col items-center justify-center pt-0 overflow-hidden bg-background text-foreground">
      {/* 1. Background Grid */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div
        className="absolute z-0 left-1/2 -translate-x-1/2 -translate-y-1/2 glow-primary opacity-40 pointer-events-none
        top-1/2 h-[820px] w-[820px]
        md:top-[40%] md:h-[1120px] md:w-[1120px]"
      />

      {/* 3. Ícones Voando */}
      <div className="absolute inset-0 z-0 w-full h-full flex justify-center pointer-events-none overflow-hidden">
        <div className="relative w-full h-full max-w-[1800px] opacity-60 md:opacity-100">
          {visibleSymbols.map((item, index) => (
            <FloatingSymbol key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* 4. Conteúdo Principal */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <AnimatedBadge>
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-primary-text" />
                <span>{t('badge')}</span>
              </div>
            </AnimatedBadge>
          </motion.div>

          {/* Título Principal */}
          <h1 className="font-space mb-6 flex flex-col items-center leading-[1.1]">
            <motion.span
              variants={textVariants}
              className="block mb-2 text-5xl md:text-8xl font-bold tracking-tight drop-shadow-2xl"
            >
              {t('title_prefix')}
            </motion.span>

            <motion.span variants={textVariants} className="block mt-2">
              <span className="text-primary-text font-bold tracking-tight text-5xl md:text-8xl">
                {t('mobile_title_suffix')}
              </span>
            </motion.span>
          </h1>

          {/* Subtítulo */}
          <motion.p
            variants={textVariants}
            className="max-w-xl text-lg text-muted-foreground mb-4 md:mb-8"
          >
            {t('subtitle')}
          </motion.p>

          {/* Novos Botões CTA */}
          <motion.div variants={itemVariants}>
            <HeroActions />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 md:bottom-10 flex flex-col items-center gap-3 text-muted-foreground pointer-events-none"
        >
          <span className="hidden md:flex text-xs uppercase tracking-widest font-mono opacity-80">
            {t('scroll_indicator')}
          </span>
          <div className="flex flex-col items-center gap-0.5 animate-scroll-hint">
            <Mouse className="h-6 w-6 opacity-80" />
            <ChevronDown className="h-4 w-4 opacity-60" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
