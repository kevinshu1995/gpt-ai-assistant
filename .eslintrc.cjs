module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'prettier'],

  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/extensions': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
  },
};

