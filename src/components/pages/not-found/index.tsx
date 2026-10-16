import { ArrowRight, Home } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';

export default function NotFoundContent() {
  const t = useTranslations('Pages.NotFound');

  return (
    <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      <div className="relative z-10 flex flex-col items-center">
        <p
          aria-hidden="true"
          className="mb-2 font-space text-8xl font-black tracking-tighter text-white/80 md:text-9xl"
        >
          404
        </p>
        <h1 className="mb-4 font-space text-3xl font-black md:text-4xl">
          {t('title')}
        </h1>
        <p className="mb-8 max-w-md text-lg text-muted-foreground">
          {t('description')}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="h-12 rounded-full bg-white px-8 font-bold text-black hover:bg-slate-200"
            asChild
          >
            <Link href="/" className="flex items-center gap-2">
              <Home size={18} aria-hidden="true" />
              {t('cta')}
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full px-8 font-bold"
            asChild
          >
            <Link href="/projects" className="flex items-center gap-2">
              {t('cta_projects')}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
