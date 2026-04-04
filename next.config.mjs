import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://i.ibb.co/**')],
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
