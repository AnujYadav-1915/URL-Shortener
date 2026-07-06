/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.qrserver.com', 'ui-avatars.com'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
