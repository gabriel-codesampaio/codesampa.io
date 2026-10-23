'use client';

import { motion } from 'framer-motion';
import { ListVideo } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { cn } from '@/utils/functions/tw-merge';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const t = useTranslations('Components.Pages.Blog.TableOfContents');

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll('.prose h2, .prose h3')
    );

    const mappedHeadings = elements.map((elem) => ({
      id: elem.id,
      text: (elem as HTMLElement).innerText,
      level: Number(elem.tagName.substring(1))
    }));

    setHeadings(mappedHeadings);

    // Observer para destacar o item ativo no scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -40% 0px' }
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <nav className="sticky top-32 w-full max-w-[260px] hidden xl:block">
      <div className="mb-4 flex items-center gap-2 text-sm font-bold text-white/80 uppercase tracking-wider">
        <ListVideo size={16} className="text-primary-text" />
        <span>{t('inThisArticle')}</span>
      </div>

      <ul className="flex flex-col gap-2 relative border-l border-white/10 pl-4">
        <motion.div
          layoutId="active-toc-indicator"
          className="absolute -left-px w-0.5 bg-primary h-6 rounded-full"
          style={{
            top: headings.findIndex((h) => h.id === activeId) * 32
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        {headings.map((heading) => {
          const isActive = activeId === heading.id;

          return (
            <li
              key={heading.id}
              style={{
                paddingLeft: heading.level === 3 ? '1rem' : '0'
              }}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'block text-sm transition-colors duration-200 line-clamp-2 hover:text-white',
                  isActive
                    ? 'text-primary-text font-medium translate-x-1'
                    : 'text-muted-foreground'
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
