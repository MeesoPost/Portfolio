import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';

export default [
  js.configs.recommended,
  {
    ignores: [
      // 3rd party files
      'node_modules/**',
      'vendor/**',

      // Generated files
      'build/**',
      'coverage/**',
      'dist/**',
      'tmp/**',

      // Generated Stencil files
      'components/components.d.ts',
      'packages/web-components-angular/src/directives/angular-component-lib/utils.ts',
      'packages/web-components-angular/src/directives/proxies.ts',
      'packages/web-components-stencil/loader/**',
      'packages/web-components-react/src/react-component-lib/**',
      'packages/web-components-react/src/components.ts',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react-refresh': reactRefresh,
      'react-hooks': reactHooks,
      storybook: storybook,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      ...typescript.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...storybook.configs.recommended.rules,
    },
  },
];
