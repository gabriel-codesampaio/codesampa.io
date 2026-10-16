'use client';

import { Share2, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

interface ShareButtonProps {
  title: string;
  text: string;
}

export function ShareButton({ title, text }: ShareButtonProps) {
  const t = useTranslations('Components.Pages.Blog.ShareButton');
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title,
      text,
      url: shareUrl
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success(t('share_success'));

        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast.error(t('share_error'));
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="gap-2 rounded-full border-white/10 hover:bg-white/5 hover:border-primary/30 transition-all group"
    >
      {copied ? (
        <Check size={14} className="text-emerald-400" />
      ) : (
        <Share2
          size={14}
          className="group-hover:text-primary-text transition-colors"
        />
      )}
      <span>{copied ? t('share_copied') : t('share')}</span>
    </Button>
  );
}
