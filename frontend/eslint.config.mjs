import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      "@typescript-eslint/no-unused-vars": "off",
    "@next/next/no-img-element": "off",
      // Disable all TypeScript and JavaScript unused variable rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      
      // Disable Next.js specific rules
      '@next/next/no-img-element': 'off',
      '@next/next/no-page-custom-font': 'off',
      
      // Disable React hooks rules that might cause issues
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'off',
      
      // Disable other common lint rules
      'prefer-const': 'off',
      'no-console': 'off',
      'no-debugger': 'off',
    }
  }
];

export default eslintConfig;
