import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "off",
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "^(__VLS_|\\$event)" }],
      "@typescript-eslint/no-unused-expressions": "off"
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "public/**"]
  }
];
