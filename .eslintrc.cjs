/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'airbnb-base/legacy',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  "rules": {
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"]
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
