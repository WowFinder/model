module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.tests.json'],
    },
    plugins: ['prettier', '@typescript-eslint', 'deprecation'],
    rules: {
        'deprecation/deprecation': 'off',
        /*'@typescript-eslint/no-use-before-define': [
            'warn',
            {
                ignoreTypeReferences: false,
            },
        ],*/
        '@typescript-eslint/no-explicit-any': 'off',
        /*'@typescript-eslint/explicit-module-boundary-types': [
            'warn',
            {
                allowArgumentsExplicitlyTypedAsAny: false,
            },
        ],*/
        '@typescript-eslint/prefer-enum-initializers': 'error',
        'max-lines': [
            'error',
            {
                max: 200,
                skipBlankLines: true,
                skipComments: true,
            },
        ],
        complexity: ['error', 15],
    },
    overrides: [
        {
            files: ['*.test.ts*', '*.test.tsx'],
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
    ],
};
