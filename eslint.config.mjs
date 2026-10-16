import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importHelpers from 'eslint-plugin-import-helpers';

export default defineConfig([
  ...nextVitals,

  // Ignora pastas e arquivos gerados
  globalIgnores([
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Skills do Claude Code / agentes (fora do git)
    '.claude/**',
    '.agents/**'
  ]),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        es2021: true
      }
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': tsPlugin,
      'import-helpers': importHelpers
    },

    rules: {
      // Regras React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',

      // Regras React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',

      // Ordem de imports personalizada
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            ['/^react/', '/^next/', 'module'],
            [
              '/^@app/',
              '/^@/components/',
              '/^@/lib/',
              '/^@/utils/',
              '/^@/assets/'
            ],
            ['parent', 'sibling', 'index'] // Relative
          ],
          alphabetize: { order: 'asc', ignoreCase: true }
        }
      ]
    }
  }
]);
