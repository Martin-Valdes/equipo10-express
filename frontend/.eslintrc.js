module.exports = {
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    '@next/next/no-img-element': 'off',
  },
  ignorePatterns: ['node_modules/', '.next/', 'out/'],
}
