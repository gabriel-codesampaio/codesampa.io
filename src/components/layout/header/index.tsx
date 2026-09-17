'use client';

import { Github, Menu, ArrowRight, Linkedin } from 'lucide-react';
import { useTranslations } from 'next-intl';
// Importação do useState adicionada
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription
} from '@/components/ui/sheet';
import { Link } from '@/lib/i18n/navigation';

import { LanguageSwitcher } from './language-switcher';
import { NavLinks } from './nav-links';

export function Header() {
  const t = useTranslations('Components.Layout.Header');
  // 1. Estado para controlar o menu
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 inset-x-0 z-50 h-14 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        {/* Esquerda: Logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <Logo showText />
          </Link>
        </div>

        {/* Centro: Nav Desktop */}
        <nav className="hidden md:absolute md:left-1/2 md:top-1/2 md:block md:-translate-x-1/2 md:-translate-y-1/2">
          <NavLinks />
        </nav>

        {/* Direita: Ações */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hidden sm:flex h-9 w-9"
            asChild
          >
            <a
              href="https://github.com/gabriel-codesampaio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>

          <LanguageSwitcher />

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            {/* 2. Controlando o estado do Sheet */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="-mr-2 text-foreground hover:bg-primary/10 h-9 w-9"
                  aria-label={t('open_menu')}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full sm:w-[400px] border-l border-white/10 bg-black/80 backdrop-blur-2xl p-0 flex flex-col shadow-2xl"
              >
                <div className="absolute top-[-10%] right-[-10%] -z-10 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[100px] pointer-events-none opacity-50" />
                <div className="absolute bottom-[-10%] left-[-10%] -z-10 h-[300px] w-[300px] rounded-full bg-blue-600/20 blur-[100px] pointer-events-none opacity-50" />

                <SheetHeader className="text-center border-b border-white/5">
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <Logo width={48} />
                    <div className="flex flex-col gap-0">
                      <SheetTitle className="font-space font-bold text-2xl tracking-tight flex items-center gap-2 text-white">
                        codesampa.io
                      </SheetTitle>
                      <SheetDescription className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                        System Navigation
                      </SheetDescription>
                    </div>
                  </div>
                </SheetHeader>

                {/* Área de Navegação Principal */}
                <div className="flex-1 flex flex-col justify-center px-8">
                  <NavLinks
                    orientation="vertical"
                    onLinkClick={() => setIsOpen(false)}
                  />
                </div>

                {/* Rodapé do Menu */}
                <div className="p-6 border-t border-white/5 bg-white/2">
                  <div className="flex flex-col gap-4">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
                      Social & Code
                    </p>

                    {/* Botão GitHub */}
                    <Button
                      variant="outline"
                      className="w-full justify-between border-white/10 bg-white/5 hover:bg-white/10 hover:text-white hover:border-primary/50 text-slate-300 h-12 rounded-xl group transition-all"
                      asChild
                    >
                      <a
                        href="https://github.com/gabriel-codesampaio"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-center gap-3">
                          <Github className="h-5 w-5" />
                          <span className="font-semibold">GitHub Profile</span>
                        </div>
                        <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </a>
                    </Button>

                    {/* Botão LinkedIn */}
                    <Button
                      variant="outline"
                      className="w-full justify-between border-white/10 bg-white/5 hover:bg-white/10 hover:text-white hover:border-blue-500/50 text-slate-300 h-12 rounded-xl group transition-all"
                      asChild
                    >
                      <a
                        href="https://www.linkedin.com/in/gabriel-codesampaio/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-center gap-3">
                          <Linkedin className="h-5 w-5" />
                          <span className="font-semibold">
                            LinkedIn Profile
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </a>
                    </Button>
                  </div>

                  <div className="mt-8 flex justify-between items-center text-[10px] text-muted-foreground/50 font-mono">
                    <span>v1.0.0</span>
                    <span>© {new Date().getFullYear()} codesampa.io</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
