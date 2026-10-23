import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { TimelinePortfolio } from '@/components/pages/projects/timeline';
import { PageTitle } from '@/components/ui/page-title';
import { buildAlternates } from '@/utils/functions/alternates';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Projects' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/projects')
  };
}

export default async function ProjectsPage() {
  const t = await getTranslations('Pages.Projects');

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 relative w-full overflow-hidden bg-background">
      {/* Background Effect */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[920px] w-[calc(100%+520px)] max-w-[min(1320px,100%)] -translate-x-1/2 -translate-y-1/2 glow-highlight opacity-10" />

      <div className="relative z-10">
        <PageTitle
          title={t.rich('title', {
            highlight: (chunks) => (
              <span className="text-primary-text">{chunks}</span>
            ),
            br: () => <br />
          })}
          subtitle={t('subtitle')}
        />

        {/* useSearchParams (filtro na URL) exige um limite de Suspense */}
        <Suspense>
          <TimelinePortfolio />
        </Suspense>
      </div>
    </div>
  );
}
