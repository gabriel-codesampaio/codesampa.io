'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { cn } from '@/utils/functions/tw-merge';

export function ManifestoSection() {
  const t = useTranslations('Components.Pages.Home.Manifesto');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.4', 'end 0.7']
  });

  // Com movimento reduzido o texto aparece inteiro (sem revelação por rolagem,
  // que deixaria as palavras com 10% de opacidade até o usuário rolar)
  const reduceMotion = useReducedMotion();

  // Texto dividido em palavras para animação individual
  const words = t('text').split(' ');

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center bg-background py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="relative text-2xl md:text-4xl font-bold font-space leading-snug text-center">
            {/* Frase inteira para leitor de tela: os spans animados não têm
                espaços no texto e eram lidos como uma palavra só */}
            <span className="sr-only">{t('text').replace(/\*/g, '')}</span>
            <span
              aria-hidden="true"
              className="flex flex-wrap justify-center gap-x-2 gap-y-1 md:gap-x-3 md:gap-y-2"
            >
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;

                return (
                  <Word
                    key={i}
                    range={[start, end]}
                    progress={scrollYProgress}
                    static={!!reduceMotion}
                  >
                    {word}
                  </Word>
                );
              })}
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}

// Componente Auxiliar para cada Palavra
const Word = ({
  children,
  range,
  progress,
  static: isStatic
}: {
  children: string;
  range: [number, number];
  static: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any;
}) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [10, 0]);

  // Verifica se é uma palavra de destaque
  const isHighlight = children.includes('*');
  const text = children.replace(/\*/g, '');

  return (
    <span className="relative inline-block">
      <motion.span
        style={isStatic ? undefined : { opacity, y }}
        className={cn(
          'transition-colors duration-200',
          isHighlight ? 'text-primary-text font-black' : 'text-foreground'
        )}
      >
        {text}
      </motion.span>
    </span>
  );
};
