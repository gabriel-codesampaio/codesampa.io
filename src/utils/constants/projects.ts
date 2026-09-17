import { Database, FileText } from 'lucide-react';
import {
  FaMobileAlt,
  FaLayerGroup,
  FaDesktop,
  FaReact,
  FaGlobe,
  FaCode,
  FaEnvelope // Importado para o ícone do projeto
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiPrisma,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiStripe,
  SiFramer,
  SiTailwindcss,
  SiVercel,
  SiClerk,
  SiShadcnui,
  SiTypescript,
  SiHtml5,
  SiJavascript,
  SiFirebase, // Importado
  SiStyledcomponents, // Importado
  SiChakraui // Importado
} from 'react-icons/si';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TECH_ICONS: Record<string, any> = {
  'React Native': FaReact,
  'Next.js 15': SiNextdotjs,
  'Neon DB': Database,
  Prisma: SiPrisma,
  'Node.js': SiNodedotjs,
  'OpenAI API': SiOpenai,
  Postgres: SiPostgresql,
  Stripe: SiStripe,
  React: FaReact,
  'Framer Motion': SiFramer,
  Tailwind: SiTailwindcss,
  'Tailwind CSS': SiTailwindcss,
  Vercel: SiVercel,
  Clerk: SiClerk,
  Shadcn: SiShadcnui,
  TypeScript: SiTypescript,
  'Tailwind v4': SiTailwindcss,
  'React 19': FaReact,
  'Next.js 16': SiNextdotjs,
  Velite: FileText,
  HTML5: SiHtml5,
  JavaScript: SiJavascript,
  Asaas: SiStripe,
  AI: SiOpenai,
  // Novos ícones adicionados
  Firebase: SiFirebase,
  'Styled Components': SiStyledcomponents,
  'Chakra UI': SiChakraui
};

export const LIST_PROJECTS = [
  {
    key: 'kingfix',
    isProduct: true,
    category: 'mobile',
    tags: [
      'Next.js 15',
      'React 19',
      'Neon DB',
      'Prisma',
      'Clerk',
      'Stripe',
      'Shadcn'
    ],
    color: 'from-[#FF6900] to-orange-600',
    icon: FaMobileAlt,
    link: '#',
    repo: '#',
    metrics: ['metric_1', 'metric_2', 'metric_3'],
    image: '/assets/projects/kingfix-cover.png'
  },
  {
    key: 'devrex',
    isProduct: true,
    category: 'saas',
    tags: ['Node.js', 'OpenAI API', 'Postgres', 'Stripe'],
    color: 'from-violet-600 to-fuchsia-600',
    icon: FaLayerGroup,
    link: '#',
    repo: '#',
    metrics: ['metric_1', 'metric_2', 'metric_3'],
    image: '/assets/projects/devrex-cover.png'
  },
  {
    key: 'psialexia',
    isProduct: true,
    category: 'web',
    tags: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Vercel'],
    color: 'from-rose-500 to-pink-600',
    icon: FaGlobe,
    link: 'https://psialexiamarques.com.br/',
    repo: '#',
    metrics: ['metric_1', 'metric_2', 'metric_3'],
    interviewLink: '/blog/interview-alexia'
  },
  {
    key: 'codesampa',
    isProduct: false,
    category: 'web',
    tags: [
      'Next.js 16',
      'React 19',
      'Tailwind v4',
      'Velite',
      'TypeScript',
      'Framer Motion'
    ],
    color: 'from-primary to-blue-600',
    icon: FaDesktop,
    link: '#',
    repo: 'https://github.com/gabriel-codesampaio/codesampa.io',
    metrics: ['metric_1', 'metric_2', 'metric_3']
  },
  {
    key: 'mycard4you',
    isProduct: true,
    category: 'saas',
    tags: [
      'React',
      'TypeScript',
      'Firebase',
      'Stripe',
      'Styled Components',
      'Chakra UI'
    ],
    color: 'from-red-300 to-rose-600',
    icon: FaEnvelope,
    link: 'https://mycard4you.com',
    repo: '#',
    metrics: ['metric_1', 'metric_2', 'metric_3'],
    image: '/assets/projects/mycard4you-cover.png',
    interviewLink: '/blog/case-mycard4you'
  }
];

export const LIST_SECONDARY_PROJECTS = [
  {
    key: 'codelab',
    category: 'web',
    tags: [
      'React',
      'Next',
      'Prisma',
      'Asaas',
      'OpenAPI',
      'Cloudeflare',
      'Tailwind',
      'RHF',
      'Zod'
    ],
    icon: FaCode,
    link: '#',
    repo: 'https://github.com/gabriel-codesampaio/codelab'
  },
  {
    key: 'finance_ai',
    category: 'saas',
    tags: [
      'React',
      'Next',
      'OpenAI',
      'TypeScript',
      'Stripe',
      'Clerk',
      'Prisma',
      'Tailwind',
      'Shadcn',
      'RHF',
      'ZOD'
    ],
    icon: FaLayerGroup,
    link: '#',
    repo: 'https://github.com/gabriel-codesampaio/finance-ai'
  },
  {
    key: 'lonewolf',
    category: 'web',
    tags: ['React', 'TypeScript', 'Styled-Components', 'Vite', 'SEO'],
    icon: FaDesktop,
    link: '#',
    repo: 'https://github.com/gabriel-codesampaio/landpage-lonewolf'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'mobile', label: 'Mobile App' },
  { id: 'saas', label: 'SaaS' },
  { id: 'web', label: 'Web & Brand' }
];
