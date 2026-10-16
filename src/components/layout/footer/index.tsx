'use client';

import { useTranslations } from 'next-intl';

import { EncryptedText } from '@/components/ui/encrypted-text';
import { usePathname } from '@/lib/i18n/navigation';

export function Footer() {
  const t = useTranslations('Components.Layout.Footer');
  const currentYear = new Date().getFullYear();

  const pathname = usePathname();

  return (
    <footer className="relative w-full border-t border-white/5 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_15px_color-mix(in_oklab,var(--color-primary)_50%,transparent)]" />

      <div className="container mx-auto w-full px-6 h-14 border-t border-white/5 flex items-center justify-center md:justify-start">
        {/* Removido o "All Systems Operational": não havia status real por trás */}
        <p className="text-xs text-center text-muted-foreground font-mono">
          <EncryptedText
            key={pathname}
            text={`© ${currentYear} codesampa.io — ${t('rights')}`}
          />
        </p>
      </div>
    </footer>
  );
}
