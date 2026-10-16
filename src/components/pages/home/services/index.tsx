'use client';

import { motion, Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/utils/functions/tw-merge';

import {
  SystemDevVisual,
  LandingPageVisual,
  AiIntegrationVisual
} from './service-visuals';

export function ServicesSection() {
  const t = useTranslations('Pages.Home.Services');

  const services = [
    {
      key: 'systems',
      visual: <SystemDevVisual />,
      accent: 'blue',
      delay: 0,
      link: '/projects?category=saas'
    },
    {
      key: 'landing',
      visual: <LandingPageVisual />,
      accent: 'emerald',
      delay: 0.1,
      link: '/projects?category=web'
    },
    {
      key: 'ai',
      visual: <AiIntegrationVisual />,
      accent: 'purple',
      delay: 0.2,
      // Ainda sem case de IA publicado: o CTA leva ao artigo e diz isso no texto
      link: '/blog/automating-reports-with-ai'
    }
  ];

  // Classes estáticas (o Tailwind não gera classes montadas com template string).
  // Tons 400: os 500 ficavam abaixo de 4,5:1 sobre o card escuro.
  const accentText: Record<string, string> = {
    blue: 'text-blue-400',
    emerald: 'text-emerald-400',
    purple: 'text-purple-400'
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: delay
      }
    }),
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <section className="relative bg-background overflow-hidden py-24 md:py-32">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header da Seção */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black font-space mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-muted-foreground text-lg"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Grid de Serviços */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {services.map((service) => {
            const title = t(`cards.${service.key}.title`);
            const desc = t(`cards.${service.key}.description`);

            // 4 itens por card: com 5, os três cards lado a lado viravam um muro de texto
            const features = [1, 2, 3, 4].map((n) =>
              t(`cards.${service.key}.feature${n}`)
            );

            const colorMap: Record<string, string> = {
              blue: 'group-hover:border-blue-500/50 hover:shadow-blue-500/10',
              emerald:
                'group-hover:border-emerald-500/50 hover:shadow-emerald-500/10',
              purple:
                'group-hover:border-purple-500/50 hover:shadow-purple-500/10'
            };

            return (
              <motion.div
                key={service.key}
                custom={service.delay}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: '-50px' }}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card',
                  'transition-colors duration-300 hover:shadow-2xl',
                  colorMap[service.accent]
                )}
              >
                {/* Visual Header */}
                <div className="h-48 w-full border-b border-border bg-muted/20 relative overflow-hidden">
                  {service.visual}
                </div>

                {/* Conteúdo */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-bold font-space mb-3">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {desc}
                  </p>

                  {/* Lista de Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm font-medium text-foreground/80"
                      >
                        <CheckCircle2
                          size={16}
                          className={cn(
                            'mt-0.5 shrink-0',
                            accentText[service.accent]
                          )}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <Link
                      href={service.link}
                      className={cn(
                        'flex min-h-11 items-center gap-2 text-sm font-bold underline-offset-4 transition-colors hover:underline',
                        accentText[service.accent]
                      )}
                    >
                      {t(`cards.${service.key}.cta`)} <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
