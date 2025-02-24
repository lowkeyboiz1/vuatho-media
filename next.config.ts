import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-sandbox.vuatho.com'
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com'
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com'
      }
    ]
  }
}

export default nextConfig
