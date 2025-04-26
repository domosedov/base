import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import { swcPlugins } from './swc-plugins.config'

export default defineConfig({
  plugins: [
    react({
      plugins: swcPlugins,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
