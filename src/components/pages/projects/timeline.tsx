'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Hash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { FilterBar } from '@/components/ui/filter-bar';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import {
  LIST_PROJECTS,
  LIST_SECONDARY_PROJECTS,
  CATEGORIES
} from '@/utils/constants/projects';

import CardProject from './card-project';
import { CardProjectSecondary } from './card-project-secondary';
import { Cta } from './cta';

export function TimelinePortfolio() {
  const t = useTranslations('Pages.Projects');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // A categoria fica na URL (?category=web) para links da home abrirem já filtrados
  const categoryParam = searchParams.get('category');
  const activeCategory = CATEGORIES.some((c) => c.id === categoryParam)
    ? categoryParam!
    : 'all';

  const [searchQuery, setSearchQuery] = useState('');

  const setActiveCategory = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === 'all') params.delete('category');
    else params.set('category', id);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  const categories = CATEGORIES.map((c) => ({
    id: c.id,
    label: t(`categories.${c.id}`)
  }));

  const searchLower = searchQuery.trim().toLowerCase();

  const matchesSearch = (key: string, tags: string[]) =>
    searchLower === '' ||
    t(`projects.${key}.title`).toLowerCase().includes(searchLower) ||
    t(`projects.${key}.description`).toLowerCase().includes(searchLower) ||
    tags.some((tag) => tag.toLowerCase().includes(searchLower));

  const filteredProjects = LIST_PROJECTS.filter(
    (project) =>
      (activeCategory === 'all' || project.category === activeCategory) &&
      matchesSearch(project.key, project.tags)
  );

  const filteredSecondary = LIST_SECONDARY_PROJECTS.filter(
    (project) =>
      (activeCategory === 'all' || project.category === activeCategory) &&
      matchesSearch(project.key, project.tags)
  );

  const isEmpty =
    filteredProjects.length === 0 && filteredSecondary.length === 0;

  return (
    <>
      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        placeholder={t('placeholder')}
      />

      <div className="flex flex-col gap-12 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <CardProject key={project.key} project={project} index={index} />
          ))}
        </AnimatePresence>

        {isEmpty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-muted-foreground"
            role="status"
          >
            <p>{t('empty')}</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 min-h-11 rounded-full border border-white/10 px-5 text-sm font-bold text-foreground transition-colors hover:bg-white/5"
            >
              {t('clear_filters')}
            </button>
          </motion.div>
        )}

        {filteredSecondary.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-3 px-1 mb-8">
              <Hash
                size={16}
                className="text-primary-text"
                aria-hidden="true"
              />
              <h2 className="text-sm font-mono font-bold text-muted-foreground">
                {t('more_projects')}
              </h2>
              <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSecondary.map((project, index) => (
                <CardProjectSecondary
                  key={project.key}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        <Cta />
      </div>
    </>
  );
}
