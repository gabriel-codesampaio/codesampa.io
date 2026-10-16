'use client';

import { MotionGlobalConfig } from 'framer-motion';
import { useEffect } from 'react';

// O MotionConfig reducedMotion="user" só desliga transformações: as animações
// de opacidade em loop (repeat: Infinity) continuavam rodando. Com skipAnimations
// todas vão direto para o estado final para quem pede movimento reduzido.
const query = '(prefers-reduced-motion: reduce)';

// Definido na carga do módulo, antes da hidratação, para valer já nas
// animações de entrada (um useEffect rodaria depois que elas começassem).
if (typeof window !== 'undefined') {
  MotionGlobalConfig.skipAnimations = window.matchMedia(query).matches;
}

export function ReducedMotion() {
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => {
      MotionGlobalConfig.skipAnimations = media.matches;
    };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return null;
}
