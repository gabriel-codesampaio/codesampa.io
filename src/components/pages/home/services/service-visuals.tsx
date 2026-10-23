'use client';

import { motion } from 'framer-motion';
import {
  Smartphone,
  Monitor,
  Search,
  BarChart3,
  Rocket,
  Bot,
  MessageSquare,
  Zap,
  Globe,
  Code2
} from 'lucide-react';
import { useTranslations } from 'next-intl';

// 1. DESENVOLVIMENTO DE SISTEMAS
// Visual: Sincronia entre Mobile e Desktop
export const SystemDevVisual = () => (
  <div className="relative flex h-full w-full items-center justify-center bg-blue-950/20 overflow-hidden rounded-t-xl">
    {/* Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-blue-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-blue-500)_1px,transparent_1px)] bg-size-[30px_30px] opacity-10" />

    {/* Monitor Desktop */}
    <motion.div
      className="absolute left-10 top-12 h-32 w-48 rounded-lg border-2 border-blue-500/30 bg-background/80 shadow-2xl backdrop-blur-sm"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="h-4 w-full border-b border-blue-500/20 bg-muted/50 px-2 flex items-center gap-1">
        <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
        <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
      </div>
      <div className="p-3 space-y-2">
        <div className="h-2 w-1/3 rounded bg-blue-500/20" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-16 rounded bg-muted/50" />
          <div className="h-16 rounded bg-muted/50" />
        </div>
      </div>
    </motion.div>

    {/* Smartphone Flutuante */}
    <motion.div
      className="absolute right-12 bottom-8 h-40 w-20 rounded-3xl border-4 border-blue-500 bg-background shadow-[0_0_30px_rgba(59,130,246,0.3)] z-10 overflow-hidden"
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      animate={{ y: [0, -5, 0] }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-12 rounded-b-lg bg-blue-500" />
      <div className="mt-8 p-2 space-y-2">
        <motion.div
          className="h-8 rounded bg-blue-500/20"
          animate={{ width: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
        <div className="h-20 rounded bg-muted/30" />
      </div>
    </motion.div>

    {/* Linha de Conexão */}
    <motion.div
      className="absolute left-32 top-24 h-24 w-24 border-t-2 border-r-2 border-blue-400/30 rounded-tr-3xl"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
    />
  </div>
);

// 2. LANDING PAGES & SEO
// Visual: Foguete subindo + Score 100
export const LandingPageVisual = () => (
  <div className="relative flex h-full w-full flex-col items-center justify-center bg-emerald-950/20 overflow-hidden rounded-t-xl">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-emerald-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-emerald-500)_1px,transparent_1px)] bg-size-[30px_30px] opacity-10" />

    {/* Card de SEO Flutuante */}
    <motion.div
      className="relative z-10 flex flex-col items-center gap-2 rounded-xl border border-emerald-500/30 bg-background/90 p-4 shadow-2xl"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center gap-2 text-emerald-400">
        <Globe size={16} />
        <span className="text-xs font-bold">SEO OPTIMIZED</span>
      </div>
      <div className="flex gap-3 mt-2">
        {['100', '100', '100', '100'].map((score, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-500 text-[10px] font-bold text-emerald-500">
              {score}
            </div>
            <div className="h-1 w-6 rounded bg-emerald-500/20" />
          </div>
        ))}
      </div>
    </motion.div>

    {/* Foguete de Conversão */}
    <motion.div
      className="absolute right-4 top-10 text-emerald-500/20"
      animate={{ y: [-10, -30], opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Rocket size={40} />
    </motion.div>

    {/* Gráfico de Vendas */}
    <motion.div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
      <svg
        aria-hidden="true"
        viewBox="0 0 100 40"
        className="h-full w-full fill-emerald-500/50 stroke-emerald-500"
      >
        <path d="M0,40 Q25,40 50,20 T100,5 V40 H0 Z" />
      </svg>
    </motion.div>
  </div>
);

// 3. INTEGRAÇÃO DE IA
// Visual: Chatbot processando dados
export const AiIntegrationVisual = () => {
  const t = useTranslations('Pages.Home.Services.cards.ai.visual');

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-purple-950/20 overflow-hidden rounded-t-xl">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-purple-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-purple-500)_1px,transparent_1px)] bg-size-[30px_30px] opacity-10" />

      {/* Cérebro Central */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 text-purple-500/20"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Bot size={80} />
      </motion.div>

      {/* Interface de Chat Flutuante */}
      <motion.div
        className="relative z-10 w-64 rounded-xl border border-purple-500/30 bg-background/90 p-3 shadow-2xl"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
      >
        <div className="flex flex-col gap-2">
          {/* Mensagem Usuário - Traduzida */}
          <div className="self-end rounded-lg rounded-tr-none bg-purple-500/20 p-2 text-[10px] text-purple-200">
            {t('user_query')}
          </div>

          {/* Resposta IA (Digitando) - Traduzida */}
          <div className="self-start flex gap-2 rounded-lg rounded-tl-none bg-muted p-2 text-[10px]">
            <Zap size={12} className="text-yellow-400 fill-yellow-400 mt-0.5" />
            <div className="space-y-1">
              <p>{t('bot_processing')}</p>
              <motion.div
                className="h-1 w-20 rounded bg-purple-500"
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Partículas de Conexão */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-purple-400"
          style={{
            left: `${20 + i * 15}%`,
            top: '40%'
          }}
          animate={{ y: [0, 50], opacity: [1, 0] }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
        />
      ))}
    </div>
  );
};
