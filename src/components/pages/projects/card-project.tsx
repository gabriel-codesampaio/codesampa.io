import {
  useScroll,
  useTransform,
  useSpring,
  useInView,
  motion
} from 'framer-motion';
import {
  Archive,
  ArrowUpRight,
  Github,
  MessageSquarePlus,
  CheckCircle2,
  Timer,
  Sparkles,
  Newspaper
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { StatusDot } from '@/components/ui/status-dot';
import { Link } from '@/lib/i18n/navigation';
import { LIST_PROJECTS, TECH_ICONS } from '@/utils/constants/projects';
import { cn } from '@/utils/functions/tw-merge';

const CardProject = ({
  project,
  index
}: {
  project: (typeof LIST_PROJECTS)[number]; // Adicionando tipagem opcional aqui
  index: number;
}) => {
  const t = useTranslations('Pages.Projects');
  const cardRef = useRef<HTMLDivElement>(null);

  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });
  const finalY = isReducedMotion ? 0 : smoothY;

  const isInView = useInView(cardRef, { once: true, margin: '-10%' });

  // Criamos uma constante para o ícone para usá-lo como JSX
  const ProjectIcon = project.icon;

  // Verificações de link válido
  const hasLink =
    project.link && project.link.trim() !== '' && project.link !== '#';
  const hasRepo =
    project.repo && project.repo.trim() !== '' && project.repo !== '#';

  // Verifica se existe link de entrevista
  const hasInterview =
    project.interviewLink && project.interviewLink.trim() !== '';

  // Print do site; cai no placeholder se não existir ou falhar ao carregar
  const [imageError, setImageError] = useState(false);
  const hasImage = !!project.image && !imageError;
  const hostname = hasLink
    ? new URL(project.link).hostname.replace(/^www\./, '')
    : t(`projects.${project.key}.title`);

  return (
    <motion.article
      layout
      ref={cardRef}
      // O 1º card fica acima da dobra no celular: sem entrada animada, para o
      // print (LCP da página) aparecer sem esperar a hidratação
      initial={index === 0 ? false : { opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="group relative mb-20 grid w-full grid-cols-1 gap-8 last:mb-0 lg:min-h-[500px] lg:grid-cols-2 lg:items-center lg:gap-16"
    >
      <div
        className={cn(
          'flex flex-col gap-8 z-10',
          index % 2 === 1 ? 'lg:order-2' : ''
        )}
      >
        {/* Cabeçalho */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div
              className={cn(
                'p-2 rounded-lg bg-linear-to-br bg-opacity-10 bg-clip-border border border-white/10 text-white shadow-lg',
                project.color
              )}
            >
              <ProjectIcon size={24} />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {t(`projects.${project.key}.category`)}
            </span>
          </div>

          {/* TÍTULO + BOTÃO DE ENTREVISTA */}
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 className="font-space text-3xl font-black leading-tight text-white md:text-5xl">
              {t(`projects.${project.key}.title`)}
            </h2>

            {hasInterview && (
              <Link
                href={project.interviewLink!}
                className="group/interview relative inline-flex min-h-11 items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 transition-colors hover:border-white/20 hover:bg-white/10"
              >
                {/* Background Glow sutil baseado na cor do projeto */}
                <div
                  className={cn(
                    'absolute inset-0 opacity-0 transition-opacity group-hover/interview:opacity-20 bg-linear-to-r',
                    project.color
                  )}
                />

                <StatusDot
                  className={cn(
                    'shadow-[0_0_8px_currentColor]',
                    // Extrai a cor primária da classe do projeto para o ponto brilhante
                    project.color?.includes('blue')
                      ? 'text-blue-400'
                      : project.color?.includes('emerald')
                        ? 'text-emerald-400'
                        : project.color?.includes('purple')
                          ? 'text-purple-400'
                          : 'text-white'
                  )}
                  dotClassName={
                    project.color?.includes('blue')
                      ? 'bg-blue-400'
                      : project.color?.includes('emerald')
                        ? 'bg-emerald-400'
                        : project.color?.includes('purple')
                          ? 'bg-purple-400'
                          : 'bg-white'
                  }
                  pingClassName="bg-current"
                />

                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white/90 group-hover/interview:text-white">
                    {t('cta_read_interview')}
                  </span>
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="text-white/70 transition-transform group-hover/interview:-translate-y-0.5 group-hover/interview:translate-x-0.5 group-hover/interview:text-white"
                  />
                </div>
              </Link>
            )}
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            {t(`projects.${project.key}.description`)}
          </p>
        </div>

        {/* Grid de Métricas de Impacto */}
        <div className="grid grid-cols-3 gap-3 border-y border-white/5 py-6 md:gap-4">
          {project.metrics?.map((metricId, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-lg font-bold leading-tight text-foreground md:text-2xl">
                {t(`projects.${project.key}.metrics_data.${i}.value`)}
              </span>
              <span className="text-xs text-muted-foreground">
                {t(`projects.${project.key}.metrics_data.${i}.label`)}
              </span>
            </div>
          ))}
        </div>

        {/* Lista de tecnologias: não interativa (sem paradas de Tab); o nome vai
            para o leitor de tela e aparece em tooltip no hover */}
        <ul
          aria-label={t('tech_stack_label')}
          className="flex flex-wrap items-center gap-4"
        >
          {project.tags.map((tag) => {
            const Icon = TECH_ICONS[tag] || CheckCircle2;
            return (
              <li
                key={tag}
                className="group/icon relative flex items-center justify-center p-2 rounded-md bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors"
              >
                <Icon size={18} className="text-slate-300" aria-hidden="true" />
                <span className="sr-only">{tag}</span>
                <span
                  aria-hidden="true"
                  className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-xs text-white rounded opacity-0 transition-opacity whitespace-nowrap pointer-events-none group-hover/icon:opacity-100"
                >
                  {tag}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Botões de Ação */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.discontinued ? (
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-bold text-muted-foreground ring-1 ring-white/10">
              <Archive size={16} aria-hidden="true" />
              <span>{t('status_discontinued')}</span>
            </div>
          ) : project.isProduct ? (
            hasLink ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-105"
              >
                {t('cta_access_product')} <ArrowUpRight size={16} />
              </a>
            ) : (
              <div className="flex cursor-not-allowed items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-bold text-muted-foreground ring-1 ring-white/10">
                <Timer size={16} />
                <span>{t('cta_coming_soon')}</span>
              </div>
            )
          ) : hasRepo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-105"
            >
              <Github size={16} />
              <span>{t('cta_view_repo')}</span>
            </a>
          ) : (
            <div className="flex cursor-not-allowed items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-bold text-muted-foreground ring-1 ring-white/10">
              <Timer size={16} />
              <span>{t('cta_coming_soon')}</span>
            </div>
          )}

          <Link
            href="/contact"
            className="ml-auto flex min-h-11 items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary-text transition-colors"
          >
            <MessageSquarePlus size={16} aria-hidden="true" />
            {t('cta_want_similar')}
          </Link>
        </div>
      </div>

      {/* --- COLUNA DA IMAGEM --- */}
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl transition-colors hover:border-white/20',
          // No celular o print vem primeiro (antes ficava depois de ~1,5 tela de texto)
          'order-first',
          index % 2 === 1 ? 'lg:order-1' : 'lg:order-0',
          'h-[350px] md:h-[450px] lg:h-[600px]'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 z-0 bg-linear-to-br opacity-25 blur-3xl filter saturate-150 transition-opacity duration-500 group-hover:opacity-40',
            project.color
          )}
        />
        {/* Parallax só no fundo: transformar o print o deixaria borrado */}
        <motion.div
          style={{ y: finalY }}
          className="absolute inset-x-0 -top-[15%] z-0 h-[130%] w-full"
        >
          <div
            className={cn(
              'h-full w-full bg-linear-to-br opacity-20',
              project.color
            )}
          />
        </motion.div>

        {/* Janela de navegador com o print do site */}
        <div className="absolute -bottom-px left-[6%] right-[6%] top-[8%] z-10 flex flex-col overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-[#0B0C10] shadow-2xl transition-transform duration-500 group-hover:-translate-y-3 md:left-[8%] md:right-[8%]">
          <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-white/5 px-3">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="mx-auto truncate rounded bg-white/5 px-3 py-0.5 font-mono text-xs text-white/70">
              {hostname}
            </span>
          </div>

          <div className="relative flex-1 overflow-hidden bg-slate-900/80">
            {hasImage ? (
              <Image
                src={project.image!}
                alt={t(`projects.${project.key}.title`)}
                width={1280}
                height={1600}
                quality={90}
                preload={index === 0}
                sizes="(min-width: 1024px) 560px, (min-width: 768px) 85vw, 90vw"
                className="h-auto w-full"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-widest text-white/30">
                <Timer size={16} />
                {t('cta_coming_soon')}
              </span>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-linear-to-t from-black/50 to-transparent" />
      </div>
    </motion.article>
  );
};

export default CardProject;
