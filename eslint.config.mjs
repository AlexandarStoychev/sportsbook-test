import typescriptEslint from "@typescript-eslint/eslint-plugin";
import noOnlyTests from "eslint-plugin-no-only-tests";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"),
    {
        plugins: {
            "@typescript-eslint": typescriptEslint,
            "no-only-tests": noOnlyTests,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
            },

            parser: tsParser,
            ecmaVersion: 5,
            sourceType: "script",

            parserOptions: {
                project: "./tsconfig.json",
            },
        },

        rules: {
            "no-use-before-define": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/indent": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/no-use-before-define": "off",
            "@typescript-eslint/no-var-requires": "warn",
            indent: ["warn", "tab"],
            quotes: ["error", "single"],
            semi: ["error", "always"],
            "no-only-tests/no-only-tests": "error",
            "@typescript-eslint/no-floating-promises": ["error"],
        },
    },
];