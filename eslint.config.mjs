// @ts-check
import { FlatCompat } from '@eslint/eslintrc'
import vitest from '@vitest/eslint-plugin'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:@reatom/recommended',
      'prettier',
    ],
    plugins: ['@reatom'],
  }),
  // Vitest config
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    ignores: ['**/e2e/**'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.all.rules,
      'vitest/max-expects': ['warn', { max: 10 }],
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
]

export default eslintConfig
