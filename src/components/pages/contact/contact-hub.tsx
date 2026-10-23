'use client';

import { motion, Variants } from 'framer-motion';
import {
  Mail,
  MessageCircle,
  Calendar,
  Copy,
  Check,
  ArrowUpRight
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { CONTACT_EMAIL } from '@/utils/constants/contact';
import useIsMobile from '@/utils/hooks/use-mobile';

const SOCIALS = {
  email: CONTACT_EMAIL,
  calendly: 'https://cal.com/codesampa.io'
};

export function ContactHub() {
  const t = useTranslations('Pages.Contact.Hub');
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SOCIALS.email);
    setCopied(true);
    toast.success(t('email.toast_success'));
    setTimeout(() => setCopied(false), 2000);
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:h-[380px]">
      <motion.button
        custom={0}
        variants={cardVariants}
        initial={isMobile ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true }}
        onClick={handleCopyEmail}
        className="group relative col-span-1 md:col-span-3 flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/10 to-transparent p-6 md:p-8 text-left transition-colors hover:border-white/20 hover:from-white/20"
      >
        <div className="absolute right-4 top-4 rounded-full bg-white/10 p-2 transition-colors group-hover:bg-white/20">
          {copied ? (
            <Check size={20} className="text-emerald-400" />
          ) : (
            <Copy size={20} />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">
            <Mail size={24} />
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            {t('email.label')}
          </h3>
        </div>

        <div>
          <p className="text-lg md:text-xl font-mono text-foreground/80 break-all">
            {SOCIALS.email}
          </p>
        </div>

        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[80px] transition-colors group-hover:bg-blue-500/30" />
      </motion.button>

      {/* <motion.a
        href={SOCIALS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        custom={1}
        variants={cardVariants}
        initial={isMobile ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true }}
        className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-emerald-500/10 to-transparent p-6 md:p-8 transition-colors hover:border-emerald-500/30 hover:from-emerald-500/20"
      >
        <div className="absolute right-4 top-4 opacity-50 transition-opacity group-hover:opacity-100">
          <ArrowUpRight size={20} />
        </div>
        <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
          <MessageCircle size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold">{t('whatsapp.label')}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {t('whatsapp.sub')}
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20" />
      </motion.a> */}

      <motion.a
        href={SOCIALS.calendly}
        target="_blank"
        rel="noopener noreferrer"
        custom={3}
        variants={cardVariants}
        initial={isMobile ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true }}
        className="group relative col-span-1 md:col-span-3 flex items-center justify-between overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-primary/10 to-transparent p-6 md:p-8 transition-colors hover:border-primary/40 hover:from-primary/20"
      >
        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-2 text-primary-text mb-2">
            <Calendar size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">
              {t('schedule.badge')}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black font-space">
            {t('schedule.title')}
          </h3>
          <p className="text-muted-foreground text-sm max-w-sm">
            {t('schedule.desc')}
          </p>
        </div>
        <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110 group-hover:rotate-45">
          <ArrowUpRight size={28} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-primary)_1px,transparent_1px)] bg-size-[20px_20px] opacity-5 group-hover:opacity-10 transition-opacity" />
      </motion.a>
    </div>
  );
}
