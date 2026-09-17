'use client';

import { motion } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  LayoutGrid,
  Users,
  MessageSquare,
  Zap,
  ChevronDown,
  Search,
  MoreHorizontal,
  Send,
  Menu
} from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/utils/functions/tw-merge';

// Tipos para as abas
export type FeatureType = 'analytics' | 'crm' | 'chat';

// --- Sidebar Desktop ---
export const DesktopSidebar = ({
  activeTab,
  onTabChange
}: {
  activeTab: FeatureType;
  onTabChange: (tab: FeatureType) => void;
}) => (
  <div className="bg-card/80 rounded-lg relative flex h-full w-full flex-col justify-between overflow-hidden rounded-l-lg border-r border-white/5 p-4 text-slate-400 backdrop-blur-xl">
    <div className="relative z-10">
      <div className="group mb-8 flex cursor-pointer items-center justify-between rounded-lg border border-transparent p-2 transition-colors hover:border-white/5 hover:bg-white/5">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg shadow-[0_0_15px_rgba(0,71,255,0.5)]">
            <Image
              src="/assets/logo/codesampa-io.png"
              alt="codesampa.io"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-semibold leading-none text-white">
              codesampa.io
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Pro Workspace</div>
          </div>
        </div>
        <ChevronDown size={14} />
      </div>
      <div className="space-y-1">
        {[
          { id: 'analytics', icon: LayoutGrid, label: 'Dashboard' },
          { id: 'crm', icon: Users, label: 'CRM' },
          { id: 'chat', icon: MessageSquare, label: 'Messages' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id as FeatureType)}
            className={cn(
              'flex w-full cursor-pointer items-center gap-3 rounded-md border border-transparent px-3 py-2 transition-all',
              activeTab === item.id
                ? 'bg-white/5 text-primary border-white/5 shadow-inner'
                : 'hover:bg-white/5 hover:text-slate-200'
            )}
          >
            <item.icon size={18} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
    <div className="relative z-10 rounded-xl border border-white/10 bg-linear-to-br from-violet-900/50 to-blue-900/50 p-4">
      <Zap size={16} className="mb-2 text-blue-400" />
      <h4 className="mb-1 text-xs font-bold text-white">Pro Plan</h4>
      <button className="mt-2 w-full rounded border border-white/5 bg-white/10 py-1.5 text-[10px] font-bold text-white transition-colors hover:bg-white/20">
        Upgrade
      </button>
    </div>
  </div>
);

// --- Mobile Navigation ---
export const MobileBottomNav = ({
  activeTab,
  onTabChange
}: {
  activeTab: FeatureType;
  onTabChange: (tab: FeatureType) => void;
}) => (
  <div className="bg-card/90 flex h-full w-full items-center justify-around rounded-xl border border-white/10 px-2 backdrop-blur-xl">
    <button
      onClick={() => onTabChange('analytics')}
      className={cn(
        'rounded-full p-3 transition-colors',
        activeTab === 'analytics' ? 'text-primary bg-white/5' : 'text-slate-500'
      )}
    >
      <LayoutGrid size={20} />
    </button>
    <button
      onClick={() => onTabChange('crm')}
      className={cn(
        'rounded-full p-3 transition-colors',
        activeTab === 'crm' ? 'text-violet-400 bg-white/5' : 'text-slate-500'
      )}
    >
      <Users size={20} />
    </button>
    <button
      onClick={() => onTabChange('chat')}
      className={cn(
        'rounded-full p-3 transition-colors',
        activeTab === 'chat' ? 'text-emerald-400 bg-white/5' : 'text-slate-500'
      )}
    >
      <MessageSquare size={20} />
    </button>
    <button className="rounded-full p-3 text-slate-500">
      <Menu size={20} />
    </button>
  </div>
);

// --- Header Responsivo ---
export const ResponsiveHeader = ({
  isMobile,
  activeTab
}: {
  isMobile: boolean;
  activeTab: FeatureType;
}) => {
  const titles = {
    analytics: 'Overview',
    crm: 'Leads & Pipeline',
    chat: 'Team Chat'
  };

  return (
    <div
      className={cn(
        'bg-card/80 flex h-full w-full items-center rounded-lg justify-between px-4 backdrop-blur-xl md:px-6 border-white/5',
        isMobile ? 'rounded-xl border' : 'rounded-tr-lg border-b'
      )}
    >
      <div className="flex flex-col">
        {!isMobile && (
          <div className="mb-0.5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wide text-slate-500">
            <span>App</span>
            <span className="text-slate-700">/</span>
            <span className="text-primary">{activeTab}</span>
          </div>
        )}
        <h2 className="text-lg font-bold leading-tight text-white">
          {titles[activeTab]}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        {!isMobile && (
          <div className="flex w-48 items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-slate-400">
            <Search size={14} />
            <span className="text-xs">Search...</span>
          </div>
        )}
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-linear-to-tr from-primary-900 to-purple-500 text-xs font-bold text-white shadow-inner">
          ME
        </div>
      </div>
    </div>
  );
};

// --- CHART COMPONENT (RESTAURADO) ---
export const DarkChart = () => (
  <div className="bg-card/60 relative flex h-full w-full flex-col rounded-xl border border-white/5 p-4 backdrop-blur-md md:p-6 overflow-hidden">
    {/* Fundo Gradiente */}
    <div className="absolute inset-0 bg-linear-to-t from-primary/5 to-transparent opacity-50 pointer-events-none" />

    <div className="z-10 mb-4 flex items-center justify-between">
      <h3 className="text-sm font-bold text-white">Revenue Trend</h3>
      <div className="flex gap-1">
        <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
        <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
      </div>
    </div>

    {/* Barras do Gráfico */}
    <div className="z-10 flex flex-1 items-end justify-between gap-2">
      {[40, 65, 50, 85, 60, 75, 55, 90, 70, 95, 65, 80].map((h, i) => (
        <div key={i} className="group relative w-full h-full flex items-end">
          {/* Barra */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.8, delay: i * 0.05 }}
            className={cn(
              'w-full rounded-sm transition-all duration-300',
              i === 9
                ? 'bg-primary shadow-[0_0_15px_rgba(0,71,255,0.5)]'
                : 'bg-slate-800 group-hover:bg-slate-700'
            )}
          />
        </div>
      ))}
    </div>
  </div>
);

// ==========================================
// VIEWS (CONTEÚDO DAS ABAS)
// ==========================================

// 1. ANALYTICS VIEW
export const AnalyticsView = ({ isMobile }: { isMobile: boolean }) => (
  <div className="flex flex-col h-full gap-4 w-full">
    {/* Metric Cards Row */}
    <div
      className={cn(
        'grid gap-4 shrink-0',
        isMobile ? 'grid-cols-2' : 'grid-cols-3'
      )}
    >
      <div
        className={cn(
          'bg-card/60 relative flex flex-col justify-between overflow-hidden border border-white/5 backdrop-blur-md rounded-lg p-4',
          isMobile ? 'h-24' : 'h-32'
        )}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Revenue
            </p>
            <h3
              className={cn(
                'mt-1 font-bold text-white',
                isMobile ? 'text-lg' : 'text-2xl'
              )}
            >
              $42K
            </h3>
          </div>
          <Activity size={16} className="text-primary" />
        </div>
        <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1">
          <ArrowUpRight size={10} /> +12%
        </div>
      </div>
      <div
        className={cn(
          'bg-card/60 relative flex flex-col justify-between overflow-hidden border border-white/5 backdrop-blur-md rounded-lg p-4',
          isMobile ? 'h-24' : 'h-32'
        )}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Users
            </p>
            <h3
              className={cn(
                'mt-1 font-bold text-white',
                isMobile ? 'text-lg' : 'text-2xl'
              )}
            >
              8.5K
            </h3>
          </div>
          <Users size={16} className="text-violet-400" />
        </div>
        <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1">
          <ArrowUpRight size={10} /> +24%
        </div>
      </div>
      {!isMobile && (
        <div className="bg-card/60 relative flex flex-col justify-between overflow-hidden border border-white/5 backdrop-blur-md rounded-lg p-4 h-32">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Churn
              </p>
              <h3 className="mt-1 font-bold text-white text-2xl">0.8%</h3>
            </div>
            <Activity size={16} className="text-fuchsia-400" />
          </div>
          <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1">
            -2%
          </div>
        </div>
      )}
    </div>

    {/* Chart Area - Ocupa o resto do espaço */}
    <div className="flex-1 min-h-0 w-full">
      <DarkChart />
    </div>
  </div>
);

// 2. CRM VIEW
export const CRMView = ({ isMobile }: { isMobile: boolean }) => (
  <div className="flex flex-col h-full gap-3 w-full overflow-hidden">
    {[
      {
        name: 'Acme Corp',
        status: 'Closed',
        value: '$12,000',
        color: 'bg-emerald-500'
      },
      {
        name: 'Globex Inc',
        status: 'Negotiation',
        value: '$45,000',
        color: 'bg-blue-500'
      },
      {
        name: 'Soylent Corp',
        status: 'Lead',
        value: '$8,500',
        color: 'bg-yellow-500'
      },
      {
        name: 'Initech',
        status: 'Proposal',
        value: '$22,000',
        color: 'bg-purple-500'
      },
      { name: 'Umbrella', status: 'Lost', value: '$0', color: 'bg-red-500' }
    ]
      .slice(0, isMobile ? 4 : 5)
      .map((deal, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-card/40 hover:bg-card/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold text-black',
                deal.color
              )}
            >
              {deal.name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-medium text-white">{deal.name}</div>
              <div className="text-[10px] text-slate-500">{deal.status}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-white">{deal.value}</div>
            <MoreHorizontal size={14} className="ml-auto text-slate-600" />
          </div>
        </motion.div>
      ))}
  </div>
);

// 3. CHAT VIEW
export const ChatView = ({ isMobile }: { isMobile: boolean }) => (
  <div className="flex flex-col h-full w-full justify-between">
    <div className="flex-1 space-y-4 p-2 overflow-y-auto custom-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3"
      >
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/10">
          <Image
            src="https://github.com/gabriel-codesampaio.png"
            alt="Gabriel Sampaio"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 text-sm text-slate-200 max-w-[80%]">
          Hey! The new deployment looks amazing. 🚀
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-3 flex-row-reverse"
      >
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white shrink-0">
          ME
        </div>
        <div className="bg-primary/20 border border-primary/20 rounded-2xl rounded-tr-none p-3 text-sm text-white max-w-[80%]">
          Thanks! Just optimized the CI/CD pipeline.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-3"
      >
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/10">
          <Image
            src="https://github.com/gabriel-codesampaio.png"
            alt="Gabriel Sampaio"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 text-sm text-slate-200 max-w-[80%]">
          Performance metrics are up by 40%. Great job!
        </div>
      </motion.div>
    </div>

    {/* Input Area */}
    <div className="mt-2 flex gap-2 pt-2 border-t border-white/5 shrink-0">
      <div className="flex-1 h-9 bg-white/5 rounded-full border border-white/5 px-4 flex items-center text-xs text-slate-500">
        Type a message...
      </div>
      <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
        <Send size={14} />
      </div>
    </div>
  </div>
);
