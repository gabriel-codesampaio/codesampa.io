'use client';

import { Github, Linkedin } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { posts } from '.velite';

import { Logo } from '@/components/ui/logo';
import { Link } from '@/lib/i18n/navigation';

export function Links() {
  const t = useTranslations('Pages.Home.Links');
  const locale = useLocale();

  // Pega o ano atual automaticamente
  const currentYear = new Date().getFullYear();

  const latestPosts = posts
    .filter((post) => post.published && post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <section className="relative w-full border-t border-white/5 bg-background overflow-hidden">
      <div className="container mx-auto px-6 pt-12 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 md:mb-16">
          {/* Coluna 1: Sobre */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-2 md:gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 group w-fit cursor-pointer"
            >
              <Logo width={48} showText />
            </Link>

            <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
              {t('description')}
            </p>

            <div className="flex gap-3 pt-2 mb-2">
              <SocialLink
                href="https://github.com/gabriel-codesampaio"
                icon={<Github size={18} aria-hidden="true" />}
                label={t('social.github')}
              />
              <SocialLink
                href="https://www.linkedin.com/in/gabriel-codesampaio/"
                icon={<Linkedin size={18} aria-hidden="true" />}
                label={t('social.linkedin')}
              />
            </div>

            {/* Bloco de Informações da Empresa com Tradução */}
            <div className="flex flex-col gap-1 mt-2 text-xs text-muted-foreground font-mono">
              <p>CNPJ: 64.197.469/0001-45</p>
              <p>&copy; {currentYear} codesampa.io</p>
              <p>{t('legal.rights')}</p>
            </div>
          </div>

          {/* Coluna 2: Blog Posts */}
          <div className="md:col-span-6 lg:col-span-4 hidden md:flex flex-col gap-6 md:items-start lg:pl-16 min-w-0">
            <h2 className="font-space text-base font-semibold text-white flex items-center gap-2 shrink-0">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-violet-500"
              />
              {t('columns.blog')}
            </h2>

            <ul className="flex flex-col gap-1 w-full">
              {latestPosts.map((post) => (
                <LiLink key={post.slug} href={`/blog/${post.slugAsParams}`}>
                  {post.title}
                </LiLink>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Explore */}
          <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-3 md:gap-6 md:items-start lg:pl-16">
            <h2 className="font-space text-base font-semibold text-white flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-primary"
              />
              {t('columns.explore')}
            </h2>
            <ul className="flex flex-col gap-1">
              <LiLink href="/">{t('links.home')}</LiLink>
              <LiLink href="/blog">{t('links.blog')}</LiLink>
              <LiLink href="/projects">{t('links.projects')}</LiLink>
              <LiLink href="/contact">{t('links.contact')}</LiLink>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const LiLink = ({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <li className="w-full">
    <Link
      href={href}
      className="group flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors w-full"
    >
      <span
        aria-hidden="true"
        className="h-px w-0 bg-primary group-hover:w-3 transition-[width] duration-300 shrink-0"
      />

      <span className="line-clamp-2 flex-1 min-w-0 text-left">{children}</span>
    </Link>
  </li>
);

const SocialLink = ({
  href,
  icon,
  label
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/5 bg-white/2 text-muted-foreground hover:bg-primary/10 hover:text-primary-text hover:border-primary/20 transition-colors duration-300"
  >
    {icon}
  </a>
);
