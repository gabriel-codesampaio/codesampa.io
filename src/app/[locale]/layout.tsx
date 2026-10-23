import { MotionConfig } from 'framer-motion';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { ReducedMotion } from '@/components/providers/reduced-motion';
import { Toaster } from '@/components/ui/sonner';
import { HOST } from '@/utils/constants/host';
import { EN_US, PT_BR } from '@/utils/constants/languages';
import { buildAlternates } from '@/utils/functions/alternates';

import '../../utils/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space',
  subsets: ['latin'],
  weight: ['400', '500', '700']
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // Deve espelhar --primary em src/utils/styles/globals.css (oklch não é suportado
  // por browsers em <meta name="theme-color">, por isso o hex fixo).
  themeColor: '#0047FF'
};

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL(HOST),
    // manifest: `/${locale}/manifest.webmanifest`,
    // Vale para a home; as demais páginas declaram o próprio canonical
    alternates: buildAlternates(locale, ''),
    icons: {
      icon: [
        { url: '/favicons/favicon.ico' },
        {
          url: '/favicons/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png'
        },
        {
          url: '/favicons/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png'
        }
      ],
      apple: [{ url: '/favicons/apple-touch-icon.png' }]
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${HOST}/${locale}`,
      siteName: 'codesampa.io',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: t('title')
        }
      ],
      locale: locale === PT_BR ? PT_BR : EN_US,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.png'],
      creator: '@sampaiogabriel'
    }
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'Components.Layout.Header'
  });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      // O site é sempre escuro: o tema vem fixo no HTML do servidor, sem
      // depender de script (antes a página nascia clara se o JS falhasse)
      className={`dark ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
      style={{ colorScheme: 'dark' }}
    >
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased flex flex-col min-h-svh`}
      >
        <NextIntlClientProvider>
          <MotionConfig reducedMotion="user">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              {t('skip_to_content')}
            </a>
            <ReducedMotion />
            <Header />
            <Toaster />
            <main id="main-content" className="grow">
              {children}
            </main>
            <Footer />
          </MotionConfig>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
