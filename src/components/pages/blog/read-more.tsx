'use client';

import { posts } from '.velite';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/utils/functions/tw-merge';
import { formatPostDate } from '@/utils/functions/post-date';

interface ReadMoreProps {
  currentSlug: string;
  currentTags: string[];
  locale: string;
}

export function ReadMore({ currentSlug, currentTags, locale }: ReadMoreProps) {
  const t = useTranslations('Components.Pages.Blog.ReadMore');

  const relatedPosts = posts
    .filter(
      (post) =>
        post.published &&
        post.locale === locale &&
        post.slugAsParams !== currentSlug
    )
    .map((post) => ({
      ...post,
      relevance: post.tags.filter((tag) => currentTags.includes(tag)).length
    }))
    .sort((a, b) => {
      if (b.relevance !== a.relevance) {
        return b.relevance - a.relevance;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="w-full border-t border-white/10 pt-16">
      <div className="mb-10 flex items-center justify-between">
        <h3 className="font-space text-2xl font-bold text-white md:text-3xl">
          {t('title')}
        </h3>
        <Link
          href="/blog"
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-text transition-colors"
        >
          {t('view_all')}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {relatedPosts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link
              href={`/blog/${post.slugAsParams}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/30 transition-all hover:border-primary/30 hover:bg-card/50 hover:-translate-y-1"
            >
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
                  <Calendar size={12} className="text-primary-text/70" />
                  <time dateTime={post.date}>
                    {formatPostDate(post.date, locale, 'short')}
                  </time>
                </div>

                <h4 className="mb-3 font-space text-lg font-bold leading-tight text-foreground group-hover:text-primary-text transition-colors line-clamp-2">
                  {post.title}
                </h4>

                <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {post.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-muted-foreground group-hover:text-foreground transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
