'use client';

import { motion } from 'framer-motion';
import {
  Lock,
  Zap,
  MousePointer2,
  BarChart3,
  Globe,
  Check,
  ArrowRight
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export function LandingPageDesktopMock() {
  const t = useTranslations('Components.Pages.Home.ShapeShifter.Mock');

  // Wireframe decorativo do 'site da sua empresa': oculto do leitor de tela
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#09090b] ring-1 ring-white/10 shadow-2xl font-sans select-none"
    >
      {/* === NOISE TEXTURE OVERLAY === */}
      {/* Esta camada adiciona a granulação estilo 'filme' sobre todo o componente */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* --- Browser Chrome --- */}
      <div className="flex h-10 shrink-0 items-center gap-4 border-b border-white/5 bg-black/40 px-4 backdrop-blur-md z-30 relative">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex h-6 w-full max-w-[240px] items-center justify-center rounded-md border border-white/5 bg-white/5 px-3 text-[9px] text-muted-foreground/60 font-mono transition-colors hover:bg-white/10 hover:text-muted-foreground/80">
          <Lock size={8} className="mr-1.5 opacity-50" />
          {t('domain')}
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="relative flex-1 overflow-hidden bg-[#0A0A0A] z-10">
        {/* Background Gradients (Ambient Lighting) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        {/* --- Navbar Mock --- */}
        <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 border-b border-white/5 bg-black/20 backdrop-blur-sm z-20">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <Globe size={12} className="text-white" />
            </div>
            <div className="h-2 w-16 rounded-full bg-white/20" />
          </div>
          <div className="hidden md:flex gap-6">
            <div className="h-1.5 w-10 rounded-full bg-white/10" />
            <div className="h-1.5 w-10 rounded-full bg-white/10" />
            <div className="h-1.5 w-10 rounded-full bg-white/10" />
          </div>
          <div className="h-8 w-20 rounded-md bg-white/5 border border-white/5 flex items-center justify-center transition-colors hover:bg-white/10">
            <div className="h-1.5 w-8 rounded-full bg-white/30" />
          </div>
        </div>

        {/* --- 2-Column Hero Section --- */}
        <div className="relative h-full grid grid-cols-12 gap-4 px-8 pt-20 pb-8 items-center">
          {/* LEFT: Text & CTA */}
          <div className="col-span-12 md:col-span-5 flex flex-col justify-center gap-6 z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 backdrop-blur-sm"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
              <span className="text-[9px] font-bold text-primary-text tracking-widest uppercase">
                {t('badge')}
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'circOut' }}
                className="h-10 md:h-12 w-full rounded-lg bg-gradient-to-r from-white via-white to-white/40"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ delay: 0.4, duration: 0.8, ease: 'circOut' }}
                className="h-10 md:h-12 w-full rounded-lg bg-gradient-to-r from-white via-white to-white/40"
              />
            </div>

            {/* Subtext */}
            <div className="space-y-2 py-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="h-2.5 w-full rounded bg-white/10"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="h-2.5 w-5/6 rounded bg-white/10"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="h-2.5 w-4/6 rounded bg-white/10"
              />
            </div>

            {/* Buttons & Social Proof */}
            <div className="space-y-6">
              <div className="flex gap-3">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="h-10 px-6 rounded-lg bg-white text-black font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform"
                >
                  {t('cta_primary')} <ArrowRight size={12} />
                </motion.div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="h-10 px-6 rounded-lg border border-white/10 bg-white/5 text-white/70 font-bold text-xs flex items-center hover:bg-white/10 transition-colors"
                >
                  {t('cta_secondary')}
                </motion.div>
              </div>

              {/* Avatars */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-6 w-6 rounded-full border-2 border-[#0A0A0A] bg-white/10"
                    />
                  ))}
                </div>
                <div className="h-2 w-24 rounded bg-white/10" />
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Visual Mock (3D Composition) */}
          <div className="col-span-12 md:col-span-7 relative h-full hidden md:flex items-center justify-center perspective-1000">
            <motion.div
              initial={{ rotateY: -15, rotateX: 5, scale: 0.9, opacity: 0 }}
              animate={{ rotateY: -10, rotateX: 5, scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.2, type: 'spring' }}
              className="relative w-full max-w-[450px] aspect-[4/3] transform-style-3d"
            >
              {/* Main Dashboard Card */}
              <div className="absolute inset-0 rounded-xl border border-white/10 bg-[#121212]/90 backdrop-blur-xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden">
                {/* Card Header */}
                <div className="h-10 border-b border-white/5 flex items-center px-4 justify-between bg-white/2">
                  <div className="flex gap-3">
                    <div className="h-2 w-16 rounded bg-white/20" />
                    <div className="h-2 w-10 rounded bg-white/5" />
                    <div className="h-2 w-10 rounded bg-white/5" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-6 rounded bg-primary/20 flex items-center justify-center">
                      <Zap size={10} className="text-primary-text" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 grid grid-cols-3 gap-4 h-full">
                  {/* Sidebar */}
                  <div className="col-span-1 space-y-3 border-r border-white/5 pr-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded bg-white/10" />
                        <div
                          className={`h-2 rounded bg-white/${
                            i === 1 ? '30' : '5'
                          } w-full`}
                        />
                      </div>
                    ))}
                    <div className="mt-8 h-20 rounded bg-white/5 border border-white/5" />
                  </div>

                  {/* Charts */}
                  <div className="col-span-2 space-y-4">
                    <div className="h-24 w-full rounded bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/10 relative overflow-hidden">
                      {/* Chart Bars */}
                      <div className="absolute bottom-0 left-0 right-0 h-12 flex items-end justify-between px-2 pb-2">
                        {[30, 50, 40, 70, 50, 80, 60].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                            className="w-3 rounded-t-sm bg-primary/40"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-20 rounded bg-white/5 border border-white/5" />
                      <div className="h-20 rounded bg-white/5 border border-white/5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements (Orbiting) */}

              {/* 1. Success Notification */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute -right-6 top-8 w-40 p-2.5 rounded-lg border border-white/10 bg-[#1A1A1A] shadow-xl flex items-center gap-3 z-20"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                  <Check size={12} />
                </div>
                <div className="space-y-1.5 w-full">
                  <div className="h-1.5 w-12 rounded bg-white/40" />
                  <div className="h-1.5 w-full rounded bg-white/10" />
                </div>
              </motion.div>

              {/* 2. User Stats */}
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
                className="absolute -left-8 bottom-12 w-32 p-3 rounded-lg border border-white/10 bg-[#1A1A1A] shadow-xl z-20"
              >
                <div className="flex justify-between items-end mb-2">
                  <BarChart3 size={14} className="text-blue-400" />
                  <span className="text-[8px] text-green-400 font-mono">
                    +24%
                  </span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: ['30%', '70%', '30%'] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
              </motion.div>

              {/* 3. Cursor Interaction */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: [0, 80, 0], y: [0, -40, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }}
                className="absolute bottom-4 right-1/4 z-30"
              >
                <div className="relative">
                  <MousePointer2
                    size={20}
                    className="fill-pink-500 text-pink-600 stroke-[1.5]"
                  />
                  <div className="absolute top-6 left-2 bg-pink-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                    User
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
