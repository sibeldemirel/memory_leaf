import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';

export default [
  {
    files: ['src/**/*.ts'],
    ignores: [
      'node_modules/',
      'dist/',
      'prisma/',
      'generated/',
      'eslint.config.js',
      'tsconfig*.json'
    ],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
    },
    rules: {
      'no-unused-vars': 'warn',
      'eqeqeq': 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      //'@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    },
  },
];
