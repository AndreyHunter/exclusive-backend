import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    js.configs.recommended,
    {
        ignores: ['node_modules', 'eslint.config.js'],
        files: ['**/*.{js,ts}'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2021,
            },
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            prettier: eslintPluginPrettier,
        },
    },
    {
        rules: {
            ...eslintConfigPrettier.rules,

            'no-console': 'warn',
            'no-undef': 'error',
            'no-extra-semi': 'error',
            'no-empty': ['error', { allowEmptyCatch: true }],
            'no-unreachable': 'error',
            'prefer-const': 'error',
            'no-unused-vars': 'off',

            // Code style
            semi: ['error', 'always'],
            indent: ['error', 4],
            quotes: ['error', 'single'],
            'comma-dangle': ['error', 'always-multiline'],
        },
    },
];