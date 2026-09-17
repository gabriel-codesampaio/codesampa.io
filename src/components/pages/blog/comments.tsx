'use client';

import Giscus from '@giscus/react';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';

import { PT_BR } from '@/utils/constants/languages';

export function Comments() {
  const { theme } = useTheme();
  const locale = useLocale();
  const giscusLang = locale === PT_BR ? 'pt' : 'en';

  return (
    <section
      className="w-full pt-10 border-t border-white/10 mt-10"
      id="comments"
    >
      <div className="bg-card/30 rounded-2xl border border-white/5 p-6 md:p-8">
        <Giscus
          id="comments"
          repo="gabriel-codesampaio/codesampa.io"
          repoId="R_kgDOQeHEIQ"
          category="Announcements"
          categoryId="DIC_kwDOQeHEIc4CzWt-"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={theme === 'dark' ? 'dark' : 'light'}
          lang={giscusLang}
          loading="lazy"
        />
      </div>
    </section>
  );
}
