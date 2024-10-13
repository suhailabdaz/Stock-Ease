import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { ESLint } from 'eslint' 

export default {
  ignores: ['dist'],
  extends: [js.configs.recommended, 'plugin:@typescript-eslint/recommended'],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './src/features/auth_feature',
            from: './src/features',
            except: ['./auth_feature'],
          },
          {
            target: './src/features/customer_feature',
            from: './src/features',
            except: ['./customer_feature'],
          },
          {
            target: './src/features/inventory_feature',
            from: './src/features',
            except: ['./inventory_feature'],
          },
          {
            target: './src/features/report_feature',
            from: './src/features',
            except: ['./report_feature'],
          },
          {
            target: './src/features/sales_feature',
            from: './src/features',
            except: ['./sales_features'],
          },
          {
            target: './src/features',
            from: './src/app',
          },
          {
            target: [
                './src/components',
                './src/hooks',
                './src/types',
                './src/utils',
            ],
            from: ['./src/features', './src/app'],
          },
        ],
      },
    ],
  },
}
