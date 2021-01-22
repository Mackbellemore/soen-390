module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    mocha: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
    'standard',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/prettier',
    'prettier/standard',
    'plugin:import/warnings',
    'plugin:import/errors',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'promise', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
    'node/no-missing-import': [
      'error',
      {
        allowModules: ['express'],
        resolvePaths: ['node_modules/@types'],
        tryExtensions: ['.js', '.json', '.node', '.ts', '.d.ts'],
      },
    ],
    'node/no-unpublished-import': 'off',
    'no-process-exit': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
  },
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
