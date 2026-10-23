'use client';

import React from 'react';

import { cn } from '@/utils/functions/tw-merge';

interface AnimatedBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedBadge({ children, className }: AnimatedBadgeProps) {
  return (
    <div className={cn("relative inline-flex overflow-hidden rounded-full p-px", className)}>
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,var(--color-primary)_50%,#0000_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/90 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-3xl transition-colors hover:bg-slate-950/80">
        {children}
      </span>
    </div>
  );
}