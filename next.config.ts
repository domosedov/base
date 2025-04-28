import type { NextConfig } from 'next'
import { swcPlugins } from './swc-plugins.config'

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins,
    reactCompiler: true,
    dynamicIO: true,
    useCache: true,
    nodeMiddleware: true,
  },
  async rewrites() {
    return [
      {
        source: '/jsonp/:path*',
        destination: 'https://jsonplaceholder.typicode.com/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'X-Accel-Buffering',
            value: 'no',
          },
        ],
      },
    ]
  },
}

export default nextConfig
