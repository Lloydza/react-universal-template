module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  root: true,
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'react', 'import'],
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
        paths: ['./src', './tests/__tests__'],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
      arrowFunctions: true,
      defaultParams: true,
      spread: true,
      templateStrings: true,
    },
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'semi': ['error', 'always'],
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
    "no-param-reassign": ["error", {
      props: true,
      ignorePropertyModificationsFor: ["draft", "ctx"],
    }],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'prettier/prettier': 'error',
    'arrow-body-style': ['error', 'always'],
    'no-console': "off",
    'require-atomic-updates': "off",
    'no-use-before-define': "off",
    'no-restricted-syntax': "off",
    'no-else-return': ['error', { allowElseIf: true }],
    'array-bracket-newline': ['error', { multiline: true }],
    'object-curly-newline': [
      'error',
      {
        consistent: true,
        multiline: true,
      },
    ],
    'jsx-a11y/tabindex-no-positive': "off",
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
    'import/prefer-default-export': "off",
    'import/no-cycle': "off",
    'import/no-extraneous-dependencies': ['error', { packageDir: __dirname }],
    'react/jsx-props-no-spreading': "off",
    'react/jsx-filename-extension': "off",
    'react/state-in-constructor': "off",
    '@typescript-eslint/no-unused-vars': "error",
    '@typescript-eslint/explicit-function-return-type': "error",
    '@typescript-eslint/no-unused-expressions': "error",
    '@typescript-eslint/consistent-type-assertions':"off",
    '@typescript-eslint/no-explicit-any': "off",
    '@typescript-eslint/no-var-requires': "off",
    '@typescript-eslint/no-use-before-define': "off",
    '@typescript-eslint/require-await': "off",
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Function: 'Use arrow function instead',
          Array: 'Use [] instead',
          Object: 'Use {} instead',
          Number: {
            message: 'Use number instead',
            fixWith: 'number',
          },
          String: {
            message: 'Use string instead',
            fixWith: 'string',
          },
          Boolean: {
              message: 'Use boolean instead',
              fixWith: 'boolean',
          },
        },
      },
    ],
    '@typescript-eslint/typedef': [
      "error",
      {
        "arrayDestructuring": false,
        "objectDestructuring": false,
        "memberVariableDeclaration": false,
        "propertyDeclaration": false,
        "variableDeclaration": false,
        "arrowParameter": true,
        "parameter": true,
      }
    ],
    '@typescript-eslint/no-inferrable-types': [
      "error",
      {
        "ignoreParameters": true,
      }
    ],
  },
  overrides: [
    {
      files: ['src/**/*.js', 'tests/mocks/*'],
      rules: {
        '@typescript-eslint/no-unused-vars': "off",
        '@typescript-eslint/explicit-function-return-type': "off",
        '@typescript-eslint/no-unused-expressions': "off",
        '@typescript-eslint/consistent-type-assertions':"off",
        '@typescript-eslint/no-explicit-any': "off",
        '@typescript-eslint/no-var-requires': "off",
        '@typescript-eslint/no-use-before-define': "off",
        '@typescript-eslint/ban-types': "off",
        '@typescript-eslint/typedef': "off",
        '@typescript-eslint/no-inferrable-types': "off",
        '@typescript-eslint/require-await': "off",
      },
    },
  ]
};
