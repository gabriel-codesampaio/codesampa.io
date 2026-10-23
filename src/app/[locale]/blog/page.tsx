import { posts } from '.velite';

import { getLocale, getTranslations } from 'next-intl/server';

import { List } from '@/components/pages/blog/list';
import { PageTitle } from '@/components/ui/page-title';
import { buildAlternates } from '@/utils/functions/alternates';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Blog' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/blog')
  };
}

export default async function BlogPage() {
  const locale = await getLocale();
  const t = await getTranslations('Pages.Blog');

  const initialPosts = posts
    .filter((post) => post.published && post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="container mx-auto px-4 py-12 md:py-24 relative">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[920px] w-[calc(100%+520px)] max-w-[min(1320px,100%)] -translate-x-1/2 -translate-y-1/2 glow-info-pale opacity-10" />

      <PageTitle
        title={
          <>
            {t('title_prefix')}{' '}
            <span className="text-primary-text">{t('title_highlight')}</span>
          </>
        }
        subtitle={t('subtitle')}
      />

      <List posts={initialPosts} />
    </section>
  );
}
