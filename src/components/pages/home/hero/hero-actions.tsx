'use client';

import { ArrowRight, Sparkles, FolderGit2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';

export function HeroActions() {
  const t = useTranslations('Pages.Home.Hero');

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 md:mt-12 w-full sm:w-auto">
      <Button
        asChild
        size="lg"
        className="group relative w-full sm:w-auto h-12 px-8 text-base font-bold text-white border-0 shadow-lg shadow-primary/25 hover:shadow-primary/50 
        bg-linear-to-r from-primary via-violet-500 to-primary 
        bg-size-[200%_100%] bg-left hover:bg-right transition-[background-position,box-shadow,transform] duration-500 ease-out active:scale-95"
      >
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2"
        >
          <span className="relative z-10">{t('cta_primary')}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Button>

      <Button
        asChild
        variant="outline"
        size="lg"
        className="group w-full sm:w-auto h-12 px-8 text-base 
        bg-background/50 backdrop-blur-sm border-muted-foreground/20 
        hover:border-primary/50 hover:bg-primary/5 
        text-muted-foreground hover:text-primary-text transition-colors duration-300"
      >
        <Link
          href="/projects"
          className="flex items-center justify-center gap-2"
        >
          <FolderGit2 className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-6" />
          <span>{t('cta_secondary')}</span>
        </Link>
      </Button>
    </div>
  );
}
