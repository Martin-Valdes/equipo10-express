import { dirname } from "path";
import { fileURLToPath } from "url";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import nestjsPlugin from '@nestjs/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    plugins: {
      '@nestjs': nestjsPlugin,
    },
    rules: {
      ...nestjsPlugin.configs.recommended.rules,
      
      // Reglas específicas para TypeORM
      '@typescript-eslint/no-unused-vars': [
        'error', 
        { 
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_|Repository|Entity|Column' // Ignora variables de TypeORM
        }
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public' // Los constructores no necesitan 'public' explícito
          }
        }
      ],
      
      // Reglas para decoradores de TypeORM
      '@typescript-eslint/no-empty-interface': [
        'error',
        {
          allowSingleExtends: true // Permite interfaces vacías para entidades
        }
      ],
      
      // Reglas de NestJS ajustadas para TypeORM
      '@nestjs/use-validation-pipe': 'error',
      '@nestjs/use-dependency-injection': 'error',
      '@nestjs/controller-enforce-prefix': ['error', { prefix: 'api' }],
      
      // Relajamos algunas reglas para repositorios
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          decorators: true // Esencial para TypeORM
        }
      }
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        }
      }
    }
  },
  {
    ignores: [
      'dist/**',
      'migrations/**',
      '**/*.entity.ts',
      '**/*.dto.ts',
      'node_modules/**'
    ]
  }
);