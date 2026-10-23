'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Link } from '@/lib/i18n/navigation';
import { CONTACT_EMAIL } from '@/utils/constants/contact';

export function ReadyToBuildSection() {
  const t = useTranslations('Pages.Home.ReadyToBuild');
  const [particles, setParticles] = useState<
    Array<{ left: string; duration: number; delay: number }>
  >([]);

  // Gera as partículas apenas no cliente para evitar Hydration Mismatch
  useEffect(() => {
    const generatedParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 5 + 10,
      delay: Math.random() * 5
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section className="relative flex min-h-[60svh] flex-col items-center justify-center overflow-hidden border-t border-white/5 bg-background py-24">
      {/* === BACKGROUND EFFECTS === */}
      {/* Grid Sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Glow Central (Aurora) */}
      <div className="absolute -top-[240px] left-1/2 -translate-x-1/2 w-[calc(100%+480px)] h-[880px] glow-primary pointer-events-none opacity-[0.08]" />

      {/* Particles/Stars (Opcional - pontos flutuantes) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/40 rounded-full h-1 w-1"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: -100 }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear'
            }}
            style={{
              left: p.left,
              top: '80%'
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-6 text-center">
        {/* Título Principal */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-6 max-w-3xl font-space text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl"
        >
          {t.rich('title', {
            highlight: (chunks) => (
              <span className="text-primary-text">{chunks}</span>
            ),
            br: () => <br />
          })}
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground"
        >
          {t('subtitle')}
        </motion.p>

        {/* Botão CTA Principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-foreground px-8 py-2 transition hover:scale-105 hover:bg-primary/90"
          >
            {/* Efeito de brilho no botão */}
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

            <Terminal className="h-5 w-5 text-background" />
            <span className="font-space text-lg font-bold text-background">
              {t('cta')}
            </span>
            <ArrowRight className="h-5 w-5 text-background transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Link Secundário (Opcional) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <p className="text-xs text-muted-foreground">
            {t('note')}{' '}
            <span className="text-foreground font-mono">{CONTACT_EMAIL}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
