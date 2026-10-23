'use client';

import { motion, Variants } from 'framer-motion';
import { Terminal, Mouse, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { BracketSelector } from '@/components/pages/home/hero/bracket-selector';
import { FloatingSymbol } from '@/components/pages/home/hero/components';
import { HeroActions } from '@/components/pages/home/hero/hero-actions';
import { AnimatedBadge } from '@/components/ui/animated-badge';
import { codeSymbols } from '@/utils/constants/code_symbols';
import useIsMobile from '@/utils/hooks/use-mobile';

type HeroMode = 'systems' | 'landing';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
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

// Recordação da HeroSection original com o seletor < > (Sistemas Complexos / Landing Pages).
export function HeroShowcaseSection() {
  const t = useTranslations('Pages.Home.Hero');
  const isMobile = useIsMobile();
  const [mode, setMode] = useState<HeroMode>('systems');

  const visibleSymbols = isMobile ? codeSymbols.slice(0, 8) : codeSymbols;

  const toggleMode = () => {
    setMode((current) => (current === 'systems' ? 'landing' : 'systems'));
  };

  return (
    <section className="relative flex min-h-[calc(100dvh-3.5rem)] w-full flex-col items-center justify-center pt-0 overflow-hidden bg-background text-foreground md:min-h-dvh">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div
        className="absolute z-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40
        top-1/2 h-[500px] w-[500px] blur-[80px]
        md:top-[40%] md:h-[600px] md:w-[600px] md:blur-[130px]"
      />

      <div className="absolute inset-0 z-0 w-full h-full flex justify-center pointer-events-none overflow-hidden">
        <div className="relative w-full h-full max-w-[1800px] opacity-60 md:opacity-100">
          {visibleSymbols.map((item, index) => (
            <FloatingSymbol key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <AnimatedBadge>
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-primary-text" />
                <span>{t('badge')}</span>
              </div>
            </AnimatedBadge>
          </motion.div>

          <h1 className="font-space mb-6 flex flex-col items-center leading-[1.1]">
            <motion.span
              variants={itemVariants}
              className="block mb-2 text-5xl md:text-8xl font-black tracking-tight drop-shadow-2xl"
            >
              {t('title_prefix')}
            </motion.span>

            <motion.div variants={itemVariants}>
              {isMobile ? (
                <span className="block mt-2">
                  <span className="bg-linear-to-r from-primary-text via-blue-300 to-violet-600 bg-clip-text text-transparent font-black tracking-tight text-5xl">
                    {t('mobile_title_suffix')}
                  </span>
                </span>
              ) : (
                <BracketSelector
                  text={
                    mode === 'systems' ? t('title_suffix') : 'Landing Pages'
                  }
                  onToggle={toggleMode}
                  onScroll={toggleMode}
                />
              )}
            </motion.div>
          </h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-lg text-muted-foreground mb-4 md:mb-8"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div variants={itemVariants}>
            <HeroActions />
          </motion.div>
        </motion.div>
      </div>

      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 md:bottom-10 flex flex-col items-center gap-3 text-slate-400 pointer-events-none"
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
