import eslint from "@eslint/js";
import formatjs from "eslint-plugin-formatjs";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["**/dist", "**/public"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  importPlugin.flatConfigs.recommended,
  formatjs.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^assertType",
          ignoreRestSiblings: true,
        },
      ],
      "import/order": [
        "error",
        {
          alphabetize: { order: "asc" },
          groups: ["builtin", "external", "internal", "parent", "sibling"],
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@pollen-antenna/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: [],
        },
      ],
      "formatjs/no-id": "error",
      "formatjs/no-literal-string-in-jsx": "error",
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "/tsconfig.json",
        },
        node: true,
      },
    },
  },
];
