'use client';

import { motion } from 'framer-motion';
import {
  Signal,
  Wifi,
  BatteryMedium,
  Globe,
  Menu,
  Zap,
  Check,
  BarChart3,
  MousePointer2,
  ArrowRight
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export function LandingPageMobileMock() {
  const t = useTranslations('Components.Pages.Home.ShapeShifter.Mock');

  // Wireframe decorativo do 'site da sua empresa': oculto do leitor de tela
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex aspect-[9/19] h-[70vh] max-h-[700px] w-full max-w-[340px] flex-col overflow-hidden rounded-[2.5rem] border-[8px] border-[#1a1a1a] bg-[#0A0A0A] shadow-2xl ring-1 ring-white/10 select-none font-sans"
    >
      {/* --- STATUS BAR (iOS Style) --- */}
      <div className="absolute top-0 z-40 flex h-12 w-full items-end justify-between px-6 pb-2 pointer-events-none">
        <span className="text-[10px] font-medium text-white/90">9:41</span>

        {/* Notch */}
        <div className="absolute left-1/2 top-0 flex h-6 w-28 -translate-x-1/2 items-end justify-center rounded-b-[14px] bg-[#1a1a1a]">
          <div className="mb-1.5 h-1 w-12 rounded-full bg-white/10" />
        </div>

        <div className="flex gap-1.5 text-white">
          <Signal size={12} />
          <Wifi size={12} />
          <BatteryMedium size={12} />
        </div>
      </div>

      {/* --- CONTEÚDO SCROLLÁVEL --- */}
      <div className="flex flex-1 flex-col overflow-hidden bg-[#0A0A0A] relative w-full">
        {/* Background Grid & Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-blue-600/10 blur-[80px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />

        {/* Navbar (Site Header) */}
        <div className="relative z-20 flex shrink-0 items-center justify-between px-6 pb-4 pt-14 border-b border-white/5 backdrop-blur-sm bg-black/20">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <Globe size={12} className="text-white" />
            </div>
            <div className="h-2 w-16 rounded-full bg-white/20" />
          </div>
          <Menu size={20} className="text-white/60" />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden relative p-6 flex flex-col items-start gap-6 pt-6">
          {/* 1. Badge "New Release" (CENTRALIZADO) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} // Animação de y fica melhor centralizado
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            // Adicionado "self-center" para centralizar horizontalmente no flex column
            className="flex w-fit self-center items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 backdrop-blur-sm"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
            <span className="text-[9px] font-bold text-primary-text tracking-widest uppercase">
              {t('badge')}
            </span>
          </motion.div>

          {/* 2. Headline Skeletons */}
          <div className="space-y-3 w-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'circOut' }}
              className="h-8 w-full rounded-lg bg-gradient-to-r from-white via-white to-white/40"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'circOut' }}
              className="h-8 w-full rounded-lg bg-gradient-to-r from-white via-white to-white/40"
            />
          </div>

          {/* 3. Paragraph Skeletons */}
          <div className="space-y-2 w-full py-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-2 w-full rounded bg-white/10"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="h-2 w-5/6 rounded bg-white/10"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="h-2 w-4/6 rounded bg-white/10"
            />
          </div>

          {/* 4. CTA Buttons */}
          <div className="flex w-full gap-3">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="h-9 px-5 flex-1 rounded-lg bg-white text-black font-bold text-[10px] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              {t('cta_primary')} <ArrowRight size={10} />
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="h-9 px-4 rounded-lg border border-white/10 bg-white/5 text-white/70 font-bold text-[10px] flex items-center justify-center"
            >
              Docs
            </motion.div>
          </div>

          {/* 5. VISUAL ELEMENT */}
          <div className="relative w-full mt-auto mb-2 aspect-[4/3]">
            {/* Main Window (Zap Card) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="absolute inset-0 rounded-xl border border-white/10 bg-[#121212]/90 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Window Header */}
              <div className="h-8 border-b border-white/5 flex items-center px-3 justify-between bg-white/2">
                <div className="flex gap-2">
                  <div className="h-1.5 w-12 rounded bg-white/20" />
                </div>
                <div className="h-5 w-5 rounded bg-primary/20 flex items-center justify-center">
                  <Zap size={8} className="text-primary-text" />
                </div>
              </div>

              {/* Window Content */}
              <div className="p-3 flex flex-col h-full justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded bg-white/10" />
                    <div className="h-1.5 w-full rounded bg-white/5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded bg-white/10" />
                    <div className="h-1.5 w-2/3 rounded bg-white/5" />
                  </div>
                </div>

                {/* Animated Chart */}
                <div className="h-20 w-full rounded bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/10 relative overflow-hidden flex items-end justify-between px-2 pb-1">
                  {[30, 50, 40, 70, 50, 80, 60].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                      className="w-2.5 rounded-t-[1px] bg-primary/40"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-2 -top-4 w-28 p-2 rounded-lg border border-white/10 bg-[#1A1A1A] shadow-xl flex items-center gap-2 z-20 scale-90"
            >
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                <Check size={8} />
              </div>
              <div className="space-y-1 w-full">
                <div className="h-1 w-8 rounded bg-white/40" />
                <div className="h-1 w-full rounded bg-white/10" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5
              }}
              className="absolute -left-3 bottom-8 w-24 p-2 rounded-lg border border-white/10 bg-[#1A1A1A] shadow-xl z-20 scale-90"
            >
              <div className="flex justify-between items-end mb-1.5">
                <BarChart3 size={10} className="text-blue-400" />
                <span className="text-[6px] text-green-400 font-mono">
                  +24%
                </span>
              </div>
              <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: ['30%', '70%', '30%'] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: [0, 40, 0], y: [0, -20, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1
              }}
              className="absolute bottom-2 right-12 z-30"
            >
              <div className="relative">
                <MousePointer2
                  size={16}
                  className="fill-pink-500 text-pink-600 stroke-[1.5]"
                />
                <div className="absolute top-4 left-2 bg-pink-500 text-white text-[6px] font-bold px-1 py-0.5 rounded shadow-sm whitespace-nowrap">
                  User
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- HOME INDICATOR --- */}
      <div className="absolute bottom-2 left-1/2 z-50 h-1 w-24 -translate-x-1/2 rounded-full bg-white/20 backdrop-blur-md" />
    </div>
  );
}
