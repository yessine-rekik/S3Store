// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'no-multi-spaces': 'error',
      'no-console': 'error',
    },
  },

  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended
  ),
];
