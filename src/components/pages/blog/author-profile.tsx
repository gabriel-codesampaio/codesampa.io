import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AuthorProfile() {
  const t = useTranslations('Components.Pages.Blog.AuthorProfile');

  return (
    <div className="flex flex-row gap-2 items-center">
      <Avatar className="h-12 w-12 border-2 border-primary/20 bg-background">
        <AvatarImage
          src="https://github.com/gabriel-codesampaio.png"
          alt="Gabriel Sampaio"
        />
        <AvatarFallback>GS</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1.5">
        <span className="font-space font-bold text-lg text-foreground leading-none">
          Gabriel Sampaio
        </span>
        <span className="text-xs text font-mono tracking-widest text-muted-foreground">
          {t('role')}
        </span>
      </div>
    </div>
  );
}
