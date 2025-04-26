import type { NextConfig } from 'next'
import { swcPlugins } from './swc-plugins.config'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    swcPlugins,
  },
}

export default nextConfig
