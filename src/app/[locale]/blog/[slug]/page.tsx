import { posts } from '.velite';

import { ArrowLeft, Calendar, Clock, Hash } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import * as runtime from 'react/jsx-runtime';

import { ShareButton } from '@/components/pages/blog/share-button';
import { TableOfContents } from '@/components/pages/blog/table-of-contents';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { buildAlternates } from '@/utils/functions/alternates';
import { cn } from '@/utils/functions/tw-merge';
import { formatPostDate } from '@/utils/functions/post-date';
import { estimateReadingTime } from '@/utils/functions/estimate-reading-time';
import { ReadMore } from '@/components/pages/blog/read-more';
import { ScrollProgress } from '@/components/pages/blog/scroll-progress';
import { CodeBlock } from '@/components/ui/code-block';
import { Comments } from '@/components/pages/blog/comments';
import { AuthorProfile } from '@/components/pages/blog/author-profile';
import { ChatBubble } from '@/components/pages/blog/chat-bubble';

// --- Utilitário para renderizar MDX do Velite ---
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  // @ts-ignore - O runtime é injetado para interpretar o código compilado
  return fn({ ...runtime }).default;
};

interface PostPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params
}: PostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = posts.find(
    (p) => p.slugAsParams === slug && p.locale === locale
  );

  if (!post) return {};

  // hreflang só para os idiomas em que o post existe
  const translatedLocales = posts
    .filter((p) => p.slugAsParams === slug)
    .map((p) => p.locale);

  return {
    title: `${post.title} | codesampa.io`,
    description: post.description,
    keywords: post.tags,
    alternates: buildAlternates(locale, `/blog/${slug}`, translatedLocales),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags
    }
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slugAsParams,
    locale: post.locale
  }));
}

// --- Componente da Página ---
export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations('Pages.Blog.Post');

  const post = posts.find(
    (p) => p.slugAsParams === slug && p.locale === locale
  );

  if (!post || !post.published) {
    notFound();
  }

  const readingTime = estimateReadingTime(post.content);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const MDXContent = useMDXComponent(post.content);

  const mdxComponents = {
    // Evita um segundo <h1> na página: o título do post já é renderizado
    // como h1 acima, então qualquer `#` no MDX vira h2.
    h1: (props: React.ComponentProps<'h2'>) => <h2 {...props} />,
    pre: CodeBlock,
    ChatBubble
  };

  return (
    <article className="container mx-auto px-4 pt-8 pb-16 relative overflow-visible">
      <ScrollProgress />

      {/* Background Effect */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/10 blur-[100px] md:blur-[130px]" />

      {/* Header Centralizado */}
      <header className="mb-16 relative z-10 mx-auto">
        <div className="mb-4 pl-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary-text -ml-4 gap-2 font-mono group transition-colors"
            asChild
          >
            <Link href="/blog">
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              {t('back')}
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground mb-6 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-primary-text/70" />
            <time dateTime={post.date} className="text-foreground/80">
              {formatPostDate(post.date, locale)}
            </time>
          </div>
          <span className="text-white/10">|</span>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-primary-text/70" />
            <span className="text-foreground/80">
              {t('reading_time', { minutes: readingTime })}
            </span>
          </div>
          <ShareButton title={post.title} text={post.description || ''} />
        </div>

        <h1 className="font-space text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-8 leading-[1.1] max-w-4xl">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-muted-foreground hover:text-primary-text hover:border-primary/30 transition-colors cursor-default"
            >
              <Hash size={10} className="opacity-50" />
              {tag}
            </div>
          ))}
        </div>
      </header>

      <div className="w-full h-px bg-linear-to-r mb-4 from-transparent via-border to-transparent opacity-50 max-w-4xl mx-auto" />

      {/* Grid de Layout: Conteúdo + Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_250px] gap-12 relative">
        {/* Coluna Principal: Conteúdo */}
        <div
          className={cn(
            'prose prose-invert prose-lg max-w-none min-w-0 relative z-10',
            // ... (Seus estilos prose existentes mantidos aqui) ...
            // Headings
            '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:font-space [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:text-foreground',
            '[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-space [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-foreground [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2',
            '[&_h3]:text-xl [&_h3]:font-bold [&_h3]:font-space [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-foreground/90',
            // Text
            '[&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-lg',
            '[&_strong]:text-foreground [&_strong]:font-semibold',
            '[&_a]:text-primary-text [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary-text/30 [&_a]:transition-colors hover:[&_a]:decoration-primary-text',
            // Âncoras dos títulos (rehype-autolink-headings) herdam a cor do título
            '[&_:is(h1,h2,h3,h4)_a]:text-inherit [&_:is(h1,h2,h3,h4)_a]:no-underline',
            // Lists
            '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:text-muted-foreground',
            '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:text-muted-foreground',
            '[&_li]:mb-2 [&_li::marker]:text-primary-text/50',
            // Blockquotes
            '[&_blockquote]:border-l-2 [&_blockquote]:border-primary/50 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-foreground/80 [&_blockquote]:my-8',
            // Inline Code
            '[&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-sm [&_code]:font-mono [&_code]:text-primary-text/90 [&_code]:border [&_code]:border-white/5'
            // Code Blocks (Rehype Pretty Code)
            // '[&_pre]:bg-[#0d1117] [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-8 [&_pre]:shadow-2xl',
            // '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:text-inherit [&_pre_code]:border-none'
          )}
        >
          <MDXContent components={mdxComponents} />
        </div>

        {/* Coluna Lateral: Table of Contents (Apenas Desktop XL) */}
        <aside className="hidden xl:flex relative flex-col gap-4">
          <AuthorProfile />
          <TableOfContents />
        </aside>
      </div>

      <div className="mx-auto">
        <ReadMore
          currentSlug={post.slugAsParams}
          currentTags={post.tags}
          locale={locale}
        />
      </div>

      {/* RENDERIZAÇÃO CONDICIONAL DOS COMENTÁRIOS */}
      {post.comments && (
        <div className="mx-auto">
          <Comments />
        </div>
      )}
    </article>
  );
}
