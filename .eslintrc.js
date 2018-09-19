module.exports = {
  parser: "babel-eslint",
  env: {
    "browser": true,
    "jest": true
  },
  plugins: [
    "react"
  ],
  parserOptions: {
    ecmaFeatures: {
      "jsx": true
    }
  },
  extends: 'airbnb',
  rules: {
    'import/no-unresolved': 0,
    "func-names": 0,
    "import/export": 0,
    "no-console": 0,
    "react/forbid-prop-types": 0
  },
};
