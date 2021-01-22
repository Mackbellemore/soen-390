module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard',
    'prettier',
    'prettier/standard',
    'prettier/react',
    'prettier/prettier',
    'prettier/babel',
    'eslint:recommended',
    'plugin:import/warnings',
    'plugin:import/errors',
    'plugin:react-hooks/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@babel', 'prettier', 'promise'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: '17',
    },
  },
};
