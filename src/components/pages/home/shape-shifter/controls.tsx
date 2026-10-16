'use client';

import { motion } from 'framer-motion';
import { Monitor, Smartphone, RotateCcw, Lock, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/utils/functions/tw-merge';
import { useHomeStore } from '@/utils/stores/home-store'; // Importando a store

interface ControlsProps {
  currentMode: 'desktop' | 'mobile';
  setMode: (m: 'desktop' | 'mobile') => void;
  onReplay: () => void;
  isMobileDevice: boolean;
  isVisible: boolean;
  // Removidas as props: suggestionLabel e onToggleMode
}

export function ShapeShifterControls({
  currentMode,
  setMode,
  onReplay,
  isMobileDevice,
  isVisible
}: ControlsProps) {
  const t = useTranslations('Components.Pages.Home.ShapeShifter.Controls');
  const { mode, toggleMode } = useHomeStore();

  const suggestionLabel =
    mode === 'systems' ? t('suggest_landing') : t('suggest_systems');

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      className="w-full max-w-6xl relative z-40 flex flex-row justify-between items-center mt-6"
    >
      <div className="w-full flex-1 flex items-center justify-center gap-2">
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/80 p-1.5 shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
          <button
            onClick={() => !isMobileDevice && setMode('desktop')}
            disabled={isMobileDevice}
            aria-pressed={currentMode === 'desktop'}
            aria-label={t('desktop')}
            className={cn(
              'relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300',
              currentMode === 'desktop'
                ? 'text-white'
                : 'text-slate-500 hover:text-slate-300',
              isMobileDevice && 'opacity-30 cursor-not-allowed'
            )}
          >
            {currentMode === 'desktop' && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/5"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Monitor size={14} className="relative z-10" />
            <span className="relative z-10 hidden sm:inline">Desktop</span>
            {isMobileDevice && (
              <Lock
                size={10}
                className="absolute -right-1 -top-1 text-slate-500"
              />
            )}
          </button>

          {/* Separator */}
          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Botão Mobile */}
          <button
            onClick={() => setMode('mobile')}
            aria-pressed={currentMode === 'mobile'}
            aria-label={t('mobile')}
            className={cn(
              'relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300',
              currentMode === 'mobile'
                ? 'text-white'
                : 'text-slate-500 hover:text-slate-300'
            )}
          >
            {currentMode === 'mobile' && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/5"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Smartphone size={14} className="relative z-10" />
            <span className="relative z-10 hidden sm:inline">Mobile</span>
          </button>
        </div>

        <button
          onClick={onReplay}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/80 text-slate-400 backdrop-blur-xl transition-all hover:bg-white/10 hover:text-white active:scale-95 group"
          title={t('replay')}
          aria-label={t('replay')}
        >
          <RotateCcw
            size={16}
            className="transition-transform duration-500 group-hover:-rotate-180"
          />
        </button>
      </div>

      <button
        onClick={toggleMode}
        className="group flex items-center gap-2 rounded-full border border-white/5 bg-white/5 min-h-11 px-4 text-xs font-medium text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
      >
        <span>{t('see_also')}</span>
        <span className="text-white underline decoration-white/30 underline-offset-4 group-hover:decoration-white/80 transition-all">
          {suggestionLabel}
        </span>
        <ArrowRight
          size={10}
          className="ml-0.5 transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </motion.div>
  );
}
