import { getTranslations } from 'next-intl/server';

import { ContactHub } from '@/components/pages/contact/contact-hub';
import { PageTitle } from '@/components/ui/page-title';
import { buildAlternates } from '@/utils/functions/alternates';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Contact' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/contact')
  };
}

export default async function ContactPage() {
  const t = await getTranslations('Pages.Contact.Hub');

  return (
    <div className="relative flex h-full flex-1 flex-col items-center justify-center overflow-hidden">
      {/* Background Effect */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[920px] w-[calc(100%+520px)] max-w-[min(1320px,100%)] -translate-x-1/2 -translate-y-1/2 glow-success opacity-10" />

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10 max-w-5xl">
        <PageTitle
          badge={t('badge')}
          badgeColor="emerald"
          title={
            <>
              {t('title_prefix')} <br className="hidden md:block" />
              <span className="text-primary-text">{t('title_highlight')}</span>
            </>
          }
          subtitle={t('subtitle')}
        />

        <ContactHub />
      </div>
    </div>
  );
}
