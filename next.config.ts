import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const isDev = process.argv.indexOf('dev') !== -1;
const isBuild = process.argv.indexOf('build') !== -1;
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1';
  import('velite').then((m) => m.build({ watch: isDev, clean: !isDev }));
}

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com'
      }
    ]
  }
};

export default withNextIntl(nextConfig);
