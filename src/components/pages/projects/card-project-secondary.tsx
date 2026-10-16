'use client';

import { motion } from 'framer-motion';
import { Github, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { LIST_SECONDARY_PROJECTS } from '@/utils/constants/projects';

export const CardProjectSecondary = ({
  project,
  index
}: {
  project: (typeof LIST_SECONDARY_PROJECTS)[0];
  index: number;
}) => {
  const t = useTranslations('Pages.Projects');
  const ProjectIcon = project.icon;

  return (
    <motion.a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/2 p-6 hover:border-white/10 hover:bg-white/4 transition-all"
    >
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-muted-foreground group-hover:text-primary-text transition-colors">
            <FolderGit2 size={20} aria-hidden="true" />
            <ProjectIcon size={16} aria-hidden="true" />
          </div>
          <div
            aria-hidden="true"
            className="flex gap-2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
          >
            {project.link !== '#' && (
              <span className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white">
                <ArrowUpRight size={14} />
              </span>
            )}
            <span className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white">
              <Github size={14} />
            </span>
          </div>
        </div>

        <h3 className="mb-2 font-space text-xl font-bold text-white">
          {t(`projects.${project.key}.title`)}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {t(`projects.${project.key}.description`)}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs font-mono text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
};
