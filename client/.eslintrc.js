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
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    requireConfigFile: false,
  },
  plugins: ['react', 'react-hooks', '@babel', 'prettier', 'promise'],
  rules: {
    'import/extensions': ['error', 'ignorePackages'],
    'no-console': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: '17',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
