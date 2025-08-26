import js from "@eslint/js"
import pluginNext from "@next/eslint-plugin-next"
import eslintConfigPrettier from "eslint-config-prettier"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import tseslint from "typescript-eslint"

import { config as baseConfig } from "./base.js"

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    rules: {
      "react/no-children-prop": "off",
      "linebreak-style": [
        "error",
        "unix"
      ],
      // Default: turn off here, re-enable via file-specific overrides for JS/TS only
      "indent": "off",
      "no-tabs": [
        "error"
      ],
      "semi": [
        "error",
        "never"
      ],
      "quotes": [
        "error",
        "double"
      ],
      "eol-last": ["error", "always"],
      "@typescript-eslint/no-explicit-any": "off"
    },
  },
  // Enforce core indent for JS/TS (not TSX/JSX)
  {
    files: ["**/*.{js,ts}"],
    rules: {
      "indent": [
        "error",
        2,
        {
          "SwitchCase": 1
        }
      ],
    },
  },
  // Disable core indent for TSX/JSX and use React's JSX indentation rules instead
  {
    files: ["**/*.{tsx,jsx}"],
    rules: {
      // Keep core indent for non-JSX code, but ignore JSX nodes to avoid recursion issues
      "indent": [
        "error",
        2,
        {
          "SwitchCase": 1,
          "ignoredNodes": [
            "JSXElement",
            "JSXElement *",
            "JSXFragment",
            "JSXFragment *",
            "JSXExpressionContainer",
            "JSXOpeningElement",
            "JSXClosingElement",
            "JSXAttribute",
            "JSXSpreadAttribute"
          ]
        }
      ],
      "react/jsx-indent": ["error", 2],
      "react/jsx-indent-props": ["error", 2],
    },
  },
]
