import { defaultExclude, defineWorkspace } from 'vitest/config'

const sharedExclude = ['**/e2e/**', '.next', '.swc', 'public']

export default defineWorkspace([
  {
    extends: 'vitest.config.mts',
    test: {
      name: 'node',
      environment: 'node',
      exclude: [
        ...defaultExclude,
        ...sharedExclude,
        '**/*.browser.{test,spec}.{ts,tsx}',
      ],
    },
  },
  {
    extends: 'vitest.config.mts',
    test: {
      name: 'browser',
      include: ['**/*.browser.{test,spec}.{ts,tsx}'],
      exclude: [
        ...defaultExclude,
        ...sharedExclude,
        '**/*.node.{test,spec}.{ts,tsx}',
      ],
      browser: {
        enabled: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }],
      },
      setupFiles: ['./tests/vitest.browser.ts'],
    },
  },
])
