/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com', 'tedxkprit.in'],
  },
  async redirects() {
    return [
      {
        source: '/events/tedxkprit',
        destination: '/events/tedxkprit-2025-break-the-loop',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
