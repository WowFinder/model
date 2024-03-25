module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: [
        'standard',
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.tests.json'],
    },
    plugins: [
        'prettier',
        '@typescript-eslint',
        'deprecation',
        'misc',
        'istanbul',
    ],
    rules: {
        'istanbul/no-ignore-file': 'error',
        'istanbul/prefer-ignore-reason': 'error',
        'deprecation/deprecation': 'warn',
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
        semi: 'off',
        '@typescript-eslint/semi': ['error'],
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
        '@typescript-eslint/explicit-module-boundary-types': [
            'error',
            {
                allowArgumentsExplicitlyTypedAsAny: true,
            },
        ],
        '@typescript-eslint/prefer-enum-initializers': 'warn',
        'max-lines': [
            'warn',
            {
                max: 150,
                skipBlankLines: true,
                skipComments: true,
            },
        ],
        complexity: ['warn', 10],
        '@typescript-eslint/no-non-null-assertion': 'off',
        // https://iliubinskii.github.io/eslint-plugin-misc/#rules
        // Not yet: 'misc/class-match-filename': 'warn',
        'misc/no-shadow': 'warn',
        'misc/sort-construct-signature': 'error',
        // Not yet: 'misc/sort-class-members': 'warn',
        // 'misc/typescript/no-unsafe-object-assignment': 'error',
    },
    overrides: [
        {
            files: ['*.test.ts*', '*.test.tsx'],
            rules: {
                '@typescript-eslint/no-empty-function': 'off',
                'max-lines': [
                    'warn',
                    {
                        max: 300,
                        skipBlankLines: true,
                        skipComments: true,
                    },
                ],
                complexity: ['warn', 5],
            },
        },
    ],
};
