import { MetadataRoute } from 'next';

import { posts } from '.velite';

import { routing } from '@/lib/i18n/routing';
import { HOST } from '@/utils/constants/host';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/projects', '/blog', '/contact'];

  const staticEntries = routes.flatMap((route) => {
    return routing.locales.map((locale) => ({
      url: `${HOST}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8
    }));
  });

  const blogEntries = posts.flatMap((post) => {
    return {
      url: `${HOST}/${post.locale}/blog/${post.slugAsParams}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    };
  });

  return [...staticEntries, ...blogEntries];
}
