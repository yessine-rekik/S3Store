// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },

  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended
  ),
];
