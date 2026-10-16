import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link } from '@/lib/i18n/navigation';

// Prova logo depois do hero: clientes reais, print do produto e o resultado
// em uma frase. Os textos ficam em Pages.Home.Cases.items.<key>.
const CASES = [
  {
    key: 'psialexia',
    image: '/assets/projects/psialexia-cover.webp',
    href: '/blog/interview-alexia',
    external: false
  },
  {
    key: 'kingfix',
    image: '/assets/projects/kingfix-cover.webp',
    href: 'https://kingfix.ca/',
    external: true
  },
  {
    key: 'mycard4you',
    image: '/assets/projects/mycard4you-cover.webp',
    href: '/projects?category=saas',
    external: false
  }
] as const;

export function CasesSection() {
  const t = useTranslations('Pages.Home.Cases');

  return (
    <section
      aria-labelledby="cases-title"
      className="relative bg-background py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2
              id="cases-title"
              className="mb-4 font-space text-4xl font-black md:text-5xl"
            >
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
          </div>
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary-text underline-offset-4 hover:underline"
          >
            {t('all_projects')}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CASES.map((item) => {
            const linkContent = (
              <>
                <div className="relative aspect-4/3 overflow-hidden border-b border-border bg-muted/20">
                  <Image
                    src={item.image}
                    alt={t(`items.${item.key}.image_alt`)}
                    width={1280}
                    height={1600}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-2 text-sm text-muted-foreground">
                    {t(`items.${item.key}.client`)}
                  </p>
                  <h3 className="mb-6 flex-1 font-space text-xl font-bold leading-snug">
                    {t(`items.${item.key}.result`)}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-primary-text">
                    {t(`items.${item.key}.cta`)}
                    {item.external ? (
                      <ArrowUpRight size={16} aria-hidden="true" />
                    ) : (
                      <ArrowRight size={16} aria-hidden="true" />
                    )}
                  </span>
                </div>
              </>
            );

            const cardClass =
              'group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-primary/40';

            return (
              <li key={item.key}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {linkContent}
                  </a>
                ) : (
                  <Link href={item.href} className={cardClass}>
                    {linkContent}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
