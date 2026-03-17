import prettier from 'eslint-plugin-prettier';
import stylisticJs from '@stylistic/eslint-plugin';
import globals from 'globals';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import ts from 'typescript-eslint';

export default [
    ...defineConfig(
        js.configs.recommended,
        ts.configs.recommended,
    ),
    {
        ignores: [
            '*/.js',
            '**/*.js*',
            '*.*js',
            '**/tests',
            '**/electron',
            '**/node_modules',
            '**/dist',
            'webpack/*.js',
            '**/.webpack',
            '**/out',
            '**/.yarn',
        ],
    },
    {
        plugins: {
            prettier,
            '@stylistic/js': stylisticJs,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },

            ecmaVersion: 12,
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },

                project: ['./tsconfig.json', './tsconfig.tests.json'],
            },
        },

        rules: {
            'max-lines': [
                'error',
                {
                    max: 200,
                    skipBlankLines: true,
                    skipComments: true,
                },
            ],
            quotes: [
                'error',
                'single',
                {
                    avoidEscape: true,
                },
            ],
            'react/prop-types': 'off',
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowExpressions: true,
                },
            ],
            'no-return-assign': 'off',
            '@stylistic/js/semi': ['error'],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error'],
            'no-use-before-define': 'off',
            '@typescript-eslint/no-use-before-define': [
                'error',
                {
                    ignoreTypeReferences: true,
                },
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/prefer-enum-initializers': 'warn',

            '@typescript-eslint/consistent-type-imports': [
                'warn',
                {
                    fixStyle: 'inline-type-imports',
                    prefer: 'type-imports',
                    disallowTypeAnnotations: true,
                },
            ],

            complexity: ['error', 15],
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    },
    {
        files: ['**/*.test.ts*', '**/*.test.tsx'],

        rules: {
            '@typescript-eslint/no-empty-function': 'off',
            'max-lines': [
                'error',
                {
                    max: 500,
                    skipBlankLines: true,
                    skipComments: true,
                },
            ],
        },
    },
];

