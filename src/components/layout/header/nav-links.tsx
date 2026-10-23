'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/lib/i18n/navigation';
import { cn } from '@/utils/functions/tw-merge';

type NavLinkProps = {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  onLinkClick?: () => void;
};

export function NavLinks({
  className,
  orientation = 'horizontal',
  onLinkClick
}: NavLinkProps) {
  const t = useTranslations('Components.Layout.Header.nav');
  const pathname = usePathname();

  const links = [
    { href: '/', label: t('home') },
    { href: '/projects', label: t('projects') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') }
  ];

  return (
    <nav
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col gap-2' : 'items-center gap-1',
        className
      )}
    >
      {links.map((link) => {
        // Lógica de Ativo Corrigida
        const isActive =
          link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'group font-space relative flex items-center transition-colors',
              // Estilos Desktop (Horizontal)
              orientation === 'horizontal' && [
                'px-4 py-2 text-sm font-medium rounded-full',
                isActive
                  ? 'text-white/90'
                  : 'text-muted-foreground hover:text-foreground'
              ],
              // Estilos Mobile (Vertical)
              orientation === 'vertical' && [
                'py-4 text-3xl font-bold tracking-tight hover:text-primary-text transition-colors duration-300',
                isActive
                  ? 'text-foreground pl-4'
                  : 'text-muted-foreground/60 hover:pl-2'
              ]
            )}
          >
            {/* Efeito Spotlight (Desktop) */}
            {orientation === 'horizontal' && isActive && (
              <motion.span
                layoutId="desktop-nav-spotlight"
                className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.6
                }}
              />
            )}

            {/* Indicador Mobile para Item Ativo */}
            {orientation === 'vertical' && isActive && (
              <motion.span
                layoutId="mobile-nav-indicator"
                className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]"
              />
            )}

            <span className="relative z-10">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
