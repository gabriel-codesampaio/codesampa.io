'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// A seção só aparece a partir de lg (`hidden lg:flex`): abaixo disso o mockup
// fica espremido. O JS dela (~1.700 linhas de mockups + trechos de código)
// também só é pedido nessas telas, e não no celular nem no tablet.
const ShapeShifterSection = dynamic(
  () => import('./index').then((m) => m.ShapeShifterSection),
  { ssr: false }
);

const DESKTOP_QUERY = '(min-width: 1024px)';

export function LazyShapeShifter() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isDesktop ? <ShapeShifterSection /> : null;
}
