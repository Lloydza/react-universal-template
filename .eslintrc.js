module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  root: true,
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'react', 'import'],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  settings: {
    'import/ignore': ['node_modules', '\\.less$', '\\.css$', '\\.(png|jpg|gif)$'],
    'import/resolver': {
      node: {
        paths: ['./src'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      arrowFunctions: true,
      defaultParams: true,
      spread: true,
      templateStrings: true,
    },
  },
  rules: {
    semi: ['error', 'always'],
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    'prettier/prettier': 'error',
    'arrow-body-style': ['error', 'always'],
    'import/prefer-default-export': 0,
    'import/no-cycle': 0,
    'no-console': 0,
    'no-use-before-define': 0,
    'no-restricted-syntax': 0,
    'react/forbid-prop-types': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'no-else-return': ['error', { allowElseIf: true }],
    'jsx-a11y/tabindex-no-positive': 0,
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
    'import/no-extraneous-dependencies': ['error', { packageDir: __dirname }],
    'array-bracket-newline': ['error', { multiline: true }],
    'object-curly-newline': [
      'error',
      {
        consistent: true,
        multiline: true,
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
  },
};
