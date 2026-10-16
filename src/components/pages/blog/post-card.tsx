'use client';

import { Post } from '.velite';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Hash } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/lib/i18n/navigation';
import { estimateReadingTime } from '@/utils/functions/estimate-reading-time';
import { formatPostDate } from '@/utils/functions/post-date';

export function PostCard({
  post,
  index,
  locale
}: {
  post: Post;
  index: number;
  locale: string;
}) {
  const t = useTranslations('Pages.Blog');

  const readingTime = estimateReadingTime(post.content || '');

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 transition-all hover:border-white/20 hover:bg-white/10"
    >
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Metadados: Data e Tempo */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-primary-text" />
            <time dateTime={post.date}>
              {formatPostDate(post.date, locale, 'short')}
            </time>
          </div>
          <span className="text-white/10">|</span>
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-primary-text" />
            <span>{t('Post.reading_time', { minutes: readingTime })}</span>
          </div>
        </div>

        {/* Título e Link */}
        <Link href={`/blog/${post.slugAsParams}`} className="group/link">
          <h3 className="mb-3 font-space text-2xl font-bold leading-tight text-white transition-colors group-hover/link:text-primary-text md:text-3xl">
            {post.title}
          </h3>
        </Link>

        {/* Descrição */}
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          {post.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-md border border-white/5 bg-white/5 px-2 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:border-primary/20 hover:text-primary-text"
            >
              <Hash size={10} />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/5 pt-6">
        <Link
          href={`/blog/${post.slugAsParams}`}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:text-primary-text"
        >
          {t('read_more')}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.article>
  );
}
