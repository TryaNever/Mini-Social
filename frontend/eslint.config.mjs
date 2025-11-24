import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Ignorer certains dossiers
  globalIgnores(["dist", "node_modules", ".vite"]),

  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended, // règles JS standard
      reactHooksPlugin.configs.flat.recommended, // hooks
      prettierConfig, // Prettier
    ],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "comma-dangle": ["error", "always-multiline"],
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
      "no-console": ["warn"],
      "prettier/prettier": "error",

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-vars": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",

      "no-eval": "error",
      "no-implicit-globals": "error",
      "no-undef": "error",
      strict: ["error", "global"],

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"],
        },
      },
    },
  },
]);
