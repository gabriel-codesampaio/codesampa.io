'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface BracketSelectorProps {
  text: string;
  onToggle: () => void;
  onScroll: () => void;
}

export function BracketSelector({
  text,
  onToggle,
  onScroll
}: BracketSelectorProps) {
  return (
    <div className="group relative inline-flex items-center justify-center gap-4 md:gap-6 outline-none select-none py-2 z-20 max-w-full">
      {/* Bracket Esquerdo */}
      <button
        onClick={onToggle}
        className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        aria-label="Previous mode"
      >
        <span className="font-mono font-light text-5xl text-muted-foreground/40 group-hover:text-primary-text group-hover:-translate-x-2 transition duration-300 ease-out block">
          &lt;
        </span>
      </button>

      {/* Texto Central - Ajustado para md:text-8xl */}
      <button
        onClick={onScroll}
        aria-live="polite"
        className="relative min-w-[200px] text-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={text}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.3 }}
            className="block font-space font-bold tracking-tight bg-linear-to-r from-primary-text via-blue-300 to-violet-600 bg-clip-text text-transparent pb-2 whitespace-nowrap text-5xl md:text-8xl"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Bracket Direito */}
      <button
        onClick={onToggle}
        className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        aria-label="Next mode"
      >
        <span className="font-mono font-light text-5xl text-muted-foreground/40 group-hover:text-primary-text group-hover:translate-x-2 transition duration-300 ease-out block">
          &gt;
        </span>
      </button>
    </div>
  );
}
