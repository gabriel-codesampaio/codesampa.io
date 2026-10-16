'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Code, Eye, FileCode, Copy, Check, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';

import { CODE_SNIPPETS } from '@/utils/constants/code_snippets';
import { cn } from '@/utils/functions/tw-merge'; // Import para facilitar classes condicionais

import {
  AnalyticsView,
  CRMView,
  ChatView,
  DesktopSidebar,
  ResponsiveHeader,
  FeatureType
} from './components';

interface SystemDesktopMockProps {
  startAnimation: boolean;
  activeFeature: FeatureType;
  setFeature: (f: FeatureType) => void;
  setIsInteractionPaused: (paused: boolean) => void;
}

export function SystemDesktopMock({
  startAnimation,
  activeFeature,
  setFeature,
  setIsInteractionPaused
}: SystemDesktopMockProps) {
  const [isXRay, setIsXRay] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsInteractionPaused(isXRay);
  }, [isXRay, setIsInteractionPaused]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeFeature]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const processCodeLine = (line: string) => {
    let safeLine = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    safeLine = safeLine.replace(
      /(\/\/.*$)/g,
      '<span class="text-slate-500 italic">$1</span>'
    );

    if (safeLine.startsWith('<span class="text-slate-500')) {
      return safeLine;
    }

    safeLine = safeLine.replace(
      /\b(import|export|from|return|if|const|function|async|await)\b/g,
      '<span class="text-purple-400">$1</span>'
    );

    safeLine = safeLine.replace(
      /('.*?')/g,
      '<span class="text-green-400">$1</span>'
    );

    safeLine = safeLine.replace(
      /(&lt;\/?[a-zA-Z0-9]+.*?&gt;)/g,
      '<span class="text-blue-400">$1</span>'
    );

    return safeLine || ' ';
  };

  return (
    <div className="relative aspect-16/10 w-[95vw] max-w-6xl perspective-1000">
      <motion.div
        className="relative h-full w-full transform-style-3d transition-all duration-700"
        animate={{ rotateY: isXRay ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      >
        {/* --- FACE DA FRENTE (UI) --- */}
        <div
          className={cn(
            'absolute inset-0 backface-hidden overflow-hidden rounded-xl bg-[#0A0A0A] ring-1 ring-white/10 shadow-2xl shadow-primary/10 flex flex-col',
            isXRay ? 'pointer-events-none' : 'pointer-events-auto' // Desativa cliques quando virado
          )}
        >
          {/* Header Unificado */}
          <div className="flex h-10 shrink-0 items-center justify-between border-b border-white/5 bg-black/40 px-4 backdrop-blur-md z-30 relative">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="hidden sm:flex h-6 items-center justify-center rounded-md border border-white/5 bg-white/5 px-3 text-[9px] text-muted-foreground/60 font-mono transition-colors hover:bg-white/10 hover:text-muted-foreground/80">
                <Lock size={8} className="mr-1.5 opacity-50" />
                codesampa.io / {activeFeature}
              </div>
            </div>

            <button
              onClick={() => setIsXRay(true)}
              className="group flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[9px] font-bold text-primary-text transition-all hover:bg-primary/20 cursor-pointer"
            >
              <Code size={12} />
              <span className="hidden sm:inline">VIEW CODE</span>
            </button>
          </div>

          <div className="relative w-full flex-1 overflow-hidden bg-background p-6">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[24px_24px]" />

            <div className="relative z-10 grid h-full w-full grid-cols-[240px_1fr] gap-6">
              <DesktopSidebar
                activeTab={activeFeature}
                onTabChange={setFeature}
              />

              <div className="flex flex-col gap-6 overflow-hidden">
                <div className="shrink-0 h-16">
                  <ResponsiveHeader
                    isMobile={false}
                    activeTab={activeFeature}
                  />
                </div>
                <div className="flex-1 min-h-0 relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="h-full w-full"
                    >
                      {activeFeature === 'analytics' && (
                        <AnalyticsView isMobile={false} />
                      )}
                      {activeFeature === 'crm' && <CRMView isMobile={false} />}
                      {activeFeature === 'chat' && (
                        <ChatView isMobile={false} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- FACE DE TRÁS (CODE) --- */}
        <div
          className={cn(
            'absolute inset-0 backface-hidden overflow-hidden rounded-xl bg-[#1e1e1e] ring-1 ring-white/10 shadow-2xl flex flex-col',
            !isXRay ? 'pointer-events-none' : 'pointer-events-auto' // Desativa cliques quando escondido
          )}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex h-10 shrink-0 items-center justify-between border-b border-white/5 bg-[#252526] px-4">
            <div className="flex items-center gap-2">
              <div
                className="flex gap-1.5 mr-2 opacity-50 grayscale hover:grayscale-0 transition-all group cursor-pointer"
                onClick={() => setIsXRay(false)}
              >
                <div
                  className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] group-hover:brightness-110"
                  title="Close Code View"
                />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
              </div>

              <div className="h-4 w-px bg-white/10 mx-2" />

              <FileCode size={12} className="text-blue-400" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeFeature}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="font-mono text-[10px] text-slate-300"
                >
                  {activeFeature === 'analytics'
                    ? 'revenue-chart.tsx'
                    : activeFeature === 'crm'
                      ? 'kanban-board.tsx'
                      : 'chat-client.ts'}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyCode}
                className="text-slate-400 hover:text-white transition-colors"
                title="Copy Code"
              >
                {copied ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy size={14} />
                )}
              </button>

              <button
                onClick={() => setIsXRay(false)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-bold text-white transition-all hover:bg-white/10 cursor-pointer"
              >
                <Eye size={12} />
                <span className="hidden sm:inline">PREVIEW UI</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6 font-mono text-xs md:text-sm leading-relaxed text-slate-300">
            <pre>
              <code>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4 }}
                  >
                    {CODE_SNIPPETS[activeFeature].split('\n').map((line, i) => (
                      <div key={i} className="table-row">
                        <span className="table-cell select-none text-slate-600 pr-4 text-right w-8">
                          {i + 1}
                        </span>
                        <span
                          className="table-cell"
                          dangerouslySetInnerHTML={{
                            __html: processCodeLine(line)
                          }}
                        />
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </code>
            </pre>
          </div>

          <div className="h-6 bg-blue-600 flex items-center px-3 gap-4 text-[10px] text-white font-medium">
            <span className="flex items-center gap-1">
              <span className="text-xs">✕</span> 0
            </span>
            <span className="flex items-center gap-1">
              <span className="text-xs">⚠</span> 0
            </span>
            <span className="ml-auto">TypeScript React</span>
            <span>UTF-8</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
