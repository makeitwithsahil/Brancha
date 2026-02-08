import js from '@eslint/js';
import globals from 'globals';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'build/**', '*.config.js', 'scripts/**'],
  },
  js.configs.recommended,
  {
    ...reactRecommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // React Hooks
      ...reactHooks.configs.recommended.rules,
      
      // React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // Modern React (no import React needed)
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      
      // PropTypes (using runtime validation instead)
      'react/prop-types': 'off',
      
      // Code Quality
      'no-unused-vars': [
        'error',
        { 
          varsIgnorePattern: '^_', 
          argsIgnorePattern': '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'warn',
      
      // Performance
      'react/jsx-no-bind': ['warn', {
        allowArrowFunctions: true,
        allowBind: false,
        ignoreRefs: true,
      }],
      'react/no-array-index-key': 'warn',
      
      // Best Practices
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'no-param-reassign': 'warn',
      'curly': ['error', 'all'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-return-await': 'warn',
      
      // Code Style (minimal - rely on Prettier if used)
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
];
