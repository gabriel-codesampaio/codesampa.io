// src/components/pages/blog/list.tsx
'use client';

import { Post } from '.velite';

import { AnimatePresence, motion } from 'framer-motion';
import { Hash } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useMemo } from 'react';

import { FilterBar } from '@/components/ui/filter-bar';

import { HeaderNewsletter } from './header-newsletter';
import { FileExplorer } from './filter-explorer';
import { PostCard } from './post-card';

export function List({ posts }: { posts: Post[] }) {
  const t = useTranslations('Components.Pages.Blog.List');
  const locale = useLocale();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const blogCategories = useMemo(() => {
    const allTags = posts.flatMap((post) => post.tags);
    const uniqueTags = Array.from(new Set(allTags)).sort();
    return [
      { id: 'all', label: t('categories.all') },
      ...uniqueTags.map((tag) => ({ id: tag, label: tag }))
    ];
  }, [posts, t]);

  const mobileFilteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === 'all' || post.tags.includes(activeCategory);

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchLower) ||
      (post.description &&
        post.description.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  const desktopPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="flex flex-col gap-10 mx-auto">
      <div className="mx-auto">
        <HeaderNewsletter />
      </div>

      <div className="flex flex-col gap-8 lg:hidden">
        <FilterBar
          categories={blogCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          placeholder={t('search_placeholder')}
          className="mb-0"
        />

        <div className="grid gap-6 grid-cols-1">
          <AnimatePresence mode="popLayout">
            {mobileFilteredPosts.length > 0 ? (
              mobileFilteredPosts.map((post, i) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  index={i}
                  locale={locale}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-white/5"
              >
                <p className="text-muted-foreground font-mono text-sm">
                  {t('empty_state')}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-4 min-h-11 px-4 text-primary-text hover:underline text-sm font-bold"
                >
                  {t('clear_filters')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden lg:flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 opacity-60 px-1"
        >
          <Hash size={16} className="text-primary-text" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            {t('latest_entries')}
          </span>
          <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-[1fr_340px] gap-8 items-start">
          <div className="flex flex-col min-w-0">
            <div className="grid gap-6 grid-cols-1">
              {desktopPosts.map((post, i) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  index={i}
                  locale={locale}
                />
              ))}
            </div>
          </div>

          <aside className="sticky top-24 max-h-[calc(100vh-120px)] flex flex-col">
            <FileExplorer posts={posts} className="h-full" />
          </aside>
        </div>
      </div>
    </div>
  );
}
