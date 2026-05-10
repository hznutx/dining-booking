import { defineConfig, globalIgnores } from 'eslint/config'
import { fixupConfigRules } from '@eslint/compat'

import unusedImports from 'eslint-plugin-unused-imports'
import importPlugin from 'eslint-plugin-import'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  globalIgnores([
    '.next/*',
    'node_modules/*',
    'dist/*',
    'build/*',
    'coverage/*',
    'public/*',
    '**/*.css',
  ]),

  {
    extends: fixupConfigRules(
      compat.extends(
        'next/core-web-vitals',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
      ),
    ),

    files: ['**/*.ts', '**/*.tsx'],

    plugins: {
      'unused-imports': unusedImports,
      import: importPlugin,
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,

      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'no-console': 'warn',

      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',

      'unused-imports/no-unused-imports': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],

      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],

          'newlines-between': 'always',
        },
      ],
    },
  },
])
