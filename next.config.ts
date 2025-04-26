import type { NextConfig } from 'next'
import { swcPlugins } from './swc-plugins.config'

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins,
    reactCompiler: true,
    dynamicIO: true,
    useCache: true,
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
