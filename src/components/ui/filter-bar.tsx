'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useId } from 'react';

import { cn } from '@/utils/functions/tw-merge';
import useIsMobile from '@/utils/hooks/use-mobile';

export interface FilterCategory {
  id: string;
  label: string;
}

interface FilterBarProps {
  categories: FilterCategory[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  /** Busca controlada pelo pai, para que ele possa limpar o filtro */
  searchQuery: string;
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

export function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearch,
  className,
  placeholder
}: FilterBarProps) {
  const t = useTranslations('Components.UI.FilterBar');
  const inputId = useId();
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Força a abertura no mobile assim que detectado
  useEffect(() => {
    if (isMobile) {
      setIsSearchOpen(true);
    }
  }, [isMobile]);

  const handleCloseSearch = () => {
    onSearch('');
    if (!isMobile) setIsSearchOpen(false);
  };

  const handleInputBlur = () => {
    // Só recolhe se estiver vazio; senão a lista ficaria filtrada por uma busca invisível
    if (!isMobile && searchQuery === '') {
      setIsSearchOpen(false);
    }
  };

  const showExpandedSearch = isMobile || isSearchOpen || searchQuery !== '';

  return (
    <div
      className={cn(
        'mb-8 flex flex-col-reverse gap-4 md:mb-16 md:flex-row md:items-center md:justify-center md:gap-6',
        className
      )}
    >
      {/* --- LISTA DE CATEGORIAS --- */}
      <div
        className={cn(
          'relative overflow-hidden min-w-0',
          'w-full',
          'md:w-auto md:max-w-[60%]'
        )}
      >
        <div
          className={cn(
            'flex items-center gap-2 overflow-x-auto pb-2',
            'mask-r-from-80%',
            'mask-[linear-gradient(to_right,black_80%,transparent)]',
            '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
            'snap-x cursor-grab active:cursor-grabbing'
          )}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              aria-pressed={activeCategory === cat.id}
              className={cn(
                'relative min-h-11 shrink-0 snap-start rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 whitespace-nowrap',
                'focus-visible:outline-2 focus-visible:outline-offset-2',
                activeCategory === cat.id
                  ? 'text-white'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-white'
              )}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full border border-white/5 bg-white/10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
          <div className="w-8 shrink-0" aria-hidden="true" />
        </div>
      </div>

      {/* --- DIVISOR (Apenas Desktop) --- */}
      <div className="hidden h-6 w-px bg-white/10 md:block shrink-0" />

      {/* --- PESQUISA EXPANSÍVEL --- */}
      <div className="relative flex h-11 w-full md:w-auto shrink-0">
        <motion.div
          layout
          className={cn(
            'flex items-center overflow-hidden rounded-full border border-white/10 bg-white/5 transition-colors',
            'focus-within:border-primary-text focus-within:ring-2 focus-within:ring-primary-text/40',
            showExpandedSearch
              ? 'w-full border-muted-foreground/60 bg-black/50 md:w-64'
              : 'w-11 hover:border-white/20 hover:bg-white/10'
          )}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!showExpandedSearch ? (
              <motion.button
                key="search-icon"
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSearchOpen(true)}
                className="flex h-11 w-11 shrink-0 items-center justify-center text-muted-foreground hover:text-white"
                aria-label={t('open_search')}
              >
                <Search size={18} aria-hidden="true" />
              </motion.button>
            ) : (
              <motion.div
                key="search-input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-11 w-full items-center px-3"
              >
                <label htmlFor={inputId} className="sr-only">
                  {t('search_label')}
                </label>
                <Search
                  size={16}
                  aria-hidden="true"
                  className="mr-2 shrink-0 text-muted-foreground"
                />
                <input
                  id={inputId}
                  name="search"
                  type="search"
                  autoComplete="off"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  onBlur={handleInputBlur}
                  // Foca ao abrir no desktop (o usuário acabou de clicar na lupa)
                  autoFocus={!isMobile}
                  placeholder={placeholder}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-muted-foreground/60 outline-none min-w-0 [&::-webkit-search-cancel-button]:hidden"
                />
                {searchQuery !== '' && (
                  <button
                    type="button"
                    onClick={handleCloseSearch}
                    onMouseDown={(e) => e.preventDefault()}
                    aria-label={t('clear_search')}
                    className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-white/10 hover:text-white"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
