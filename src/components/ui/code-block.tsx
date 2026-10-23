'use client';

import { Check, Copy, Terminal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@/utils/functions/tw-merge';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  'data-language'?: string;
  raw?: string;
}

export function CodeBlock({
  children,
  className,
  'data-language': language = 'text',
  ...props
}: CodeBlockProps) {
  const t = useTranslations('Components.UI.CodeBlock');
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = async () => {
    if (!preRef.current) return;

    const code = preRef.current.innerText;

    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      toast.success(t('copied_toast'));

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      toast.error(t('copy_error'));
    }
  };

  return (
    <div className="relative my-6 md:my-8 w-full max-w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl">
      {/* --- Terminal Header --- */}
      <div className="flex h-9 md:h-10 items-center justify-between border-b border-white/5 bg-white/5 px-3 md:px-4 shrink-0">
        {/* Window Controls */}
        <div className="flex gap-1.5 md:gap-2">
          <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-red-500/80" />
          <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-yellow-500/80" />
          <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-green-500/80" />
        </div>

        {/* Filename / Language Label */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/60">
          <Terminal size={12} />
          <span className="uppercase">{language}</span>
        </div>

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 rounded-md p-1 md:p-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
          aria-label={t('copy_label')}
        >
          {isCopied ? (
            <>
              <Check size={12} className="md:w-3.5 md:h-3.5 text-emerald-400" />
              <span className="hidden sm:inline text-emerald-400">
                {t('copied')}
              </span>
            </>
          ) : (
            <>
              <Copy size={12} className="md:w-3.5 md:h-3.5" />
              <span className="hidden sm:inline">{t('copy')}</span>
            </>
          )}
        </button>
      </div>

      {/* --- Code Content --- */}
      {/* Removemos o wrapper desnecessário de scroll e aplicamos direto no pre */}
      <div className="relative w-full">
        <pre
          ref={preRef}
          className={cn(
            // Layout & Spacing
            'w-full py-3 px-3 md:py-4 md:px-4',
            'overflow-x-auto',
            // Typography
            'font-mono text-xs md:text-sm leading-relaxed',
            // Scrollbar
            'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20',
            // Fix para o background acompanhar o scroll
            '[&>code]:block [&>code]:w-fit [&>code]:min-w-full',
            className
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}
